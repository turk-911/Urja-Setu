import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../utils/firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { db } from "../../utils/firebase";
import { Order } from "@/types/order"; 

export const addOrder = async (
  sellerDetails: Order['order']['seller'],
  itemName: string,
  weight: number,
  imageFile: File,
): Promise<void> => {
  try {
    const imageRef = ref(storage, `orders/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageURL = await getDownloadURL(snapshot.ref);

    
    const newOrder: any = {
      chatId: "",
      order: {
        seller: {
          id: sellerDetails?.id ?? "",
          name: sellerDetails?.name ?? "",
          image: sellerDetails?.image ?? "",
          phone: sellerDetails?.phone?.[0] ?? "",
          address: sellerDetails?.address?.[0] ?? "",
        },
        itemName: itemName,
        weight: weight,
        image: imageURL,
        company: {
          id: "",
          name: "",
          image: "",
          phone: "",
          address: "",
        },
        deliveryPerson: {
          id: "",
          name: "",
          photo: "",
          contact: "",
          rating: 0,
        },
        pickupTime: {
          start: "",
          end: "",
        },
        status: "pending", 
      },
    };

    const ordersCollection = collection(db, "orders");
    await addDoc(ordersCollection, newOrder);
    console.log("Order added successfully:", newOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Failed to add order");
  }
};
