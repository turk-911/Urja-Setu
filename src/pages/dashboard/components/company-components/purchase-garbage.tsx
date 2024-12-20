import { Button } from "@/components/ui/moving-border";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";

export function SellGarbageCompany() {
  const words1 = [
    {
      text: "Save",
    },
    {
      text: "Nature",
      className: "text-green-500",
    },
    {
      text: "with",
    },
    {
      text: "urja-setu",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start h-full bg-white/30 shadow-xl rounded-xl p-4">
      <TypewriterEffectSmooth words={words1} />
      <motion.p className="text-gray-500">
      Transform waste into wealth! By purchasing recyclable garbage, your company can reduce environmental impact and unlock a profitable revenue stream. Embrace sustainability—turn trash into treasure today! ♻️
      </motion.p>
      <div className="w-full h-full flex justify-center items-center">
      <Button
        borderRadius="100px"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Purchase Garbage
      </Button>
      </div>
    </div>
  );
}
