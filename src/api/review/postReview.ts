import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Review } from "@/types/product";
import { fetchReviews } from "./fetchReviews";

export const postReview = async (productId: string, review: Review, dispatch: any) => {
    try {
        console.log(review, "call aa gayi");
        console.log(productId, review);
        
        const productDocRef = doc(db, "products", productId);

        await updateDoc(productDocRef, {
            reviews: arrayUnion(review), 
        });
        fetchReviews(productId, dispatch);
        console.log(`Review added to product with ID ${productId}`);
    }
    catch(error){
        console.error("Error posting review:", error);
    }
};
