import { useAppSelector } from "@/redux/hooks";
import { Timestamp } from "@firebase/firestore";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export interface Message {
  id: number;
  senderId: string;
  content: string;
  timestamp: Timestamp;
  read: boolean;
  messageType: string
}

interface MessageBubbleProps {
  message: Message;
  authId: string | null,
}

const convertTimestampToTime = (timestamp: Timestamp): string => {
  if (timestamp?.toDate) {
    return timestamp.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (timestamp?.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return "";
};


export default function MessageBubble({ message, authId }: MessageBubbleProps) {
  const bubbleVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const {id} = useParams();
  const order = useAppSelector(state => state.order.order);
  const chatOrder = order.find((o) => o.id === id);
  
  return (
    <motion.div
      className={`flex ${
        message.senderId == authId ? "justify-end" : "justify-start"
      } mb-4`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col ${
          message.senderId == authId ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm font-semibold">{message.senderId == chatOrder?.order.deliveryPerson?.id ? chatOrder.order.deliveryPerson.name : chatOrder?.order.seller?.name}</span>
        </div>
        <motion.div
          className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
            message.senderId == authId
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "bg-gradient-to-r from-gray-100 to-gray-200"
          }`}
          variants={bubbleVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <p className="text-sm">{message.content}</p>
        </motion.div>
        <span className="text-xs text-gray-500 mt-1">
          {/* {new Date(message.read).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} */}
          {convertTimestampToTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
