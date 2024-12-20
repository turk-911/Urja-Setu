import { memo } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShippingOption } from '@/types/product';

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string;
  shippingOptions: ShippingOption[];
  onShippingChange: (value: string) => void;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
}

const OrderSummary = memo(({
  subtotal,
  tax,
  shipping,
  discount,
  total,
  couponCode,
  shippingOptions,
  onShippingChange,
  onCouponChange,
  onApplyCoupon
}: OrderSummaryProps) => {
  return (
    <div className="bg-green-50 px-6 py-4 rounded-xl">
      <Card className="border-none bg-white shadow-xl">
        <CardContent className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>
                <div className='flex items-center gap-1'>
                <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-3 w-3"
                      />
                  {subtotal.toFixed(2)}
                </div>
                </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              
              <span><div className='flex items-center gap-1'>
                <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-3 w-3"
                      />
                  {tax.toFixed(2)}
                </div>
                </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>
              <div className='flex items-center gap-1'>
                <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-3 w-3"
                      />
                  {shipping.toFixed(2)}
                </div>
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-black">
                <span>Discount</span>
                <span><div className='flex items-center gap-1'>
                -<img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-3 w-3"
                      />
                  {discount.toFixed(2)}
                </div></span>
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span><div className='flex items-center gap-1'>
                <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-4 w-4"
                      />
                  {total.toFixed(2)}
                </div></span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="shipping"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shipping Method
              </label>
              <Select onValueChange={onShippingChange}>
                <SelectTrigger id="shipping">
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  {shippingOptions.map((option) => (
                    <SelectItem key={option.id} value={option.price.toString()}>
                      <div className='flex items-center gap-1'>
                      
                      {option.name} - <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-3 w-3"
                      />{option.price.toFixed(2)}
                </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="coupon"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Coupon Code
              </label>
              <div className="flex justify-between items-center gap-3 w-full">
                <Input
                  className="w-full"
                  id="coupon"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => onCouponChange(e.target.value)}
                />
                <Button onClick={onApplyCoupon}>Apply</Button>
              </div>
            </div>
          </div>
          <Button className="w-full mt-6" size="lg">
            <ShoppingBag className="mr-2 h-5 w-5" /> Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;

