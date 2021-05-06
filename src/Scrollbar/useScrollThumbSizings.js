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
    scrollThumbPercentage,
  };
};

const calculateLeftTransform = (scrollLeft, scrollWidth, offsetWidth) => {
  return (scrollLeft / scrollWidth) * offsetWidth;
};

export const useScrollThumbSizings = (scrollHostRef, numElements) => {
  const [leftTransform, setLeftTransform] = useState(0);
  const [scrollThumbWidth, setScrollThumbWidth] = useState(0);
  const [scrollThumbPercent, setScrollThumbPercent] = useState(0);

  const recalculateThumbWidth = useCallback(() => {
    const { scrollWidth, clientWidth } = scrollHostRef.current;
    const { thumbWidth, scrollThumbPercentage } = calculateThumbSize(
      clientWidth,
      scrollWidth
    );
    setScrollThumbWidth(thumbWidth);
    setScrollThumbPercent(scrollThumbPercentage);
  }, [scrollHostRef, setScrollThumbWidth]);

  const recalculateLeftPos = useCallback(() => {
    window.requestAnimationFrame(() => {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollHostRef.current;

      setLeftTransform(
        calculateLeftTransform(scrollLeft, scrollWidth, offsetWidth)
      );
    });
  }, [scrollHostRef, setLeftTransform, setScrollThumbWidth]);

  const recalculateThumbWidthAndPos = useCallback(() => {
    recalculateThumbWidth();
    recalculateLeftPos();
  }, [recalculateThumbWidth, recalculateLeftPos]);

  useEffect(() => {
    recalculateThumbWidthAndPos();
  }, [recalculateThumbWidthAndPos, numElements]);

  useEventListener("scroll", recalculateLeftPos, scrollHostRef.current ?? null);
  useEventListener("resize", recalculateThumbWidthAndPos, window);

  return { leftTransform, scrollThumbWidth, scrollThumbPercent };
};
