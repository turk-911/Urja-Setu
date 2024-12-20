import React from "react";
import { Compare } from "@/components/ui/compare";

export function CompareImages() {
  return (
    <div className="text-center">
      <div className="p-4 dark:bg-neutral-900 border-[#2F5233] dark:border-neutral-800 px-4 flex w-full justify-center mt-10 ">
        <Compare
          firstImage="/map.jpg"
          secondImage="/graph.gif"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
          slideMode="hover"
        />
      </div>
    </div>
  );
}
