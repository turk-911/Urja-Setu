import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addEvents } from "@/api/events/addEvents";
import { Event } from "@/types/event";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";

export default function AddNewEvent() {
  const { auth } = useIsAuthorized();
  const companyName = auth.name!;

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    date: "",
    time: "",
    location: "",
    image: "",
    potentialEarnings: 0,
    registered: 0,
    companyName: companyName,
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: Event = {
      id: formData.id,
      title: formData.title,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      image: formData.image,
      potentialEarnings: formData.potentialEarnings,
      registered: formData.registered,
      companyName: formData.companyName,
    };

    addEvents(eventData, dispatch);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          type="text"
          name="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <Input
          type="text"
          name="shortDescription"
          placeholder="Enter a short description"
          value={formData.shortDescription}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Full Description
        </label>
        <Input
          type="text"
          name="fullDescription"
          placeholder="Enter a detailed description"
          value={formData.fullDescription}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <Input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <Input
          type="text"
          name="location"
          placeholder="Enter event location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Enter Image URL{" "}
        </label>
        <Input
          type="string"
          name="image"
          value={formData.image.toString()}
          onChange={handleInputChange}
          placeholder="Enter image URL"
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Potential Earnings
        </label>
        <Input
          type="number"
          name="potentialEarnings"
          placeholder="Enter potential earnings"
          value={formData.potentialEarnings.toString()}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <Button
        type="submit"
        className="flex justify-center items-center w-full mt-4"
      >
        Add Event
      </Button>
    </form>
  );
}
