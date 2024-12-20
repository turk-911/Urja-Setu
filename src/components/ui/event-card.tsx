import { registerEvent } from "@/api/events/registerEvent";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { Event } from "@/types/event";
import { Building2, Calendar, Heart, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface EventCardProps {
  id: string;
  event: Event;
  onClick: () => void;
  deleteEvent: () => void;
  updateEvent: (event: Event) => void;
}

export function EventCard({
  id,
  event,
  deleteEvent,
  updateEvent,
}: EventCardProps) {
  const dispatch = useDispatch();
  const { auth } = useIsAuthorized();
  const userId = auth.uid!;
  let orgName;
  if (auth.role === "Organization") {
    orgName = auth.name;
  }
  const registeredEventsArray = auth.details.events;
  const isRegistered = registeredEventsArray?.includes(event);
  const [registered, setRegistered] = useState(isRegistered);
  useEffect(() => {
    setRegistered(isRegistered);
  }, [isRegistered]);

  const eventDate =
    typeof event.date === "string"
      ? new Date(event.date).toLocaleDateString()
      : event.date.toDate().toLocaleDateString();

  const handleRegisterToggle = () => {
    if (!isRegistered) registerEvent(userId, id, dispatch);
    setRegistered(true);
  };

  return (
    <div className="bg-gradient-to-r green-100 p-4 rounded-xl mb-4">
  <div className="lg:flex bg-white relative p-6 rounded-xl shadow-lg hover:shadow-lg transition-all duration-500 items-center w-full overflow-hidden">
    {event.companyName === orgName && (
      <>
        <div className="absolute top-3 right-3 flex space-x-3">
          <button
            className="text-black hover:text-red-700 bg-white p-1 rounded-full shadow hover:shadow-lg transition duration-200"
            onClick={deleteEvent}
            aria-label="Delete Event"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            className="text-black hover:text-blue-700 bg-white p-1 rounded-full shadow hover:shadow-lg transition duration-200"
            onClick={() => updateEvent(event)}
            aria-label="Update Event"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487c-.895-.894-2.07-1.386-3.294-1.386-1.225 0-2.4.492-3.294 1.386L4.993 9.768c-.39.39-.674.879-.824 1.41l-1.137 4.097a1.094 1.094 0 001.342 1.342l4.096-1.137c.531-.15 1.02-.434 1.41-.824l5.281-5.281c.895-.894 1.387-2.07 1.387-3.294 0-1.225-.492-2.4-1.387-3.294z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 19.5h-6"
              />
            </svg>
          </button>
        </div>
      </>
    )}

    {/* Event Card */}
    <div className="lg:w-[45%] w-full relative group rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-lg">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="h-64 w-full object-cover rounded-lg group-hover:opacity-60 transition-all duration-500"
        />
        {/* Details on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
          <div className="text-white space-y-2 text-center">
            <p className="text-lg font-bold">{event.title}</p>
            <p className="text-sm">📍 {event.location}</p>
            <p className="text-sm">🗓️ {eventDate}</p>
            <p className="text-sm">
              💚 {event.registered ? `${event.registered}x` : 0} participants
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Event Details */}
    <div className="lg:w-[55%] w-full h-full p-4">
      <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-500 transform hover:shadow-2xl">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title} 🚀</h3>
          <p className="text-gray-700 mb-3 font-medium">
            Potential reward coins: {event.potentialEarnings ?? "NA"}
          </p>
          <p className="text-gray-600 text-sm">
            {event.fullDescription.slice(0, 300)}...{" "}
            <span className="text-blue-500 cursor-pointer">Read More</span>
          </p>
        </div>
        <div className="p-4">
          <button
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
              registered
                ? "bg-orange-300 hover:bg-orange-400"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={handleRegisterToggle}
          >
            {registered ? "Registered" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
}
