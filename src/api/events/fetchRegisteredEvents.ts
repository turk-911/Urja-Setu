import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Event } from "@/types/event";

export const fetchRegisteredEvents = async (eventsId: string[]) => {
  try {
    const events = await Promise.all(
      eventsId.map(async (eventId) => {
        const eventDocRef = doc(collection(db, "events"), eventId);
        const eventSnapshot = await getDoc(eventDocRef);

        if (!eventSnapshot.exists()) {
          console.log(`Event with ID ${eventId} does not exist.`);
          return null;
        }

        const eventData = eventSnapshot.data();
        return {
          id: eventId,
          title: eventData.title,
          shortDescription: eventData.shortDescription,
          fullDescription: eventData.fullDescription,
          date: eventData.date,
          companyName: eventData.companyName || "Urja Setu",
          time: eventData.time,
          location: eventData.location,
          image: eventData.image,
          potentialEarnings: eventData.potentialEarnings,
          registered: eventData.registered,
        } as Event;
      })
    );

    const validEvents = events.filter((event) => event !== null) as Event[];

    console.log("Fetched Registered Events: ", validEvents);

    return validEvents;
  }
  catch(error){
    console.error("Error At fetchRegisteredEvents: ", error);
    return [];
  }
};
