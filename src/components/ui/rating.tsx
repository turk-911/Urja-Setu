import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Rating({
  rating,
  size = 12,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.1 }}
        >
          <Star
            className={`${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            style={{ width: size, height: size }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default Rating;
