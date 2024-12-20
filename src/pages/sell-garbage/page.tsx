import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { FinalForm } from "./components/final-form";

export default function SellGarbage() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sell Garbage</Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[800px] border-none p-4">
        <div className="p-4 bg-white rounded-lg shadow-xl">
        <DialogClose className="absolute right-8"><X className="h-4 w-4"/></DialogClose>
          <DialogHeader className="mb-8">
            <DialogTitle>Sell Garbage</DialogTitle>
            <DialogDescription>Save Nature with urja-setu.</DialogDescription>
          </DialogHeader>
          <FinalForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}