import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const fetchRecentOrders = async (id: string) => {
    try {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        const userData : DocumentData | undefined = userDoc.data();
        if(!userData){
            console.log("Data Not Found !");
            return;
        }
        // const sortedOrders = userData.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentOrders = userData.orders.slice(0, 6);
        return recentOrders;

    }
    catch(error){
        console.log("Error At fetchRecentOrders ", error);
        return;    
    }
}