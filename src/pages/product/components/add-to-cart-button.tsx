import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/api/cart/addToCart';
import { useDispatch } from 'react-redux';
import { useIsAuthorized } from '@/hooks/useIsAuthorized';
import { fetchCart } from '@/api/cart/fetchCart';
import { useAppSelector } from '@/redux/hooks';
import { removeFromCart } from '@/api/cart/removeFromCart';

interface Product {
  id: string;
  [key: string]: any; // Allow additional properties if needed
}

interface AddToCartButtonProps {
  product: string;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { auth } = useIsAuthorized();

  function handleAddToCart() {
    if (!isAdded) {
      if (auth.uid) {
        console.log('Added to cart');
        addToCart(auth.uid, product, 1, dispatch);
      }
    } else {
      if (auth.uid) {
        console.log('Remove from cart');
        removeFromCart(auth.uid, product, 1, dispatch);
      }
    }
  }

  useEffect(() => {
    if (auth.uid) {
      console.log(auth.uid);
      fetchCart(auth.uid, dispatch);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (cart.cart) {
      const found = cart.cart.find((item) => item.id === product);
      setIsAdded(!!found);
      console.log(isAdded); 
    }
  }, [cart, product]);

  return (
    <Button size="lg" className="w-full" onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </Button>
  );
}
