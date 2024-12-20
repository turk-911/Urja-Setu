import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Event } from "@/types/event";
import { setEvents } from "@/redux/eventSlice";

export const fetchEvents = async (dispatch: any): Promise<void> => {
    
    try {
        const eventsCollectionRef = collection(db, "events");

        const eventsSnapshot = await getDocs(eventsCollectionRef);

        if (eventsSnapshot.empty) {
            console.log("No events found in the database.");
            return;
        }

        const events: Event[] = eventsSnapshot.docs.map(doc => {
            const eventData = doc.data();
      
            const event: Event = {
              id: doc.id,
              title: eventData.title,
              shortDescription: eventData.shortDescription,
              fullDescription: eventData.fullDescription,
              date: eventData.date.toDate().toString(),
              companyName: eventData.companyName,
              time: eventData.time,
              location: eventData.location,
              image: eventData.image,
              potentialEarnings: eventData.potentialEarnings,
              registered: eventData.registered,
            };
      
            return event;
          });
        dispatch(setEvents(events));
        // const userEvents = events.map()
        // dispatch(setUserEvents(events));
        return;
    }
    catch(error){
        console.error("Error fetching events:", error);
        return;
    }
};
