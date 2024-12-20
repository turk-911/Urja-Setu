import { fetchOrdersById } from "@/api/orders/fetchOrdersById";
import { useAppSelector } from "@/redux/hooks";
import { orderWithId } from "@/redux/orderSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useGetOrder(userId: string, orderId: string) {
    const order = useAppSelector((state) => state.order.order);
    const [ord, setOrd] = useState<orderWithId | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!order){
            fetchOrdersById(userId, dispatch);
        }
        const foundOrder = order.find((ord) => ord.id === orderId);
        if(foundOrder){
            setOrd(foundOrder);
        }
    }, [order]);

    return {ord};
}