import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const addPhoneNumber = async (userId: string, phoneNumber: string) => {
    try {
        const userDocRef = doc(db, "users", userId);

        await updateDoc(userDocRef, {
            phone: arrayUnion(phoneNumber),
        });

        console.log("Phone number updated successfully!");
    }
    catch(error){
        console.error("Error updating phone number: ", error);
        throw error; 
    }
};
