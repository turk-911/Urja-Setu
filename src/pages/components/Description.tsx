import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export function Description() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-black font-bold px-4 pointer-events-none text-xl text-center md:text-xl lg:text-3xl border border-black">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/80">
          Urja Setu is your one-stop solution for transforming waste into energy. Use AI-powered waste identification, geolocation-based collection points, and blockchain-backed rewards to recycle efficiently and contribute to a sustainable future!
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
