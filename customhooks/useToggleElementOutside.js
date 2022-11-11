import {useEffect,useRef} from "react";


export const useOnClickOutside = (ref, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }

const useToggleElementOutside = (toggleValue,setToggleValue,ElementTrue,ElementFalse)=> {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();

    useOnClickOutside(ref, () => setToggleValue(false));
    return (
      <div>
        {toggleValue ? (
          <div ref={ref}>
            <ElementTrue />
          </div>
        ) : (
         <ElementFalse />
        )}
      </div>
    );
  }

  export default useToggleElementOutside;