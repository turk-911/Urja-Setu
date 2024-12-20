import NavBar from '@/components/nav-bar';
import ProductPage from './components/product-page';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetProduct } from '@/hooks/useGetProduct';
import { useIsAuthorized } from '@/hooks/useIsAuthorized';
import { Product } from '@/types/product';

export default function ParentProductPage() {
  const { auth } = useIsAuthorized();
  const { id } = useParams(); 
  console.log(id, auth?.uid);
  const { prod } = useGetProduct(id || '', auth?.uid || ''); 
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (prod) {
      setProduct(prod);
    }
  }, [prod]);

  useEffect(() => {
    console.log('Product ID:', id);
    console.log('User ID:', auth?.uid);
    console.log('Fetched Product:', prod);
  }, [id, auth?.uid, prod]);

  return (
    <>
      <NavBar />
      <main className="bg-background w-[80%] mx-[10%]">
        {product ? (
          <ProductPage product={product} />
        ) : (
          <p>Loading product details...</p>
        )}
      </main>
    </>
  );
}
