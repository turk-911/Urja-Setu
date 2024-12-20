import { addDeliveryPerson } from "@/api/organization/addDeliveryPerson";
import { Input } from "@/components/ui/input";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function AddDriver() {

  const { auth } = useIsAuthorized();
  const [driverCode, setDriverCode] = useState("");

  if(!auth.uid){
    console.log("Unauthorized");
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDeliveryPerson(driverCode, auth.uid ?? "");
      console.log("Driver added successfully");
      setDriverCode("");
    }
    catch(error){
      console.error("Error adding driver:", error);
    }
  };

  return (
    <motion.div
      className="bg-green-50 p-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-4 bg-white/30 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PlusCircle className="mr-2" /> Add Driver
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="driver-code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Driver Code
            </Label>
            <Input
              type="text"
              id="driver-code"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter driver code"
              onChange={(e) => setDriverCode(e.target.value)} 
            />
          </div>
          <motion.button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Driver
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
