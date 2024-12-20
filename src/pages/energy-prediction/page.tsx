import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SolarForm from "./components/solar";
import WindForm from "./components/wind";
import AnimatedBackground from "./components/animated-background";

const AnimatedTabContent = ({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function EnergyCalculator() {
  const [activeTab, setActiveTab] = useState("solar");

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-green-400 to-blue-500">
      <AnimatedBackground />
      <div className="container mx-auto p-2 max-w-2xl relative z-10">
        <div className="bg-white/40 backdrop-blur-md p-8 shadow-2xl rounded-lg mt-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
            Energy Predictor
          </h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="solar" className="text-lg font-semibold">Solar</TabsTrigger>
              <TabsTrigger value="wind" className="text-lg font-semibold">Wind</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <AnimatedTabContent isActive={activeTab === "solar"}>
                <SolarForm />
              </AnimatedTabContent>
              <AnimatedTabContent isActive={activeTab === "wind"}>
                <WindForm />
              </AnimatedTabContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

