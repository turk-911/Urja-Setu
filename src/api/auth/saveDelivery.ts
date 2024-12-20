import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const saveDeliveryPerson = async (id: string): Promise<void> => {
  try {
    const dpRef = doc(db, "users", id);

    let defaultData: any = {
      address: "NA",
      organizationId: "",
      assignedWork: [],
      rating: 0,
      code: 0,
      orders: [],
      phone: "",
      role: "DeliveryPerson",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(dpRef, defaultData);
    // console.log("Successfully Updated Default Data");
    return;
  }
  catch(error: any){
    console.error("Error saving delivery person:", error.message);
  }
};
