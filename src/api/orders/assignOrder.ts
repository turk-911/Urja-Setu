import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Order } from "@/types/order";
import { db } from "../../utils/firebase";

export const assignOrder = async (
  orderId: string,
  companyDetails: Order['order']['company'],
  deliveryPersonDetails: Order['order']['deliveryPerson'],
  pickupTime: Order['order']['pickupTime']
): Promise<void> => {
  try {
    if(deliveryPersonDetails?.id == undefined){
      return;
    }
    const orderDocRef = doc(db, "orders", orderId);
    const deliveryPersonDocRef = doc(db, "users", deliveryPersonDetails.id);

    await updateDoc(orderDocRef, {
      "order.company": companyDetails,
      "order.deliveryPerson": deliveryPersonDetails,
      "order.pickupTime": pickupTime,
      "order.status": "assigned"
    });

    await updateDoc(deliveryPersonDocRef, {
      assignedWork: arrayUnion(orderId),
    });

    console.log("Order assigned successfully:", orderId);
  }
  catch(error){
    console.error("Error assigning order:", error);
    throw new Error("Failed to assign order");
  }
};
