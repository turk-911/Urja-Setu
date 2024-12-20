import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { sellGarbage } from "@/types/order";

export interface sellWithId extends sellGarbage{
    id: string | null;
}

export const fetchPendingOrders = async (): Promise<sellWithId[]> => {
  try {
    const ordersCollectionRef = collection(db, "orders");

    const pendingOrdersQuery = query(ordersCollectionRef, where("order.status", "==", "pending"));
    const querySnapshot = await getDocs(pendingOrdersQuery);

    const pendingOrders: sellWithId[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as sellWithId;
    });

    console.log("Pending Orders:", pendingOrders);
    return pendingOrders;
  }
  catch(error){
    console.error("Error fetching pending orders:", error);
    throw new Error("Failed to fetch pending orders");
  }
};
