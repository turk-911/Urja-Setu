import { fetchEvents } from "@/api/events/fetchEvents";
import { CarouselItem, CustomSlider } from "@/components/ui/customSlider";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";

const carouselItems: CarouselItem[] = [
  {
    title: "Explore Nature",
    description: "Discover the beauty of untouched landscapes",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Urban Adventures",
    description: "Experience the excitement of city life",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Culinary Delights",
    description: "Savor the flavors of world cuisine",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Cultural Wonders",
    description: "Immerse yourself in rich traditions",
    image: "/placeholder.svg?height=600&width=800",
  },
];

export function Events() {
  const dispatch = useDispatch();
  const events = useAppSelector(state => state.event.events);
  if(!events.length){
    fetchEvents(dispatch);
  }
  const getRandomEvents = (events: any[], count: number) => {
    const shuffled = [...events].sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, Math.max(events.length, count));
  };
  const randomEvents = getRandomEvents(events, 4);
  const eventDetails = randomEvents.map((event) => ({
    title: event.title || "Untitled Event",
    description: event.shortDescription || "",
    image: event.image || "",
  }));

  return (
  <>
  <div className="relative mx-auto bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg overflow-hidden">
    <CustomSlider carouselItems={eventDetails}/>
  </div>
  </>
  );
}
