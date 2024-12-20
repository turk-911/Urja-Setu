import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface UserCardProps {
  name: string;
  address: string;
  avatarUrl?: string;
}

export function UserCard({ user }: { user: UserCardProps }) {
  return (
    <Card
      className="p-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg flex justify-between
     items-center"
    >
      <div className="flex justify-start items-center gap-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="">{user.address}</p>
        </div>
      </div>

      <motion.div className="p-2 rounded-full bg-gray-200">
        <User className="w-8 h-8" />
      </motion.div>
    </Card>
  );
}
