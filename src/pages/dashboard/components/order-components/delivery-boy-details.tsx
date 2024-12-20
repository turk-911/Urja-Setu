import Rating from "@/components/ui/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
interface DeliveryPersonDetailsProps {
  person: {
    name: string;
    photo: string;
    contact: string;
    rating: number;
  };
}
export default function DeliveryPersonDetails({
  person,
}: DeliveryPersonDetailsProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <Avatar>
          <AvatarImage src={person.photo} className="rounded-full h-12 w-12"/>
          <AvatarFallback>{person.name}</AvatarFallback>
        </Avatar>
      </motion.div>
      <div>
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <motion.p className="text-sm text-gray-600">{person.contact}</motion.p>
        <Rating rating={person.rating}/>
      </div>
    </div>
  );
}
