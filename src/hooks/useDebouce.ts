import { useEffect, useState } from "react";

export default function useDebounce(state: any, initialValue?: any){
    const [newState, setNewState] = useState<any>(initialValue);
    useEffect(()=>{

        const timeout = setTimeout(()=>{
            setNewState(state);
        }, 700);

        return () => clearTimeout(timeout);
    }, [state])

    return newState;
}