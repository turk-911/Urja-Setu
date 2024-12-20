import { Heart } from 'lucide-react'
import { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import Rating from '@/components/ui/rating'
import AddToCartButton from './add-to-cart-button'
import { useDispatch } from 'react-redux'
import { updateProdLike } from '@/redux/productSlice'
import { updateLikedProducts } from '@/redux/authSlice'
import { useIsAuthorized } from '@/hooks/useIsAuthorized'
import { useState } from 'react'
import { addToCart } from '@/api/cart/addToCart'

interface ProductDetailsProps {
  product: Product
  isLiked: boolean
  onLikeToggle: () => void
}

export default function ProductDetails({ product, isLiked, onLikeToggle }: ProductDetailsProps) {
  const dispatch = useDispatch();
  const {auth} = useIsAuthorized();
  function handleLike(){
    dispatch(updateProdLike({ productId: product.id, isLiked: false }));
    dispatch(updateLikedProducts({ productId: product.id, isLiked: false, userId: auth.uid }));
  }
  console.log(product);
  return (
    <div className="space-y-4 bg-white/30 shadow-lg rounded-xl p-4 h-full">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground">by {product.seller}</p>
        </div>
        <button onClick={handleLike} className="text-primary">
          {
            product.liked ? <Heart className={`h-6 w-6 fill-primary`} /> : <Heart className={`h-6 w-6`} />
          }
          
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <Rating rating={product.rating} size={18} className='w-auto justify-start'/>
        <span className="text-muted-foreground">({product.reviews?.length} reviews)</span>
      </div>
      <div className="flex items-baseline space-x-2">
        {product.discount ? (<>
          <span className="text-3xl font-bold">
            <div className='flex items-center gap-1'>

          <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-5 w-5"
                        />
            {(product.price - (product.price * (product.discount / 100))).toFixed(2)}
                        </div>
            </span>
        </>) : (<>
          <span className="text-3xl font-bold">${product.price}</span>
        </>)}
        <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(0)}</span>
        {product.discount && <Badge variant="success">{(product.discount).toFixed(0)}% OFF</Badge>}
      </div>
      <p className="text-black">{product.description}</p>
      <div className='text-gray-800'>
        <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {product.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      {/* <div className="flex items-center space-x-2">
        <Badge>{product.category}</Badge>
        <Badge variant="outline">{product.condition}</Badge>
      </div> */}
      <AddToCartButton product={product.id} />
    </div>
  )
}

