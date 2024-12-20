"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { fetchCart } from "@/api/cart/fetchCart";
import { addToCart } from "@/api/cart/addToCart";
import { removeFromCart } from "@/api/cart/removeFromCart";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/nav-bar";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import { cartProduct, ShippingOption } from "@/types/product";

const shippingOptions: ShippingOption[] = [
  { id: "standard", name: "Standard Shipping", price: 5.99 },
  { id: "express", name: "Express Shipping", price: 14.99 },
  { id: "overnight", name: "Overnight Shipping", price: 29.99 },
];

export default function Cart() {
  const dispatch = useDispatch();
  const { auth } = useIsAuthorized();
  const cart = useAppSelector((state) => state.cart.cart);

  const [cartItems, setCartItems] = useState<cartProduct[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(shippingOptions[0].price);
  const [total, setTotal] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    if (auth.uid) {
      fetchCart(auth.uid, dispatch);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  useEffect(() => {
    if (cartItems) {
      const newSubtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTax = newSubtotal * 0.08; // Assuming 8% tax rate
      const newTotal = newSubtotal + newTax + shipping - discount;

      setSubtotal(newSubtotal);
      setTax(newTax);
      setTotal(newTotal);
    }
  }, [cartItems, shipping, discount]);

  const addQuantity = useCallback(
    (id: string, newQuantity: number) => {
      if (auth.uid) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, newQuantity) }
              : item
          )
        );
        addToCart(auth.uid, id, 1, dispatch);
      }
    },
    [auth.uid, dispatch]
  );

  const subQuantity = useCallback(
    (id: string, newQuantity: number) => {
      if (auth.uid) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, newQuantity) }
              : item
          )
        );
        removeFromCart(auth.uid, id, 1, dispatch);
      }
    },
    [auth.uid, dispatch]
  );

  const removeItem = useCallback(
    (id: string) => {
      if (auth.uid) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        removeFromCart(auth.uid, id, 1e9, dispatch);
      }
    },
    [auth.uid, dispatch]
  );

  const applyCoupon = useCallback(() => {
    if (couponCode.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1);
    }
  }, [couponCode, subtotal]);

  const handleShippingChange = useCallback((value: string) => {
    setShipping(Number(value));
  }, []);

  const handleCouponChange = useCallback((value: string) => {
    setCouponCode(value);
  }, []);

  return (
    <div className="min-h-screen pb-6">
      <NavBar />
      <div className="w-[90%] mx-[5%] pt-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl">
              <CardContent className="p-6 bg-green-50 rounded-lg">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <CartItem
                      item={item}
                      onRemove={removeItem}
                      onIncrease={addQuantity}
                      onDecrease={subQuantity}
                    />
                    {index < cartItems.length - 1 && (
                      <Separator className="my-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              discount={discount}
              total={total}
              couponCode={couponCode}
              shippingOptions={shippingOptions}
              onShippingChange={handleShippingChange}
              onCouponChange={handleCouponChange}
              onApplyCoupon={applyCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
