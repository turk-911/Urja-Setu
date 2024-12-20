import { collection, doc, getDoc, getDocs, query, where, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { fetchCart } from "./fetchCart";

export const removeFromCart = async (userId: string, productId: string, quantity: number, dispatch: any) => {
    try {
        const cartCollectionRef = collection(db, "cart");
        const userCartQuery = query(cartCollectionRef, where("userId", "==", userId));
        const userCartSnapshot = await getDocs(userCartQuery);

        if (userCartSnapshot.empty) {
            console.log(`No cart found for userId ${userId}.`);
            return;
        }

        const cartDoc = userCartSnapshot.docs[0];
        const cartDocRef = doc(cartCollectionRef, cartDoc.id);
        const cartData = cartDoc.data();

        if (!cartData || !Array.isArray(cartData.items)) {
            console.log("Invalid cart data.");
            return;
        }

        const existingItemIndex = cartData.items.findIndex((item: { id: string }) => item.id === productId);

        if (existingItemIndex < 0) {
            console.log(`Product with ID ${productId} not found in cart.`);
            return;
        }

        const existingQuantity = cartData.items[existingItemIndex].quantity;

        if (existingQuantity <= quantity) {
            await updateDoc(cartDocRef, {
                items: arrayRemove(cartData.items[existingItemIndex]),
            });
            console.log(`Removed product ${productId} from the cart.`);
        }
        else{
            const updatedItems = [...cartData.items];
            updatedItems[existingItemIndex].quantity -= quantity;

            await updateDoc(cartDocRef, { items: updatedItems });
            console.log(
                `Decreased quantity of product ${productId} by ${quantity}. New quantity: ${updatedItems[existingItemIndex].quantity}`
            );
        }

        await fetchCart(userId, dispatch);
    }
    catch(error){
        console.error("Error at Remove From Cart:", error);
    }
};
