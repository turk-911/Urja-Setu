import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CalendarProps {
  markedDates?: { date: Date; type: string }[];
}

export function Calendar({ markedDates = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getMarkedDateType = (date: Date) => {
    const markedDate = markedDates.find((markedDate) =>
      isSameDay(date, markedDate.date)
    );
    return markedDate ? markedDate.type : null; 
  };

  return (
    <Card className="p-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <Button variant="ghost" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <div className="grid grid-cols-7">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={format(currentMonth, "yyyy-MM")}
            className="grid grid-cols-7 gap-2 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {days.map((day) => (
              <motion.div
                key={format(day, "yyyy-MM-dd")}
                className={cn(
                  "flex items-center justify-center aspect-square h-8 rounded-full text-sm",
                  !isSameMonth(day, currentMonth) && "text-gray-400",
                  isSameDay(day, new Date()) &&
                    "bg-primary text-primary-foreground",
                  getMarkedDateType(day) === "type1" &&
                    "bg-yellow-500 text-white", 
                  getMarkedDateType(day) === "type2" && "bg-red-500 text-white", 
                  getMarkedDateType(day) === "type3" &&
                    "bg-green-500 text-white"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {format(day, "d")}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}
