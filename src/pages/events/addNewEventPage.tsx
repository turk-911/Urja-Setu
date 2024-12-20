import AddNewEvent from "./addNewEvent";
export default function AddNewEventPage() {

  return (
    <div className="min-h-screen w-full relative overflow-hidden ">
      {/* <AnimatedBackground /> */}
      <div className="container mx-auto p-2 max-w-2xl relative z-10">
        <div className="bg-white/40  p-8 shadow-md rounded-lg mt-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
            Add New Event
          </h1>
          <AddNewEvent />
        </div>
      </div>
    </div>
  );
}
