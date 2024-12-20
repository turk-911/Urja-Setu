"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo1() {
  return (
    <div className="md:mt-10 sm:mt-10 lg:mt-0 h-[300px] lg:h-[500px] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "",
    designation: "",
    content: (
      <p>
        India is the 3rd largest producer of e-waste globally, generating over
        3.2 million tonnes yearly. Yet, 95% of this e-waste is processed
        informally, causing hazardous impacts on human health and the
        environment.
      </p>
    ),
  },
  {
    id: 1,
    name: "",
    designation: "",
    content: (
      <p>
        India generates approximately 62 million tonnes of waste annually, with
        urban areas contributing a significant share. Despite the large volume,
        only 75-80% of waste is collected, and much of it remains unprocessed or
        unsorted.
      </p>
    ),
  },
  {
    id: 2,
    name: "",
    designation: "",
    content: (
      <p>
        Plastic waste poses a severe environmental threat in India, with the
        country generating around 3.5 million tonnes annually. However, only 60%
        of plastic waste is recycled, leaving the rest to accumulate in
        landfills and oceans.
      </p>
    ),
  },
];
