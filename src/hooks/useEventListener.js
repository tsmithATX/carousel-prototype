import { useEffect, useRef } from "react";

const clientWindow = typeof window !== "undefined" ? window : undefined;

export default function useEventListener(
  eventName,
  handler,
  element = clientWindow,
  active = true
) {
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Create event listener that calls handler function stored in ref
    const eventListener = (event) => savedHandler.current(event);

    if (element && active) {
      console.log("creating event listener", eventName, element);
      element.addEventListener(eventName, eventListener);
    }
    if (element && !active) {
      try {
        console.log("deactivating event listener", eventName, element);
        element.removeEventListener(eventName, eventListener);
      } catch (err) {
        // what do?
      }
    }
    return () => {
      console.log("removing event listener", eventName, element);
      if (element) element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, active]);
}
