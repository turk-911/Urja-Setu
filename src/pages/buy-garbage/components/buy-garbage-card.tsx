import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import AssignDriver from "./assign-driver";
import { sellWithId } from "@/api/orders/fetchPendingOrders";

export function BuyGarbageCard({ order }: sellWithId) {
  const [isHovered, setIsHovered] = useState(false);
  // console.log(order);
  
  // console.log(order?.order);
  
  if (Object.keys(order.order.seller).length === 0) return null;
  if (Object.keys(order.order.seller.name).length === 0) return null;
  if (Object.keys(order.order.seller.phone).length === 0) return null;
  if (Object.keys(order.order.itemName).length === 0) return null;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="overflow-hidden border-none bg-white/80 p-2 shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div transition={{ duration: 0.3 }}>
          <CardContent className="flex gap-4 px-0 py-0 justify-between h-full">
            <div className="flex sm:items-start gap-4 justify-center items-center h-full">
              <div className="p-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="justify-center items-center h-full"
                >
                  <Avatar className="w-20 h-20 flex justify-center items-center">
                    <AvatarImage src={order.order.seller.image} alt={order.id} />
                    <AvatarFallback>{order.order.seller.name}</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>

              <div className="text-center sm:text-left flex flex-col justify-center mt-3">
                <h2 className="text-2xl font-bold">{order.order.seller.name}</h2>
                <motion.p
                  className="text-sm text-gray-800 mt-1"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  {order.order.seller.phone.value}
                </motion.p>
                <ScrollArea className="h-16 w-full max-w-[200px] mt-2">
                  <p className="text-sm text-gray-800">
                    {order.order.seller.address.city}, {order.order.seller.address.state}
                  </p>
                </ScrollArea>
              </div>
            </div>
            <div className="flex flex-col sm:items-end mt-3">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative min-w-24 h-24 rounded-md overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    className="w-full h-full"
                    src={
                      // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1aZ47or6YGVPmIIp_MhagLngi7WWAB4rl_IyonRM6Hhb3WFMs0-ukeJGWSJsFSBCA6o8&usqp=CAU"
                      order.order.image
                    }
                    alt={order.order.itemName}
                  />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold">{order.order.itemName}</h3>
                  <Badge variant="secondary" className="mt-1">
                    Urja Setu
                  </Badge>
                  <p className="text-sm text-gray-800 mt-2">
                    Weight: {order.order.weight}kg
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[140px] flex items-center mr-8">
              <AssignDriver id={order.id} />
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
