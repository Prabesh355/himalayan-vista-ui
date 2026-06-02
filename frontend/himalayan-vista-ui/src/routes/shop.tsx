import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Nomads Navigate Nepal" },
      { name: "description", content: "Shop exclusive trekking gear and merchandise from Nomads Navigate Nepal." },
    ],
  }),
  component: Shop,
});

const products = [
  {
    id: 1,
    name: "Nomads Navigate Nepal Trekking Jacket",
    price: 89.99,
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1544441892-3bae66e94f71?w=500&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 2,
    name: "Himalayan Adventure Backpack (65L)",
    price: 149.99,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: "Merino Wool Base Layer Set",
    price: 59.99,
    rating: 4.7,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Trekking Boots - Mountain Pro",
    price: 179.99,
    rating: 4.9,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 5,
    name: "Nomads Nepal T-Shirt",
    price: 24.99,
    rating: 4.6,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 6,
    name: "Sleeping Bag -40°C",
    price: 199.99,
    rating: 4.9,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=500&h=500&fit=crop",
    inStock: false,
  },
];

function Shop() {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4">
            Nomads Navigate <span className="text-gradient-sunset">Shop</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Premium trekking gear and merchandise from Nomads Navigate Nepal. Everything you need for your Himalayan adventure.
          </p>
        </div>

        {/* Shopping Cart Info */}
        <div className="mb-8 p-4 rounded-xl glass border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-gradient-sunset" />
              <span className="text-sm font-medium">Items in cart: <span className="text-gradient-sunset font-bold">{cart.length}</span></span>
            </div>
            <button className="text-sm text-gradient-sunset hover:underline">
              View Cart ({cart.length})
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl overflow-hidden glass border border-border/50 hover:border-border transition-all hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-secondary aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-gradient-sunset text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${product.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-lg font-semibold transition-all ${
                    product.inStock
                      ? "bg-gradient-sunset text-white hover:shadow-glow hover:-translate-y-0.5"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 rounded-2xl glass border border-border/50 p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Special Offers & Updates</h2>
          <p className="text-muted-foreground mb-6">Subscribe to get exclusive deals and new product announcements</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg bg-secondary border border-border/50 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gradient-sunset"
            />
            <button className="bg-gradient-sunset text-white px-6 py-2 rounded-lg font-semibold hover:shadow-glow transition-all hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
