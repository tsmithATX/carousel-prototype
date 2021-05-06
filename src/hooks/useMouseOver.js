import { useCallback, useState } from "react";
import useEventListener from "./useEventListener";

export const useMouseOver = (refs = [], enabled) => {
  const [over, setOver] = useState(false);

  const movementHandler = useCallback(
    ({ clientX, clientY, path }) => {
      if (!enabled) return;

      const mouseIsOverOne = refs.some(({ current }) => {
        const foundRef = path && path.includes(current);
        if (foundRef) {
          return true;
        }

        const rect = current && current.getBoundingClientRect();
        if (rect) {
          const inXBox = clientX < rect.right && clientX > rect.left;
          const inYBox = clientY < rect.bottom && clientY > rect.top;
          return inXBox && inYBox;
        }

        return false;
      });

      if (mouseIsOverOne) {
        setOver(true);
      } else {
        setOver(false);
      }
    },
    [enabled, refs]
  );

  useEventListener("mousemove", movementHandler);

  return over;
};
