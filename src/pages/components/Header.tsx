import { useEffect, useState, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import handleGoogleSignIn from "@/api/auth/google_auth";
import { useDispatch } from "react-redux";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resetAuth } from "@/redux/authSlice";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLogin, auth, setIsLogin } = useIsAuthorized();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (role: string | null) => {
    await handleGoogleSignIn(dispatch, role);
    setLoginModalOpen(false);
    setIsPopupVisible(false);
  };

  const togglePopup = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target as Node)
    ) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsLogin(false);
    dispatch(resetAuth());
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Urja Setu</span>
            <img src="/image.png" alt="Logo" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2.5 text-gray-700 hover:font-extrabold"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-900 hover:translate-y-1 transition font-bold text-xl"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2">
          {!isLogin ? (
            <>
              <button
                onClick={() => handleLogin(null)}
                className="text-xl font-semibold text-gray-900 hover:bg-[#76B947] rounded-md py-2 px-4 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="text-xl font-semibold text-gray-900 hover:bg-[#76B947] rounded-md py-2 px-4 hover:text-white transition"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="relative flex items-center">
              {isLogin && auth.details.wallet &&  (
                <div className="flex shadow-md p-2 rounded-xl mr-2 items-center h-12 bg-black/5 hover:bg-black/10 transition">
                  <p className="mr-2">{auth.details.wallet} </p>
                  <img src="/images/urjacoins2.png" alt="" className="h-5 w-5" />
                </div>
              )}
              <div
                ref={avatarRef}
                className="flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-xl  bg-black/5 hover:bg-black/10 transition"
                onClick={togglePopup}
              >
                <Avatar>
                  <AvatarImage src={auth.photoURL || ""} />
                  <AvatarFallback>{auth.name && auth.name[0]}</AvatarFallback>
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
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Urja Setu</span>
              <img src="/image.png" alt="Logo" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-900 hover:bg-gray-50 font-bold"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col">
              {!isLogin ? (
                <>
                  <button
                    onClick={() => handleLogin(null)}
                    className="text-xl font-semibold text-gray-900 hover:bg-[#76B947] rounded-md py-2 px-4 hover:text-white transition text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="text-xl font-semibold text-gray-900 hover:bg-[#76B947] rounded-md py-2 px-4 hover:text-white transition text-left"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <div className="relative flex items-center text-left">
                  <div
                    ref={avatarRef}
                    className="flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition"
                    onClick={togglePopup}
                  >
                    <Avatar>
                      <AvatarImage src={auth?.photoURL || ""} />
                      <AvatarFallback>
                        {auth.name && auth.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{auth.name}</span>
                  </div>
                  {isPopupVisible && (
                    <div
                      ref={popupRef}
                      className="absolute top-full mt-2 ght-0 bg-white/30 shadow-lg rounded-md py-2 px-4"
                    >
                      <button
                        className="text-gray-900 w-full text-left"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      <Dialog
        open={loginModalOpen}
        onClose={setLoginModalOpen}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <DialogPanel className="relative bg-white rounded-lg shadow-lg p-6 max-w-[600px] w-full">
          <h2 className="text-center text-2xl p-2 mb-3">Signup as</h2>
          <div className="flex space-x-4 w-full items-center justify-between">
            <img
              src="/user.webp"
              alt=""
              className="h-20 w-[30%] object-cover rounded-full"
            />
            <img
              src="/factory.jpg"
              alt=""
              className="h-20 w-[30%] object-cover rounded-full"
            />
            <img
              src="/delivery-boy.webp"
              alt=""
              className="h-20 w-[30%] object-cover rounded-full"
            />
          </div>
          <div className="flex space-x-4 mt-3">
            <button
              className="w-full bg-[#76B947] hover:bg-[#2F5233] text-white font-semibold py-2 rounded-md transition"
              onClick={() => handleLogin("User")}
            >
              User
            </button>
            <button
              className="w-full bg-[#76B947] hover:bg-[#2F5233] text-white font-semibold py-2 rounded-md transition"
              onClick={() => handleLogin("Organization")}
            >
              Organization
            </button>
            <button
              className="w-full bg-[#76B947] hover:bg-[#2F5233] text-white font-semibold py-2 rounded-md transition"
              onClick={() => handleLogin("DeliveryPerson")}
            >
              Delivery Person
            </button>
          </div>
          <button
            onClick={() => setLoginModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
          >
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </DialogPanel>
      </Dialog>
    </header>
  );
}