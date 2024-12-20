

interface ProductGalleryProps {
  image: string
}

export default function ProductGallery({ image }: ProductGalleryProps) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg">
      <img
        src={image}
        alt="Product image"
        width={600}
        height={600}
        className="object-cover w-full h-full"
      />
    </div>
  )
}

