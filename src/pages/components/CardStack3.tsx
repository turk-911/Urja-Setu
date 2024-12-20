"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo3() {
  return (
    <div className="lg:h-[500px] flex items-center justify-center w-full h-[300px]">
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
        "font-bold bg-green-300 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
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
        The industrial waste in India is another environmental concern, with
        approximately 50 million tonnes of industrial waste being generated
        annually. A large part of this waste, including hazardous materials, is
        not disposed of in an environmentally responsible manner.
      </p>
    ),
  },
  {
    id: 1,
    name: "",
    designation: "",
    content: (
      <p>
        India is facing challenges with the management of municipal solid waste,
        with cities like Delhi and Mumbai producing about 11,000 tonnes daily.
        Only a fraction of this waste is treated, leading to overflow in
        landfills and widespread contamination of soil and water.
      </p>
    ),
  },
  {
    id: 2,
    name: "",
    designation: "",
    content: (
      <p>
        Textile waste in India is becoming a significant issue, with around 2.5
        million tonnes of textile waste generated annually. Much of this waste
        comes from fast fashion, which, due to poor recycling rates, contributes
        to significant environmental degradation.
      </p>
    ),
  },
];
