import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
export function useIsAuthorized() {
    const auth = useAppSelector((state) => state.auth);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if(auth.uid !== null) setIsLogin(true);
        else setIsLogin(false);
    }, [auth, isLogin]);
    return {isLogin, auth, setIsLogin};
}