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
import { addPhoneNumber } from "@/api/user/addPhoneNumber";
import { useAppSelector } from "@/redux/hooks";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";

interface AddItemDialogProps {
  title: string;
  onAdd: (newPhoneNumber: { id: string; value: string }) => void;
  fields: { name: string; label: string }[];
}

export function AddItemDialogPhone({
  title,
  onAdd,
  fields,
}: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const auth = useIsAuthorized();
  if(!auth.auth.uid){
    console.log("Unauthorized");
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = formData.value;
    console.log("phone");
    
    if (!value) {
      alert("Please fill out the required field.");
      return;
    }

    onAdd({ id: Date.now().toString(), value });
    setFormData({});
    setOpen(false);
    await addPhoneNumber(auth.auth.uid ?? "", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New {title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-2">
        <div className="p-4 bg-white/30 shadow-xl rounded-lg">
          <DialogClose>
            <X className=" absolute right-7 top-7 h-4 w-4" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Add New {title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4 mt-6">
            {fields.map((field) => (
              <div
                key={field.name}
                className="flex items-start gap-4 justify-center flex-col"
              >
                <Label htmlFor={field.name} className="flex justify-center">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
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
