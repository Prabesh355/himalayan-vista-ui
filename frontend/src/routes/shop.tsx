import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PackageCheck, ShoppingCart, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import api from "@/services/api";
import backpackImage from "@/assets/Annapurna Circuit Trek.jpg";
import jacketImage from "@/assets/Everest Base Camp.jpeg";
import shirtImage from "@/assets/Annapurna Base Camp.jpg";
import bootsImage from "@/assets/Manaslu and Tsum Valley.jpg";
import {
  defaultShopImageFallback,
  resolveShopImage,
  useFallbackImage,
} from "@/lib/imageUrl";
import { useCurrency } from "@/context/CurrencyProvider";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Nomads Navigate Nepal" },
      {
        name: "description",
        content: "Shop exclusive trekking gear and merchandise from Nomads Navigate Nepal.",
      },
    ],
  }),
  component: Shop,
});

type Product = {
  _id?: string;
  id?: string | number;
  name: string;
  description?: string;
  category?: string;
  price: number;
  rating?: number;
  reviews?: number;
  image: string;
  inStock?: boolean;
  comingSoon?: boolean;
};

const fallbackProducts: Product[] = [
  {
    id: "jacket",
    name: "Nomads Navigate Nepal Trekking Jacket",
    description: "A trail-ready shell for changing Himalayan conditions.",
    category: "Outerwear",
    price: 89.99,
    rating: 4.8,
    reviews: 24,
    image: jacketImage,
    inStock: true,
  },
  {
    id: "backpack",
    name: "Himalayan Adventure Backpack 65L",
    description: "A spacious pack for multi-day trekking routes.",
    category: "Bags",
    price: 149.99,
    rating: 4.9,
    reviews: 42,
    image: backpackImage,
    inStock: true,
  },
  {
    id: "base-layer",
    name: "Merino Wool Base Layer Set",
    description: "Warm, breathable layers for high-altitude mornings.",
    category: "Clothing",
    price: 59.99,
    rating: 4.7,
    reviews: 18,
    image: shirtImage,
    inStock: true,
  },
  {
    id: "boots",
    name: "Trekking Boots - Mountain Pro",
    description: "Supportive boots for rocky trails and long descents.",
    category: "Footwear",
    price: 179.99,
    rating: 4.9,
    reviews: 31,
    image: bootsImage,
    inStock: true,
  },
];

function productId(product: Product) {
  return String(product._id || product.id || product.name);
}

function Shop() {
  const handleImageError = useFallbackImage(defaultShopImageFallback);
  const { formatPrice } = useCurrency();
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "public"],
    queryFn: async () => (await api.get<{ success: boolean; data: Product[] }>("/products")).data,
  });

  const products = data?.data?.length ? data.data : fallbackProducts;
  const cartProducts = useMemo(
    () => cart.map((id) => products.find((product) => productId(product) === id)).filter(Boolean) as Product[],
    [cart, products],
  );
  const cartTotal = cartProducts.reduce((sum, product) => sum + Number(product.price || 0), 0);

  const addToCart = (product: Product) => {
    const productKey = productId(product);
    const alreadyInCart = cart.includes(productKey);
    if (alreadyInCart) {
      setCart((current) => current.filter((id) => id !== productKey));
      return;
    }

    setCart((current) => [...current, productKey]);
    setCartOpen(true);
  };

  const updateCartItemQuantity = (product: Product, delta: number) => {
    const productKey = productId(product);
    const nextItems = [...cart];
    const existingIndex = nextItems.findIndex((id) => id === productKey);

    if (existingIndex === -1) {
      if (delta > 0) {
        nextItems.push(productKey);
      }
    } else if (delta > 0) {
      nextItems.splice(existingIndex, 1, productKey);
    } else {
      nextItems.splice(existingIndex, 1);
    }

    setCart(nextItems);
  };

  const removeFromCart = (product: Product) => {
    setCart((current) => current.filter((id) => id !== productId(product)));
  };

  return (
    <div className="min-h-screen pb-16 pt-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
            Nomads Navigate <span className="text-gradient-sunset">Shop</span>
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Premium trekking gear and merchandise from Nomads Navigate Nepal.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-border/50 p-4 glass">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-gradient-sunset" />
              <span className="text-sm font-medium">
                Items in cart: <span className="font-bold text-gradient-sunset">{cart.length}</span>
              </span>
            </div>
            <button
              onClick={() => setCartOpen((current) => !current)}
              className="rounded-full border border-border/60 px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              {cartOpen ? "Hide Cart" : `View Cart (${cart.length})`}
            </button>
          </div>
          {cartOpen && (
            <div className="mt-4 rounded-xl border border-border/60 bg-background/80 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Cart Summary</h2>
                <button onClick={() => setCartOpen(false)} className="rounded-full p-1 hover:bg-secondary">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {cartProducts.length ? (
                <div className="mt-3 space-y-2">
                  {cartProducts.map((product) => (
                    <div key={productId(product)} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex-1">{product.name}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateCartItemQuantity(product, -1)} className="rounded border px-2 py-0.5">-</button>
                        <span className="min-w-6 text-center">1</span>
                        <button onClick={() => updateCartItemQuantity(product, 1)} className="rounded border px-2 py-0.5">+</button>
                      </div>
                      <span className="font-semibold">{formatPrice(product.price)}</span>
                      <button
                        onClick={() => removeFromCart(product)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div className="border-t border-border/60 pt-3 text-right text-sm font-bold">
                    Total: {formatPrice(cartTotal)}
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">Your cart is empty.</p>
              )}
            </div>
          )}
        </div>

        {isLoading && <p className="mb-6 text-sm text-muted-foreground">Loading products...</p>}
        {isError && (
          <p className="mb-6 text-sm text-amber-600">
            Live shop products are unavailable, showing the default catalog.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const inStock = product.inStock !== false;

            return (
              <div
                key={productId(product)}
                className="group overflow-hidden rounded-xl border border-border/50 transition-all hover:border-border hover:shadow-lg glass"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={resolveShopImage(product.image, product.name, defaultShopImageFallback)}
                    alt={product.name}
                    onError={handleImageError}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {Boolean(product.comingSoon) ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="font-bold text-white">Coming Soon</span>
                    </div>
                  ) : !inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="font-bold text-white">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute right-3 top-3 rounded-full bg-gradient-sunset px-3 py-1 text-sm font-semibold text-white">
                    {formatPrice(product.price)}
                  </div>
                </div>

                <div className="p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {product.category || "Trekking Gear"}
                  </p>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  )}

                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating || 0} ({product.reviews || 0})
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={!inStock || Boolean(product.comingSoon)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 font-semibold transition-all ${
                      !inStock || Boolean(product.comingSoon)
                        ? "cursor-not-allowed bg-muted text-muted-foreground"
                        : "bg-gradient-sunset text-white hover:-translate-y-0.5 hover:shadow-glow"
                    }`}
                  >
                    <PackageCheck className="h-4 w-4" />
                    {Boolean(product.comingSoon) ? "Coming Soon" : inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
