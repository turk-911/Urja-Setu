import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Event } from "@/types/event"; 
import { updateEvent } from "@/redux/eventSlice";

export const editEvent = async (eventId: string, eventFields: Partial<Event>, dispatch: any) => {
    try {
        const eventRef = doc(db, "events", eventId);

        await updateDoc(eventRef, eventFields);
        const eventSnapshot = await getDoc(eventRef);

        if(eventSnapshot.exists()){
            const updatedEvent = eventSnapshot.data() as Event;
            dispatch(updateEvent(updatedEvent));
            // dispatch
        }

        console.log("Event updated successfully");
    }
    catch(error){
        console.error("Error updating event: ", error);
    }
};
