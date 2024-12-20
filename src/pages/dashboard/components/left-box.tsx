import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { Box } from "../../../components/box";
import RedeemStoreCompany from "./company-components/redeem-store";
import RedeemStoreDevileryBoy from "./delivery-boy-components/redeem-store";
import { Calendar } from "./left-box-components/calender";import { Goals } from "./left-box-components/goals";
import { UserCard } from "./left-box-components/user-card";
import RedeemStoreUser from "./user-components/redeem-store";
import { fetchRegisteredEvents } from "@/api/events/fetchRegisteredEvents";
import { Event } from "@/types/event";
import { useState } from "react";

export function LeftBox() {
  // User
  const [eventDates, setDates] = useState<Event[]>([]);
  const auth = useIsAuthorized();
  if(!auth.isLogin){
      console.log("Unauthorized");
      return;
  }

const fetchDates = async () => {
  try {
    const events = await fetchRegisteredEvents(auth.auth.details.eventsId);
    setDates(events);
    console.log("Hello");
    
  }
  catch (error) {
      console.error("Error fetching events:", error);
  }
};
  
if (eventDates.length === 0) {
    fetchDates();
}
  

  const user = {
    name: auth.auth.name?? "User",
    address: auth.auth.details.address ?? "NA",
    avatarUrl: auth.auth.photoURL ?? "NA",
  };
  
  const markedDates = eventDates.map((event) => {
    const eventDate = event.date.toDate();
    return {
      date: eventDate,
      type: "type3",
    };
  });
  const type = ['one','two'];

  return (
    <Box className="flex flex-col gap-2 backdrop-blur-sm rounded-lg p-4 bg-green-50 shadow-xl">
      <UserCard user={user} />
      <Calendar markedDates={markedDates} />
      <Goals better={20} title="Weekly target" progress={12} total={20} trend="up"/>
      {type.length==1 && <RedeemStoreUser/>}
      {type.length==2 &&<RedeemStoreCompany/>}
      {type.length==1 &&<RedeemStoreDevileryBoy/>}
    </Box>
  );
}
