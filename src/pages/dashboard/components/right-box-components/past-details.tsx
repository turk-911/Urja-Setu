import { motion } from "framer-motion";
import OrderDetails from "../order-components/order-details";
import PickupTimeStatus from "../order-components/pickup-time-status";
import ShowOrderDetailsButton from "../order-components/order-details-button";
import DeliveryPersonDetails from "../order-components/delivery-boy-details";
import { PastDetailsProps } from "@/types/order";

export default function PastDetails({ orders }: PastDetailsProps) {
  console.log(orders);
  
  return (
    <>
      <h1 className="px-4 py-2 font-bold text-2xl text-gray-800">
        Order Details
      </h1>
      <motion.div
        className="rounded-lg flex flex-col gap-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {orders?.length > 0 && orders.map((order, index) => {
          return (
            <div
              key={index}
              className="p-6 flex bg-white/50 justify-between items-center rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Left Section - Order Details */}
              {order.order.item && <OrderDetails item={order.order.item} />}

              {/* Middle Section - Delivery Person */}
              {order.order.deliveryPerson && (
                <DeliveryPersonDetails person={order.order.deliveryPerson} />
              )}

              {/* Right Section - Pickup Time */}
              {order.order.pickupTime && (
                <PickupTimeStatus pickupTime={order.order.pickupTime} />
              )}

              {/* Details Button */}
              <div className="mt-4 sm:mt-0">
                <ShowOrderDetailsButton id={order.id}/>
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
