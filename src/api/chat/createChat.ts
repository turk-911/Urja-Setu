import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { setChatId } from '@/redux/orderSlice';

export const createChat = async (deliveryPersonId: string, userId: string, orderId: string, dispatch: any) => {
  try {
    const chatRef = collection(db, 'chats');
    const newChat = await addDoc(chatRef, {
      type: 'deliveryPerson-user',
      participants: [deliveryPersonId, userId],
    });
    const id = newChat.id;
    dispatch(setChatId({id, orderId}));
    const orderDocRef = doc(db, 'orders', orderId);
    
    await updateDoc(orderDocRef, {
      'chatId': id,
    });
    
    return id;
  }
  catch(error){
    console.error('Error creating chat: ', error);
  }
};
