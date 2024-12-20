import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DateSeparator from "./date-seprator";
import MessageBubble, { Message } from "./message-bubble";
import InputField from "./input-field";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { createChat } from "@/api/chat/createChat";
import { useDispatch } from "react-redux";
import { sendMessage } from "@/api/chat/sendMessage";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { listenForMessages } from "@/api/chat/listenForMessage";
import { Timestamp } from "@firebase/firestore";
import { getOrderById } from "@/api/orders/getOrderById";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatID, setChatID] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const auth = useIsAuthorized();
  if(!auth.auth.uid){
    console.log("Unauthorized");
    return;
  }
  const {id} = useParams();
  const order = useAppSelector(state => state.order.order);
  const chatOrder = order.find((o) => o.id === id);
  if(chatID == ""){
    const fetchChatID = async () => {
      if (!id) {
        setChatID("");
        return;
      }

      try {
        let fetchedChatID = await getOrderById(id);
        console.log(fetchedChatID);
        
        if(!fetchedChatID){
          fetchedChatID = await createChat(chatOrder?.order.deliveryPerson?.id ?? "", chatOrder?.order.seller?.id ?? "", id, dispatch);
        }
        if(fetchedChatID){
          setChatID(fetchedChatID);
        }
        else{
          console.error("Failed to fetch or create a valid chat ID.");
          setChatID("");
        }
      }
      catch(error: any){
        console.error("Error fetching chat ID:", error.message);
        setChatID("");
      }
    };

    fetchChatID();
    // console.log(chatID);
  }
   
  useEffect(() => {
    if(chatID != ""){
      const unsubscribe = listenForMessages(chatID, setMessages);
      console.log(messages);
      
      return () => unsubscribe();
    }
  }, [chatID, chatOrder, dispatch]);
  

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string) => {
    sendMessage(chatID ?? "", auth.auth.uid ?? "", text, "text");
  };

  const convertTimestampToDate = (timestamp?: Timestamp): string => {
    if (!timestamp) return ""; 
    
    if (timestamp?.toDate) {
      return timestamp.toDate().toISOString().split('T')[0]; 
    } else if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toISOString().split('T')[0];
    }
  
    return ""; 
  };
  

  return (
    <div className=" w-full max-w-4xl h-[90vh] bg-white/30 rounded-lg shadow-xl overflow-hidden flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-scroll no-scrollbar p-4 space-y-4 "
      >
        <AnimatePresence>

          
        {messages &&
          messages.reduce((acc: JSX.Element[], message: Message, index) => {
            const currentDate = convertTimestampToDate(message.timestamp); 
            const prevDate =
              index > 0 ? convertTimestampToDate(messages[index - 1].timestamp) : null;

            if (currentDate && currentDate !== prevDate) { 
              acc.push(
                <DateSeparator key={`date-${currentDate}`} date={currentDate} />
              );
            }

            acc.push(
              <MessageBubble
                key={message.id}
                message={message}
                authId={auth.auth.uid}
              />
            );

            return acc;
          }, [])
        }


        </AnimatePresence>
      </div>
      <InputField onSendMessage={addMessage} />
    </div>
  );
}