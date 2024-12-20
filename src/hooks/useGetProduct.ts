import { fetchProducts } from "@/api/products/fetchProducts";
import { useAppSelector } from "@/redux/hooks";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export function useGetProduct(prodId: string, userId: string) {
    const product = useAppSelector((state) => state.product.product);
    const [prod, setProd] = useState<Product | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(product.length == 0){
            fetchProducts(userId, dispatch);
        }
        const foundProduct = product.find((prod: { id: string }) => prod.id === prodId);
        if(foundProduct){
            setProd(foundProduct);
        }
    }, [product]);

    return {prod};
}