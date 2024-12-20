import { Combobox } from "@/components/ui/combo-box";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchRegisteredDrivers } from "@/api/organization/fetchRegisteredDrivers";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { assignOrder } from "@/api/orders/assignOrder";
import { log } from "console";


const schema = z.object({
  driver: z.string().nonempty({ message: "Driver selection is required." }),
});

type FormData = z.infer<typeof schema>;

export default function AssignDriver({id}:string) {

  const [drivers, setDrivers] = useState<Array<any>>([]);
  const {auth} = useIsAuthorized();
  if(!auth.uid){
    console.log("Authorized");
    return;
  }
  useEffect(() => {
    const fetchDrivers = async () => {
      const driver = await fetchRegisteredDrivers(auth.uid ?? "");
      setDrivers(driver);
      console.log(driver);
      
      
    }
    fetchDrivers();
  }, [])

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { driver: "" },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Selected Driver:", data.driver);
    const company = {
      id: auth.uid ?? "",
      name: auth.name ?? "",
      image: auth.photoURL ?? "",
      phone: auth.details.phone ?? "NA",
      address: auth.details.address ?? "Salem"
    }
    const matchingDriver = drivers.find((i) => i.value === data.driver);
    const driverData = {
      id: matchingDriver.value,
      name: matchingDriver.driver.name,
      image: matchingDriver.driver.photoURL,
      phone: matchingDriver.driver.phone ?? "NA",
      address: matchingDriver.driver.address ?? "Salem",
  }
  const pickupTime = {
    start: "9:00AM",
    end: "12:00PM"
  }
  await assignOrder(id, company, driverData, pickupTime)
};

  return (
    <Dialog>
      <DialogTrigger>
        <span className="px-4 py-2 bg-green-500 rounded-md shadow-sm text-white">
          Buy Now
        </span>
      </DialogTrigger>
      <DialogContent className="border-none bg-green-50 p-2">
        <div className="bg-white/30 rounded-lg shadow-lg p-4">
          <DialogClose>
            <X className="w-4 h-4 absolute right-6 top-6" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="mb-6">Choose Driver</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="driver"
                    render={({ field }) => (
                      <FormItem>
                        <label
                          htmlFor="driver"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Select a Driver
                        </label>
                        <FormControl>
                          <Combobox
                            options={drivers}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Choose a driver"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    className="mt-8 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Assign Driver
                  </button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
