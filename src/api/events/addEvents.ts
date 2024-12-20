import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Event } from "@/types/event";
import { addEvent } from "@/redux/eventSlice";

export const addEvents = async (event: Event, dispatch: any): Promise<void> => {
    try {
        const eventsCollectionRef = collection(db, "events");

        const eventData = {
            ...event,
            date: typeof event.date === "string" ? Timestamp.fromDate(new Date(event.date)) : event.date,
            registered: event.registered || 0, 
            potentialEarnings: event.potentialEarnings || 0, 
        };

        await addDoc(eventsCollectionRef, eventData);
        dispatch(addEvent(event));
        
        console.log(`Event "${event.title}" added successfully.`);
    } catch (error) {
        console.error("Error adding event:", error);
        throw new Error("Failed to add event");
    }
};
