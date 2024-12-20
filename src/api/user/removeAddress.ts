import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const removeAddress = async (userId: string, addressToRemove: {
    address: string,
      state: string,
      city: string,
      coordinates: {
        lat: number,
        lng: number
      }
}) => {
    try {
        const userDocRef = doc(db, "users", userId);

        await updateDoc(userDocRef, {
            addresses: arrayRemove(addressToRemove),
        });

        console.log("Address removed successfully!");
    }
    catch(error){
        console.error("Error removing address: ", error);
        throw error;
    }
};
