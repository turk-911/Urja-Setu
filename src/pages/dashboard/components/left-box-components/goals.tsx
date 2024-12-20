import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { format } from "date-fns";

interface GoalsProps {
  title: string;
  progress: number;
  total: number;
  better: number;
  trend?: "up" | "down" | "neutral";
  description?: string;
  deadline?: Date;
  weeklyBreakdown?: number[];
}

export function Goals({
  title,
  progress,
  total,
  better,
  trend = "neutral",
  description = "Help me i want to sleep",
  deadline = new Date(),
  weeklyBreakdown = [],
}: GoalsProps) {
  const percentage = Math.round((progress / total) * 100);

  return (
    <Card
      className="px-4 pt-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg flex flex-col justify-between w-full"
    >
      <CardContent className="p-4 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold truncate mb-4">{title}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant={trend === "up" ? "success" : trend === "down" ? "destructive" : "secondary"}
                  className="mb-4 text-xs py-2 px-3"
                >
                  {trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : trend === "down" ? (
                    <ArrowDownRight className="h-3 w-3" />
                  ) : null}
                  {percentage}%
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{progress} out of {total}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-black/60 mb-2">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {format(deadline, "d MMM yyyy")}</span>
        </div>
        <Progress value={percentage} className="h-4" />
        <p className="flex w-full justify-end mt-2 text-sm text-black/60 mb-4">{better}% more than last week</p>
        {weeklyBreakdown.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Weekly Progress:</h4>
            <ul className="space-y-1">
              {weeklyBreakdown.map((value, index) => (
                <li key={index} className="text-xs text-gray-700">
                  Week {index + 1}: {value}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
