import { collection, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const deleteFromCart = async (cartId: string, productId: string) => {
    try {
        const cartDocRef = doc(collection(db, "cart"), cartId);

        const cartSnapshot = await getDoc(cartDocRef);

        if(!cartSnapshot.exists()){
            console.log(`Cart with ID ${cartId} does not exist.`);
            return;
        }

        const cartData = cartSnapshot.data();

        if(!cartData || !Array.isArray(cartData.items)){
            console.log("Invalid cart data.");
            return;
        }

        const productToRemove = cartData.items.find((item: { id: string }) => item.id === productId);

        if (!productToRemove) {
            console.log(`Product with ID ${productId} not found in cart.`);
            return;
        }

        await updateDoc(cartDocRef, {
            items: arrayRemove(productToRemove),
        });

        console.log(`Product ${productId} removed from the cart.`);
    }
    catch(error){
        console.log("Error at deleting product from cart:", error);
        return;
    }
};
