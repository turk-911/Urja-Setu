import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import Notifications from "./notifications";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import handleGoogleSignIn from "@/api/auth/google_auth";
import { useDispatch } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const tabs = [
  { id: "", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "events", label: "Events" },
  { id: "marketplace", label: "Marketplace" },
  { id: "about", label: "About Us" },

];

export default function NavBar() {
  const {value:activeTab, setItem:setActiveTab} = useLocalStorage("tab","home");
  const { isLogin, auth } = useIsAuthorized();
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleLogin = async (role: string | null) => {
    await handleGoogleSignIn(dispatch, role);
    setLoginModalOpen();
    setIsPopupVisible(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const togglePopup = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  return (
    <nav className="sticky top-0 z-40 w-full">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-background/20 px-8 py-3">
        <div className="h-auto md:h-16 px-4 md:px-8 flex md:flex-row w-full gap-4 justify-between items-center bg-green-50/60 backdrop-blur-lg rounded-lg shadow-md p-3">
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            <img
              src="/image.png"
              alt="Logo"
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <p className="text-lg font-bold md:text-2xl">Urja Setu</p>
          </div>

          <div className="hidden md:flex items-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="">
              <TabsList className="flex items-center h-auto md:h-14  p-1">
                {tabs.map((tab) => (
                  <Link to={`/${tab.id}`} key={tab.id} className="">
                    <TabsTrigger
                      
                      value={tab.id}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all  shadow-md bg-white/30",
                        "focus-visible:ring-2 focus-visible:ring-opacity-50",
                        "data-[state=active]:text-white",
                        "data-[state=active]:shadow-none"
                      )}
                    >
                      {activeTab === tab.id && (
                        <motion.span
                          layoutId="bubble"
                          className="absolute inset-0 z-10 bg-white/30 bg-opacity-20 rounded-full border border-white/30 border-opacity-30 shadow-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-20 mix-blend-difference">
                        {tab.label}
                      </span>
                    </TabsTrigger>
                  </Link>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-4 md:w-auto">
            <ShoppingCart fill="black" className="w-6 h-6 md:w-8 md:h-8" />
            <Notifications />
            {!isLogin ? (
              <Button
                className="hidden md:flex font-bold px-4 md:px-8 py-2 md:py-5 text-md md:w-auto"
                onClick={() => handleLogin("user")}
              >
                Login
              </Button>
            ) : null}
            <div className="relative flex items-center">
              {!isLogin ? (
                <></>
              ) : (
                <div className="relative flex items-center">
                  {isLogin && auth.details.wallet && (
                    <div className="flex shadow-md p-2 rounded-xl mr-2 items-center h-12 bg-black/5 hover:bg-black/10 transition">
                      <p className="mr-2">{auth.details.wallet} </p>
                      <img
                        src="/images/urjacoins2.png"
                        alt=""
                        className="h-5 w-5"
                      />
                    </div>
                  )}
                  <div
                    ref={avatarRef}
                    className="flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-xl  bg-black/5 hover:bg-black/10 transition h"
                    onClick={togglePopup}
                  >
                    <Avatar className="h-4 flex items-center">
                      <AvatarImage
                        src={auth.photoURL || ""}
                        className="h-6 rounded-full"
                      />
                      <AvatarFallback>
                        {auth.name && auth.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{auth.name}</span>
                  </div>
                  {isPopupVisible && (
                    <div
                      ref={popupRef}
                      className="absolute top-full mt-2 right-10 bg-white shadow-lg rounded-md py-2 px-4"
                    >
                      <button
                        className="text-gray-900 w-full text-left"
                        // onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-white/30 shadow-lg"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-green-50">
                <SheetHeader>
                  <SheetTitle className="flex">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-2">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </Button>
                  ))}
                  <Button className="mt-4">Login</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function setLoginModalOpen() {
  throw new Error("Function not implemented.");
}
