import {useState,useEffect, useRef } from "react";


export const usePrev = (value)=> {
    const ref = useRef();
    useEffect(() => { ref.current = value;}, [value]);
    
    return ref.current;
  }



const useTimeState = (state)=>{

    const [newState, setNewState] = useState(state);

    const oldState = usePrev(newState);

    return [newState,oldState,setNewState];

}

export default useTimeState;