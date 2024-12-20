import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Product } from "@/types/product";

export const addProduct = async (product: Product) => {
    try {
        const productDocRef = doc(collection(db, "products"), product.id);

        await setDoc(productDocRef, {
            id: product.id,
            title: product.title,
            price: product.price,
            condition: product.condition,
            seller: product.seller,
            liked: product.liked || [],
            rating: product.rating || 0,
            images: product.images,
            category: product.category,
            description: product.description || null, 
            features: product.features || [],
            reviews: product.reviews || [],
            discount: product.discount || null,
        });

        console.log(`Product ${product.title} added successfully`);
    }
    catch(error){
        console.log("Error at adding product:", error);
    }
};
