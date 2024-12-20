import { motion } from "framer-motion";
import { RightBox } from "./components/right-box";
import { LeftBox } from "./components/left-box";
import NavBar from "@/components/nav-bar";

export default function Dashboard() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   fetchOrdersBySellerId("hnTUEE5tJpZVm1wjwYKuf1Nw8e92", dispatch);
  // }, [])
  return (
    <>
    <NavBar />
      <motion.div
        className="h-full p-4 pt-0 transition-all duration-300 ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 h-full p-4">
          <div className="lg:w-[30%] h-full">
            <LeftBox />
          </div>
          <div className="lg:w-[70%] h-full">
            <RightBox />
          </div>
        </div>
      </motion.div>
    </>
  );
}
