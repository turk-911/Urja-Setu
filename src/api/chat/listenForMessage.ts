import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export const listenForMessages = (chatId: string, setMessages: React.Dispatch<React.SetStateAction<any>>) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp'));

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(messages);
    
    setMessages(messages); 
  });
};
