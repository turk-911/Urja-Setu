import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export const sendMessage = async (chatId: string, senderId: string, content: string, messageType: 'text' | 'image') => {
  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      content,
      messageType,
      timestamp: serverTimestamp(),
      read: false,
    });
  }
  catch(error){
    console.error('Error sending message: ', error);
  }
};
