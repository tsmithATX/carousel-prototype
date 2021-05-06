import { useState, useCallback, useEffect, useRef } from "react";
import useEventListener from "../hooks/useEventListener";

const SCROLL_BOX_MIN_WIDTH_PERCENT = 0.05;

const calculateThumbSize = (clientWidth, scrollWidth) => {
  const scrollThumbPercentage = clientWidth / scrollWidth;
  return {
    thumbWidth: Math.min(
      100,
      Math.max(scrollThumbPercentage, SCROLL_BOX_MIN_WIDTH_PERCENT) * 100
    ),
    scrollThumbPercentage
  };
};

const calculateLeftTransform = (scrollLeft, scrollWidth, offsetWidth) => {
  return (parseInt(scrollLeft, 10) / parseInt(scrollWidth, 10)) * offsetWidth;
};

export const useScrollThumbSizings = (scrollHostRef, numElements) => {
  const [leftTransform, setLeftTransform] = useState(0);
  const [scrollThumbWidth, setScrollThumbWidth] = useState(0);
  const [scrollThumbPercent, setScrollThumbPercent] = useState(0);

  const recalculateValues = useCallback(() => {
    window.requestAnimationFrame(() => {
      const {
        scrollLeft,
        scrollWidth,
        offsetWidth,
        clientWidth
      } = scrollHostRef.current;
      const { thumbWidth, scrollThumbPercentage } = calculateThumbSize(
        clientWidth,
        scrollWidth
      );

      setScrollThumbWidth(thumbWidth);
      setScrollThumbPercent(scrollThumbPercentage);
      setLeftTransform(
        calculateLeftTransform(scrollLeft, scrollWidth, offsetWidth)
      );
    });
  }, [scrollHostRef, setLeftTransform, setScrollThumbWidth]);

  useEffect(() => recalculateValues(), [recalculateValues, numElements]);
  useEventListener("scroll", recalculateValues, scrollHostRef.current);
  useEventListener("resize", recalculateValues, window);

  return { leftTransform, scrollThumbWidth, scrollThumbPercent };
};
