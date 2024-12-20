import { PhoneCall, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";

interface DeliveryPersonProfileProps {
  name: string;
  photoUrl: string;
  contactNumber: string;
  rating: number;
}

export default function DeliveryPersonProfile({
  name,
  photoUrl,
  contactNumber,
  rating,
}: DeliveryPersonProfileProps) {
  return (
    <Card className="bg-white/30 h-full shadow-md border-none">
      <CardContent className="p-4 flex flex-col space-y-2 gap-8">
        <div className="flex justify-between items-center w-full">
          <Avatar className="w-32 h-32">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center flex flex-col items-center w-full">
            <h3 className="font-bold truncate max-w-full text-3xl">{name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-md hover:bg-tranparent hover:text-black"
              onClick={() => (window.location.href = `tel:${contactNumber}`)}
            >
              <PhoneCall className="h-3 w-3 mr-1" />
              {contactNumber}
            </Button>
            <Button
              size="sm"
              className="px-4 py-2 mt-6 text-md hover:bg-tranparent"
            >
              <Star className="h-3 w-3 mr-1" />
              Rate Now
            </Button>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <Rating rating={rating} size={24} className="gap-8"/>
        </div>

        <Separator className="bg-gray-300"/>

        <div className="text-sm text-gray-500 flex w-full">
          <div className="w-1/2">
            <p className="hover:underline cursor-pointer">Help</p>
            <p className="hover:underline cursor-pointer">Contant Us</p>
          </div>
          <div className="w-1/2">
            <p className="hover:underline cursor-pointer">Learn More</p>
            <p className="hover:underline cursor-pointer">About Us</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
