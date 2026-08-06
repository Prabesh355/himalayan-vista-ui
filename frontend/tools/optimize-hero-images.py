"""Create responsive modern-image variants for the above-the-fold homepage hero."""
from pathlib import Path
from PIL import Image, ImageOps

source = Path(__file__).parent.parent / "src" / "assets" / "Everest Base Camp.jpeg"
target = Path(__file__).parent.parent / "public" / "images" / "hero"
target.mkdir(parents=True, exist_ok=True)

with Image.open(source) as original:
    image = ImageOps.exif_transpose(original).convert("RGB")
    for width in (768, 1280, 1920):
        height = round(image.height * width / image.width)
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(target / f"everest-base-camp-{width}.webp", "WEBP", quality=78, method=6)
        resized.save(target / f"everest-base-camp-{width}.avif", "AVIF", quality=52, speed=6)
    placeholder = image.resize((48, round(image.height * 48 / image.width)), Image.Resampling.LANCZOS)
    placeholder.save(target / "everest-base-camp-lqip.jpg", "JPEG", quality=35, optimize=True)
