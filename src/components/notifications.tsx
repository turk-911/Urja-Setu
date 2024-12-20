import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Bell, Info } from "lucide-react";
  

export default function Notifications() {
  let icon = [
    {
      type: "",
      message: "Biweekly Contest 145 and Weekly Contest 427 are approaching. Join here!",
      time: ""
    },
    {
      type: "",
      message: "Biweekly Contest 145 and Weekly Contest 427 are approaching. Join here!",
      time: ""
    },
    {
      type: "",
      message: "Completed a daily challenge for December LeetCoding Challenge 2024",
      time: ""
    },
    {
      type: "",
      message: "Completed a daily challenge for December LeetCoding Challenge 2024",
      time: ""
    },
    {
      type: "",
      message: "Completed a daily challenge for December LeetCoding Challenge 2024",
      time: ""
    },
    {
      type: "",
      message: "Biweekly Contest 145 and Weekly Contest 427 are approaching. Join here!",
      time: ""
    },
    {
      type: "",
      message: "Completed a daily challenge for December LeetCoding Challenge 2024",
      time: ""
    },
    {
      type: "",
      message: "Completed a daily challenge for December LeetCoding Challenge 2024",
      time: ""
    } 
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><Bell fill="black" className="h- w-6 md:h-8 md:w-8"/></DropdownMenuTrigger>
      <DropdownMenuContent className="w-[600px] mr-[150px] mt-4 border-none max-h-[400px] no-scrollbar overflow-y-scroll">
        <div className="bg-white shadow-md m-2 flex flex-col rounded-lg py-3">
          {
            icon.map((i)=>{
              return (
                <>
                  <div className="flex w-full items-center h-auto px-3 bg-gray-100 hover:bg-gray-200">
                    <div className="w-[7%] flex justify-start items-center aspect-square">
                      <Info />
                    </div>
                    <div className="items-center justify-between border-b flex gap-3">
                      <div className="w-full py-2">
                        {i.message}
                      </div>
                      <div className="w-[26%] text-right pr-2">
                        11 hours ago
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
