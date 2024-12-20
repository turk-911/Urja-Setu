import { Box } from "@/components/box";
import ChatInterface from "../chat-app/components/chat-interface";

export function LeftBox() {
  return (
    <Box className="flex flex-col gap-2 backdrop-blur-sm rounded-lg p-4 bg-green-50 shadow-xl">
      <ChatInterface />
    </Box>
  );
}
