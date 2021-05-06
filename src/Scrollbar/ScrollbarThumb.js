import { useState, useCallback, useEffect, useRef } from "react";
import { useScrollThumbSizings } from "./useScrollThumbSizings";
import useEventListener from "../hooks/useEventListener";
import {
  ScrollbarTrack,
  ThumbDragWrapper,
  StyledThumb
} from "./ScrollbarThumbStyles";

export const ScrollbarThumb = ({
  scrollHostRef,
  isMouseOver,
  numElements,
  scrollbarContainerRef
}) => {
  const [dragging, setDragging] = useState(false);
  const dragHandleRef = useRef();
  const dragStartPosition = useRef();
  const scrollElementStart = useRef();
  const {
    leftTransform,
    scrollThumbWidth,
    scrollThumbPercent
  } = useScrollThumbSizings(scrollHostRef, numElements);

  const handleDragStart = useCallback(
    (event) => {
      const scrollElement = scrollHostRef.current;
      const dragElement = dragHandleRef.current;
      if (scrollElement && dragElement) {
        setDragging(true);
        dragStartPosition.current = event.clientX;
        scrollElementStart.current = scrollElement.scrollLeft;
      }
    },
    [dragStartPosition, scrollHostRef, dragHandleRef]
  );

  const handleDragStop = useCallback((event) => {
    setDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      const scrollElement = scrollHostRef.current;
      if (scrollElement) {
        const deltaX = event.clientX - dragStartPosition.current;
        scrollElement.scrollLeft =
          scrollElementStart.current + deltaX / scrollThumbPercent;
      }
    },
    [dragStartPosition, scrollHostRef, scrollThumbPercent, scrollElementStart]
  );

  useEventListener("mousemove", handleMouseMove, window, dragging);
  useEventListener("mouseup", handleDragStop, window, dragging);

  return (
    <ThumbDragWrapper
      onMouseDown={handleDragStart}
      ref={dragHandleRef}
      $width={scrollThumbWidth}
      leftTransform={leftTransform}
    >
      <ScrollbarTrack $isMouseOver={isMouseOver} $dragging={dragging}>
        <StyledThumb />
      </ScrollbarTrack>
    </ThumbDragWrapper>
  );
};
