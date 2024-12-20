import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";

export interface Option {
  value: string;
  label: string;
  driver: Record<string, any>; 
}

export const fetchRegisteredDrivers = async (
  organizationId: string
): Promise<Option[]> => {
  try {
    const usersRef = collection(db, "users");

    const driversQuery = query(usersRef, where("organizationId", "==", organizationId));

    const querySnapshot = await getDocs(driversQuery);

    const drivers: Option[] = querySnapshot.docs.map((doc) => {
      const driverData = doc.data();

      return {
        value: doc.id, 
        label: driverData.name || "Unknown Driver",
        driver: driverData, 
      };
    });

    console.log(`Fetched ${drivers.length} drivers for organizationId: ${organizationId}`);
    return drivers;
  }
  catch(error){
    console.error("Error fetching registered drivers:", error);
    throw new Error("Failed to fetch registered drivers");
  }
};
