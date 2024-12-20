import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { updateUserEvents } from "@/redux/authSlice";
import { editEvent } from "./editEvents";


export const registerEvent = async (userId: string, eventId: string, dispatch: any) => {
  try {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      events: arrayUnion(eventId),
    });
    dispatch(updateUserEvents(eventId));
    const eventDocRef = doc(db, "events", eventId);
    const eventSnapshot = await getDoc(eventDocRef);
    if(eventSnapshot.exists()){
        const eventData = eventSnapshot.data();
        const currentRegistered = eventData.registered || 0; 
        editEvent(eventId, { registered: currentRegistered + 1 }, dispatch);
        // console.log(`User ${userId} successfully registered for event ${eventId}`);
    }
  }
  catch(error){
    console.error("Error registering for event: ", error);
    return;
  }
};
