import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const removePhoneNumber = async (userId: string, phoneNumber: string) => {
    try {
        const userDocRef = doc(db, "users", userId);

        await updateDoc(userDocRef, {
            phone: arrayRemove(phoneNumber),
        });

        console.log("Phone number removed successfully!");
    } catch (error) {
        console.error("Error removing phone number: ", error);
        throw error;
    }
};
