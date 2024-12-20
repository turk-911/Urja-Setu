"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo2() {
  return (
    <div className="h-[300px] lg:h-[500px] flex items-center justify-center w-full">
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
        In India, food waste is a growing concern, with about 40% of produced
        food being wasted. This waste not only contributes to landfills but also
        squanders valuable resources like water and energy used in food
        production.
      </p>
    ),
  },
  {
    id: 1,
    name: "",
    designation: "",
    content: (
      <p>
        The rise of construction and demolition (C&D) waste in India is
        alarming, with cities generating approximately 150 million tonnes of C&D
        waste annually. A significant portion of this waste is often not
        properly recycled or reused, leading to environmental pollution.
      </p>
    ),
  },
  {
    id: 2,
    name: "",
    designation: "",
    content: (
      <p>
        India’s biomedical waste generation is also on the rise, with hospitals
        and healthcare facilities producing about 5.6 lakh tonnes of biomedical
        waste each year. This waste requires special disposal techniques, but
        inadequate infrastructure hampers its safe handling and treatment.
      </p>
    ),
  },
];
