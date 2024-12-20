// import { collection, doc, getDoc } from "firebase/firestore";
// import { db } from "../../utils/firebase";
// import { Product } from "@/types/product";
// import { setCart } from "@/redux/cartSlice";

// export const fetchCart = async (id: string, dispatch: any) => {
//     try {
//         const cartDocRef = doc(collection(db, "cart"), id);

//         const cartSnapshot = await getDoc(cartDocRef);

//         if (!cartSnapshot.exists()) {
//             console.log(`Cart with ID ${id} does not exist.`);
//             return null;
//         }

//         const cartData = cartSnapshot.data();

//         if (!cartData || !Array.isArray(cartData.items)) {
//             console.log("Cart does not contain valid items.");
//             return null;
//         }

//         const populatedItems = await Promise.all(
//             cartData.items.map(async (item: { id: string; quantity: number }) => {
//                 const productDocRef = doc(collection(db, "products"), item.id);
//                 const productSnapshot = await getDoc(productDocRef);

//                 if (!productSnapshot.exists()) {
//                     console.log(`Product with ID ${item.id} does not exist.`);
//                     return null;
//                 }

//                 const productData = productSnapshot.data();
//                 const organizationDocRef = doc(
//                     collection(db, "users"),
//                     productData.seller
//                 );
//                 const organizationSnapshot = await getDoc(organizationDocRef);

//                 const organizationName = organizationSnapshot.exists()
//                     ? organizationSnapshot.data().name
//                     : "Urja Setu";
//                 return {
//                     ...productData,
//                     seller: organizationName,
//                     id: item.id,
//                     quantity: item.quantity,
//                 } as Product & { quantity: number };
//             })
//         );

//         cartData.items = populatedItems.filter((item) => item !== null);

//         dispatch(setCart(cartData.items));
//         console.log(cartData.items);
//         return;
//     }
//     catch(error){
//         console.log("Error At fetchCart ", error);
//         return;
            
//     }
// }


import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Product } from "@/types/product";
import { setCart } from "@/redux/cartSlice";

export const fetchCart = async (userId: string, dispatch: any) => {
    try {
        const cartCollectionRef = collection(db, "cart");
        const userCartQuery = query(cartCollectionRef, where("userId", "==", userId));
        const userCartSnapshot = await getDocs(userCartQuery);

        if (userCartSnapshot.empty) {
            console.log(`No cart found for userId ${userId}.`);
            return null;
        }

        const cartDoc = userCartSnapshot.docs[0];
        const cartData = cartDoc.data();

        if (!cartData || !Array.isArray(cartData.items)) {
            console.log("Cart does not contain valid items.");
            return null;
        }

        const populatedItems = await Promise.all(
            cartData.items.map(async (item: { id: string; quantity: number }) => {
                const productDocRef = doc(collection(db, "products"), item.id);
                const productSnapshot = await getDoc(productDocRef);

                if (!productSnapshot.exists()) {
                    console.log(`Product with ID ${item.id} does not exist.`);
                    return null;
                }

                const productData = productSnapshot.data();
                const organizationDocRef = doc(
                    collection(db, "users"),
                    productData.seller
                );
                const organizationSnapshot = await getDoc(organizationDocRef);

                const organizationName = organizationSnapshot.exists()
                    ? organizationSnapshot.data().name
                    : "Urja Setu";

                return {
                    ...productData,
                    seller: organizationName,
                    id: item.id,
                    quantity: item.quantity,
                } as Product & { quantity: number };
            })
        );

        cartData.items = populatedItems.filter((item) => item !== null);

        dispatch(setCart(cartData.items));
        console.log(cartData.items);
        return cartData.items;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
};
