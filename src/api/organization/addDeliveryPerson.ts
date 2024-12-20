import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const addDeliveryPerson = async (
  deliveryPersonId: string,
  organizationId: string
): Promise<void> => {
  try {
    const deliveryPersonRef = doc(db, "users", deliveryPersonId);

    const deliveryPersonDoc = await getDoc(deliveryPersonRef);

    if (!deliveryPersonDoc.exists()) {
      console.error("Delivery person not found");
      throw new Error("Delivery person not found");
    }

    await updateDoc(deliveryPersonRef, {
      organizationId: organizationId,
    });

    // console.log("Delivery person updated successfully with organization ID");
  }
  catch(error){
    console.error("Error updating delivery person:", error);
    throw new Error("Failed to update delivery person");
  }
};
