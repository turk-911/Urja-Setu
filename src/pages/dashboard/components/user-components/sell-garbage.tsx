import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import SellGarbagre from "@/pages/sell-garbage/page";
import { motion } from "framer-motion";

export function SellGarbageUser() {
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
        Turn your recyclable garbage into a greener future! Selling it reduces
        waste, saves natural resources, and earns you money while helping the
        planet thrive. Start today—small actions create big impacts! 🌍♻️
      </motion.p>
      <div className="w-full h-full flex justify-center items-center">
      <SellGarbagre />
      </div>
    </div>
  );
}
