import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/utils/firebase";
import { Order } from "@/types/order";

export const getOrderById = async (orderId: string) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if(orderSnap.exists()){
      // console.log(orderSnap.data());
      const ord = orderSnap.data() as Order['order'];
      if (!ord) {
        throw new Error("chatId not found in the order document");
      }
      // console.log(ord.chatId);
      
      return ord.chatId;
    }
    else{
      throw new Error("Order not found");
    }
  } 
  catch(err : any){
    console.error("Error fetching order:", err.message);
    throw err; 
  }
};
