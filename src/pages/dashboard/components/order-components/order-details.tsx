import { motion } from "framer-motion";

interface OrderDetailsProps {
  item: {
    name: string;
    price: number;
    weight: number;
    image: string;
  };
}

export default function OrderDetails({ item }: OrderDetailsProps) {
  return (
    <div className="flex gap-2">
      <motion.div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-md cursor-pointer hover:scale-110 transition-transform"
        />
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">
            Total: ${item.price}
          </p>
          <p className="text-sm text-gray-600">Weight: {item.weight}kg</p>
        </div>
      </motion.div>
    </div>
  );
}
