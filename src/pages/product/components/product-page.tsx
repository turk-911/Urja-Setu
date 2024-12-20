import { useState } from 'react';
import { Product } from '@/types/product';
import ProductGallery from './product-gallery';
import ProductDetails from './product-details';
import ProductReviews from './product-reviews';
import { useDispatch } from 'react-redux';
import { updateProdLike } from '@/redux/productSlice';
import { updateLikedProducts } from '@/redux/authSlice';
import { useIsAuthorized } from '@/hooks/useIsAuthorized';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const dispatch = useDispatch();
  const {auth} = useIsAuthorized();
  const [isLiked, setIsLiked] = useState(product.liked);

  const toggleLike = () => {
  };

  // Ensure product.reviews is always an array (empty array if undefined)
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-green-50 p-6 rounded-xl">
        <ProductGallery image={product.images[0]} />
        <div className="space-y-6">
          <ProductDetails product={product} isLiked={isLiked} onLikeToggle={toggleLike} />
        </div>
      </div>
      {<ProductReviews reviews={reviews} id={product.id} />}
    </div>
  );
}
