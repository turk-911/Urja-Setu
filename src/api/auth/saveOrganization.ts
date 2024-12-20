import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const saveOrganization = async (id: string): Promise<void> => {
  try {
    const orgRef = doc(db, "users", id);

    let defaultData: any = {
      address: "Salem",
      events: [],
      followers: [],
      phone: "",
      role: "Organization",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    updateDoc(orgRef, defaultData);
    console.log("Successfully Updated Default Data");
    return;
  }
  catch(error : any){
    console.error("Error saving organization:", error.message);
  }
};
