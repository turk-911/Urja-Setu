import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const toggleLikeProduct = async (productId: string, userId: string): Promise<void> => {
    try {
        const productDocRef = doc(db, "products", productId);

        const productSnapshot = await getDoc(productDocRef);

        if (!productSnapshot.exists()) {
            console.error(`Product with ID ${productId} does not exist.`);
            return;
        }

        const productData = productSnapshot.data();

        const isLiked = Array.isArray(productData.liked) && productData.liked.includes(userId);

        if (isLiked) {
            await updateDoc(productDocRef, {
                liked: arrayRemove(userId),
            });
            console.log(`User ${userId} unliked product ${productId}`);
        }
        else{
            await updateDoc(productDocRef, {
                liked: arrayUnion(userId),
            });
            console.log(`User ${userId} liked product ${productId}`);
        }
    }
    catch(error){
        console.error("Error toggling like:", error);
        return;
    }
};
