import { doc, deleteDoc, getDocs, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { removeEvent } from '@/redux/eventSlice';
// import { updateEventDates } from '@/redux/authSlice';

export const deleteEvent = async (eventId: string, dispatch: any): Promise<void> => {
  try {
    const eventDocRef = doc(db, 'events', eventId);
    await deleteDoc(eventDocRef);

    dispatch(removeEvent(eventId));


    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userUpdates = usersSnapshot.docs.map(async (userDoc) => {
      const userData = userDoc.data();
      if (userData.event && Array.isArray(userData.event)) {
        const updatedEventsArray = userData.event.filter((userEventId: string) => userEventId !== eventId);
        
        if (updatedEventsArray.length !== userData.event.length) {
          const userDocRef = doc(db, 'users', userDoc.id);
          await updateDoc(userDocRef, { event: updatedEventsArray });
          console.log(`Removed event from user ${userDoc.id}`);
        }
      }
    });

    await Promise.all(userUpdates);
    // dispatch(updateEventDates(eventId));

  } 
  catch(error){
    console.error('Error deleting event:', error);
  }
};
