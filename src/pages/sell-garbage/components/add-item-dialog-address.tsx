import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import LocationAutocomplete from "./map-auto-complete";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { addAddress } from "@/api/user/addAddress";


interface AddItemDialogProps {
  title: string;
  onAdd: (newAddress: {
    id: string;
    address: string;
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  }) => void;
  fields: { name: string; label: string }[];
}

export function AddItemDialogAddress({
  title,
  onAdd,
  fields,
}: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: -1,
    lng: -1,
  });

  const auth = useIsAuthorized();
  if(!auth.auth.uid){
    console.log("Unauthorized");
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { address, city, state } = formData;

    if (
      !address ||
      !city ||
      !state ||
      JSON.stringify(coordinates) === JSON.stringify({ lat: -1, lng: -1 })
    ) {
      return;
    }

    onAdd({
      id: Date.now().toString(),
      address,
      city,
      state,
      coordinates,
    });

    setFormData({});
    setOpen(false);
    const newAddress = {
      address: formData.address,
      state: formData.state,
      city: formData.city,
      coordinates: coordinates
    }
    console.log(formData);
    
    await addAddress(auth.auth.uid ?? "", newAddress);
  };

  // console.log(formData);
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New {title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-2">
        <div className="bg-white/30 rounded-lg shadow-lg p-4">
          <DialogClose>
            <X className=" absolute right-7 top-7 h-4 w-4" />
          </DialogClose>

          <DialogHeader>
            <DialogTitle>Add New {title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div
              key={"Location"}
              className="flex items-center gap-4 justify-center"
            >
              <Label htmlFor={"Loation"} className="text-right">
                Location
              </Label>
              <LocationAutocomplete setCoordinates={setCoordinates} />
            </div>

            {fields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.name} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  containerClassName="col-span-3"
                />
              </div>
            ))}
            <Button type="submit" className="ml-auto">
              Add {title}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
