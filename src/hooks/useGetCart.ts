import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

export function useGetCart(prodId?: string) {
    const cart = useAppSelector((state) => state.cart.cart);
    const [isPresent, setIsPresent] = useState<boolean>(false);

    useEffect(() => {
        const productInCart = cart.find((item) => item.id === prodId);
        setIsPresent(!productInCart);
    }, [cart]);

    return {isPresent, cart};
}