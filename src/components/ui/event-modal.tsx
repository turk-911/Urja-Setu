import { Event } from "@/types/event";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./dialog";
interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event) return null;
  const eventDate =
    typeof event.date === "string"
      ? new Date(event.date).toLocaleDateString()
      : event.date.toDate().toLocaleDateString();

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4 py-4 pb-0">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <DialogHeader>
              <DialogTitle>
                <p className="text-2xl">
                  {event.title} by {event.companyName}{" "}
                </p>
              </DialogTitle>
              <p className="text-sm text-black/60">
                <span className="">Location : </span> {event.location}
              </p>
            </DialogHeader>
            <p className="text-black">{event.fullDescription}</p>
          </div>

          <div className="flex justify-between items-center">
            {/*  */}
            <div className="flex flex-col w-full">
              <button className="text-center px-5 py-2 bg-[#94C973] hover:bg-[#2F5233] hover:text-white focus:outline-none rounded-lg font-bold border border-black mb-4">
                Register
              </button>
              <div className="flex justify-between w-full">
                <p className="flex text-sm font-semibold">
                  {event.registered} participants
                </p>
                <p className="flex text-sm font-semibold">{eventDate}</p>
                <p className="flex text-sm font-semibold">{event.time}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}