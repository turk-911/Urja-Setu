import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const addAddress = async (userId: string, newAddress: {
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
            addresses: arrayUnion(newAddress),
        });

        console.log("Address added successfully!");
    }
    catch(error){
        console.error("Error adding address: ", error);
        throw error;
    }
};
