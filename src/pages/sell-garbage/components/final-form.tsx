"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectableCard } from "./selectable-cards";
import { formSchema, FormValues } from "../../../types/sell-garbage-zod-schema";
import { AddItemDialogAddress } from "./add-item-dialog-address";
import { AddItemDialogPhone } from "./add-item-dialog-phone";
import { Label } from "@/components/ui/label";
import { removePhoneNumber } from "@/api/user/removePhoneNumber";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { removeAddress } from "@/api/user/removeAddress";
import { addOrder } from "@/api/orders/addOrder";

export function FinalForm() {
  const [addresses, setAddresses] = useState<
    {
      id: string;
      address: string;
      city: string;
      state: string;
      coordinates: { lat: number; lng: number };
    }[]
  >([]);
  const [phoneNumbers, setPhoneNumbers] = useState<
    { id: string; value: string }[]
  >([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [selectedPhoneNumberId, setSelectedPhoneNumberId] = useState<
    string | null
  >(null);

  const auth = useIsAuthorized();
  if(!auth.auth.uid){
    console.log("Unauthorized");
    return;
  }


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addresses: [],
      phoneNumbers: [],
      weight: 0,
      image: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const seller = {
      id: auth.auth.uid ?? "",
      name: auth.auth.name ?? "",
      image: auth.auth.photoURL ?? "",
      phone: data.phoneNumbers ?? "",
      address: data.addresses ?? ""
    }
    await addOrder(seller, data.itemName, data.weight, data.image);
    // Handle form submission
  };

  const addAddress = (newAddress: {
    id: string;
    address: string;
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  }) => {
    if (
      !newAddress.coordinates ||
      typeof newAddress.coordinates.lat !== "number" ||
      typeof newAddress.coordinates.lng !== "number"
    ) {
      console.error("Coordinates are not valid.");
      return;
    }
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    form.setValue("addresses", updatedAddresses);
  };

  const addPhoneNumber = (newPhoneNumber: { id: string; value: string }) => {
    const updatedPhoneNumbers = [...phoneNumbers, newPhoneNumber];
    setPhoneNumbers(updatedPhoneNumbers);
    form.setValue("phoneNumbers", updatedPhoneNumbers);
  };

  const deleteAddress = async (id: string) => {
    let delAddress = {
      address: "",
      state: "",
      city: "",
      coordinates: {
        lat: -1,
        lng: -1
      }
    };
    const updatedAddresses = addresses.filter((address) => {address.id !== id;
      if(address.id == id) delAddress = address;
    });
    setAddresses(updatedAddresses);
    form.setValue("addresses", updatedAddresses);
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
    const remAddress = {
      address: delAddress.address,
      state: delAddress.state,
      city: delAddress.city,
      coordinates: delAddress.coordinates
    }
    await removeAddress(auth.auth.uid ?? "", remAddress);
    
    
  };

  const deletePhoneNumber = async (id: string) => {
    let phone = "";
    const updatedPhoneNumbers = phoneNumbers.filter(
      (phoneNumber) => {phoneNumber.id !== id
        if(phoneNumber.id == id) phone = phoneNumber.value;
        }
    );
    await removePhoneNumber(auth.auth.uid ?? "", phone);
    setPhoneNumbers(updatedPhoneNumbers);
    form.setValue("phoneNumbers", updatedPhoneNumbers);
    if (selectedPhoneNumberId === id) {
      setSelectedPhoneNumberId(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="addresses"
            render={() => (
              <FormItem>
                <Label>Addresses</Label>
                <FormControl>
                  <div className="space-y-4">
                    <AnimatePresence>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {addresses.map((address) => (
                          <SelectableCard
                            key={address.id}
                            id={address.id}
                            content={address}
                            isSelected={selectedAddressId === address.id}
                            onSelect={(id) => setSelectedAddressId(id)}
                            onDelete={deleteAddress}
                          />
                        ))}
                      </div>
                    </AnimatePresence>
                    <AddItemDialogAddress
                      title="Address"
                      onAdd={addAddress}
                      fields={[
                        { name: "address", label: "Address" },
                        { name: "city", label: "City" },
                        { name: "state", label: "State" },
                      ]}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="phoneNumbers"
            render={() => (
              <FormItem>
                <Label>Phone Numbers</Label>
                <FormControl>
                  <div className="space-y-4">
                    <AnimatePresence>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {phoneNumbers.map((phoneNumber) => (
                          <SelectableCard
                            key={phoneNumber.id}
                            id={phoneNumber.id}
                            content={phoneNumber.value}
                            isSelected={
                              selectedPhoneNumberId === phoneNumber.id
                            }
                            onSelect={(id) => setSelectedPhoneNumberId(id)}
                            onDelete={deletePhoneNumber}
                          />
                        ))}
                      </div>
                    </AnimatePresence>
                    <AddItemDialogPhone
                      title="Phone Number"
                      onAdd={addPhoneNumber}
                      fields={[{ name: "value", label: "Phone Number" }]}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <Label>Weight (kg)</Label>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <Label>Item Name</Label>
                <FormControl>
                  <Input
                    type="string"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <Label>Image Upload</Label>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button type="submit">Submit</Button>
        </motion.div>
      </form>
    </Form>
  );
}
