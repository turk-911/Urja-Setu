import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, DollarSign, Weight } from "lucide-react";

interface OrderDetailsProps {
  orderId: string;
  itemName: string;
  price: number;
  weight: string;
  imageUrl: string;
  pickupTime: string;
  status: "processing" | "shipped" | "delivered";
  isLoading?: boolean;
}

interface Order {
  orderDetails: OrderDetailsProps;
}


export function OrderDetails({ orderDetails }: Order) {
  // const { orderId, itemName, price, weight, imageUrl, pickupTime, status } =
  //   orderDetails;
  
  const isLoading = false;

  const getProgressValue = (status: string) => {
    switch (status) {
      case "processing":
        return 33;
      case "shipped":
        return 66;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/30 shadow-lg border-none rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <motion.div
          className="p-6 space-y-6"
          initial="initial"
          animate="animate"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Order Details
            </CardTitle>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-green-600 text-white border-none rounded-md hover:bg-green-500"
            >
                ID: {orderDetails.id}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span>Processing</span>
              <span>Shipped</span>
              <span>Picked</span>
            </div>
            <Progress value={getProgressValue(status)} className="w-full" />
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {isLoading ? (
              <Skeleton className="w-full h-64" />
            ) : (
              <>
                {/* Image Section */}
                <motion.div
                  className="w-full lg:w-1/2"
                >
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={orderDetails.order.item.image}
                      alt={orderDetails.order.item.name}
                      className="w-full h-full object-cover rounded-md shadow-sm"
                    />
                  </AspectRatio>
                </motion.div>

                {/* Details Section */}
                <div className="flex flex-col justify-between w-full lg:w-1/2 gap-6">
                  {/* Item Details */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {orderDetails.order.item.name || "Item Name Unavailable"}
                    </h2>
                    <motion.div
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Price:</span>
                      <span>${orderDetails.order.item.price || "N/A"}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Weight className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Weight:</span>
                      <span>{orderDetails.order.item.weight || "N/A"}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Clock className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Pickup Time:</span>
                      <span>{orderDetails.order.pickupTime.start} - {orderDetails.order.pickupTime.end}</span>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
