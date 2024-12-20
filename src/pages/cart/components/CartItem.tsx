import { memo } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Rating from '@/components/ui/rating';
import { cartProduct } from '@/types/product';

interface CartItemProps {
  item: cartProduct;
  onRemove: (id: string) => void;
  onIncrease: (id: string, quantity: number) => void;
  onDecrease: (id: string, quantity: number) => void;
}

const CartItem = memo(({ item, onRemove, onIncrease, onDecrease }: CartItemProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/30 rounded-xl shadow-lg px-4 py-2">
      <img
        src={item.images[0]}
        alt={item.title}
        className="w-full md:w-40 h-40 object-cover rounded-lg"
      />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>
            <Badge variant="secondary" className="mt-1">
              {item.condition}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title} from cart`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-2xl font-bold text-black">
            <div className='flex justify-center items-center gap-1'>
            <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-5 w-5"
                      />
            {item.price.toFixed(2)}
            </div>
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600">Sold by: {item.seller}</span>
        </div>
        <div className="pt-3 flex justify-start">
          <Rating size={20} rating={item.rating} />
        </div>
        <div className="flex items-center mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDecrease(item.id, item.quantity - 1)}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="w-16 mx-4">
            <Input
              type="number"
              min="0"
              disabled={true}
              value={item.quantity}
              className="w-full text-center"
              aria-label={`Quantity of ${item.title}`}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onIncrease(item.id, item.quantity + 1)}
            aria-label={`Increase quantity of ${item.title}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;

