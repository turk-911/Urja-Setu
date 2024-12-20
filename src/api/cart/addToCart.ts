// import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
// import { db } from "../../utils/firebase";
// import { fetchCart } from "./fetchCart";
// import { updateCartId } from "@/redux/authSlice";

// export const addToCart = async (cartId: string, prodId: string, userId: string, quantity: number, dispatch: any) => {
//     try {
//         const cartDocRef = doc(collection(db, "cart"), cartId);

//         const cartSnapshot = await getDoc(cartDocRef);

//         if(!cartSnapshot.exists()){
//             await setDoc(cartDocRef, {
//                 items: [{ id: prodId, quantity }],
//             });
//             console.log(`New cart created with product ${prodId} and quantity ${quantity}`);
//             const userDocRef = doc(collection(db, "users"), userId);
//             await updateDoc(userDocRef, {
//                 cartId: cartId,  
//             });
//             dispatch(updateCartId(cartId));
//             fetchCart(cartId, dispatch);
//             return;
//         }

//         const cartData = cartSnapshot.data();

//         if(!cartData || !Array.isArray(cartData.items)){
//             console.log("Invalid cart data.");
//             return;
//         }

//         const existingItemIndex = cartData.items.findIndex((item: { id: string }) => item.id === prodId);

//         if(existingItemIndex >= 0){
//             const updatedItems = [...cartData.items];
//             updatedItems[existingItemIndex].quantity += quantity;

//             await updateDoc(cartDocRef, { items: updatedItems });
//             console.log(`Updated product ${prodId} with new quantity ${updatedItems[existingItemIndex].quantity}`);
//         }
//         else{
//             await updateDoc(cartDocRef, {
//                 items: arrayUnion({ id: prodId, quantity }),
//             });
//             console.log(`Added product ${prodId} with quantity ${quantity} to the cart`);
//         }
//         fetchCart(cartId, dispatch);
//     }
//     catch(error){
//         console.log("Error At Add To Cart");
//         return;
//     }
// }


import { collection, doc, query, where, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { fetchCart } from "./fetchCart";

export const addToCart = async (userId: string, prodId: string, quantity: number = 1, dispatch: any) => {
    try {
        const cartCollectionRef = collection(db, "cart");

        const userCartQuery = query(cartCollectionRef, where("userId", "==", userId));
        const userCartSnapshot = await getDocs(userCartQuery);

        let cartDocRef;

        if (userCartSnapshot.empty) {
            cartDocRef = doc(cartCollectionRef);
            await setDoc(cartDocRef, {
                userId: userId,
                items: [{ id: prodId, quantity }],
            });
            fetchCart(userId, dispatch);
            console.log("DOne1");
            console.log(`New cart created for userId ${userId} with product ${prodId} and quantity ${quantity}`);
            return;
        }

        const existingCartDoc = userCartSnapshot.docs[0];
        cartDocRef = doc(cartCollectionRef, existingCartDoc.id);
        const cartData = existingCartDoc.data();

        if (!cartData || !Array.isArray(cartData.items)) {
            console.error("Invalid cart data.");
            return;
        }

        const existingItemIndex = cartData.items.findIndex((item: { id: string }) => item.id === prodId);

        if (existingItemIndex >= 0) {
            const updatedItems = [...cartData.items];
            updatedItems[existingItemIndex].quantity += quantity;

            await updateDoc(cartDocRef, { items: updatedItems });
            console.log(`Updated product ${prodId} with new quantity ${updatedItems[existingItemIndex].quantity}`);
        }
        else{
            await updateDoc(cartDocRef, {
                items: arrayUnion({ id: prodId, quantity }),
            });
            console.log(`Added product ${prodId} with quantity ${quantity} to the cart`);
        }
        fetchCart(userId, dispatch);
        console.log("DOne");
        
    }
    catch(error){
        console.error("Error adding to cart:", error);
    }
};
