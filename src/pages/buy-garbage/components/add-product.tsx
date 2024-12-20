import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Combobox } from "@/components/ui/combo-box";
import { FileUpload } from "@/components/ui/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const options = [
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
  { label: "Books", value: "Books" },
  { label: "Home Goods", value: "Home Goods" },
  { label: "Other", value: "Other" },
];

export default function AddProduct() {
  // Define Zod schema
  const formSchema = z.object({
    productName: z
      .string()
      .min(2, { message: "Product name must be at least 2 characters." }),
    productDescription: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    features: z.array(
      z.string().min(2, { message: "Feature cannot be empty." })
    ),
    price: z.number().min(1, { message: "Price must be greater than 0." }),
    condition: z.string().nonempty({ message: "Condition is required." }),
    category: z.string().nonempty({ message: "Category is required." }),
    discount: z
      .string()
      .regex(/^\d+$/, { message: "Discount must be a number." })
      .optional(),
    files: z.array(z.instanceof(File)).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      features: [],
      price: 0,
      condition: "",
      category: "",
      discount: "",
      files: [],
    },
  });

  const { handleSubmit, control, setValue, watch } = form;
  const [textAreas, setTextAreas] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Data:", values);
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    console.log(files);
    setFiles(uploadedFiles);
    setValue("files", uploadedFiles);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const addTextArea = () => {
    setTextAreas([...textAreas, ""]);
    setValue("features", [...watch("features"), ""]);
  };

  const textAreasRef = useRef<string[]>(textAreas);

  const updateTextArea = (index: number, value: string) => {
    textAreasRef.current[index] = value;
    setValue("features", [...textAreasRef.current], { shouldValidate: true });
  };

  const removeTextArea = (index: number) => {
    const updatedTextAreas = textAreas.filter((_, i) => i !== index);
    setTextAreas(updatedTextAreas);

    const updatedFeatures = watch("features").filter((_, i) => i !== index);
    setValue("features", updatedFeatures);
  };

  return (
    <motion.div
      className="bg-green-50 p-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="p-4 bg-white/30 shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PlusCircle className="mr-2" /> Add New Product
        </h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="product-name">Product Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="product-name"
                      placeholder="Product Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="product-description">
                    Product Description
                  </Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="product-description"
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <Label htmlFor="features">Features</Label>
              <FormControl>
                <div>
                  <AnimatePresence>
                    <div>
                      {textAreas.map((text, index) => (
                        <motion.div
                          key={index + text}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative mt-2"
                        >
                          <Textarea
                            onChange={(e) =>
                              updateTextArea(index, e.target.value)
                            }
                            placeholder="Feature"
                            className="w-full"
                          />
                          <Button
                            onClick={() => removeTextArea(index)}
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2"
                            type="button"
                          >
                            <X />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                  <Button onClick={addTextArea} type="button" className="mt-2">
                    <PlusCircle className="mr-2" /> Add Feature
                  </Button>
                </div>
              </FormControl>
            </FormItem>
            <FormItem>
              <Label htmlFor="price">Price</Label>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={[price]}
                    onValueChange={(value) => {
                      setPrice(value[0]);
                      setValue("price", value[0]);
                    }}
                    className="w-full"
                  />
                  <div className="text-xl font-bold">{formatPrice(price)}</div>
                </div>
              </FormControl>
            </FormItem>
            <FormField
              control={control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="condition">Condition</Label>
                  <FormControl>
                    <Input {...field} id="condition" placeholder="e.g., New" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="category">Category</Label>
                  <FormControl>
                    <Combobox {...field} options={options} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="discount">Discount</Label>
                  <FormControl>
                    <Input {...field} id="discount" placeholder="e.g., 10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <Label htmlFor="files">Product Images</Label>
              <FormControl>
                <FileUpload onChange={handleFileUpload} />
              </FormControl>
            </FormItem>
            <Button type="submit" className="w-full bg-green-500 text-white">
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
