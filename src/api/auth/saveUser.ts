import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const saveUser = async (id: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", id);
    let defaultData: any = {
      address: [],
      wallet: 100,
      eventsId: [],
      phone: [],
      following: [],
      orders: [],
      role: "User",
      liked: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(userRef, defaultData);
    console.log("Successfully Updated Default Data");
    return;
    
  }
  catch(error : any){
    console.error("Error saving user:", error.message);
  }
};
