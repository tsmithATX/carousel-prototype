import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { useMouseOver } from "../hooks/useMouseOver";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import {
  CarouselContainer,
  CarouselContent,
  CarouselItem,
  LeftButtons,
  RightButtons,
  ScrollButton,
} from "./CarouselStyles";

export const Carousel = ({ children, showCustomScrollbar = true }) => {
  const mouseOverRef = useRef();
  const [animatingScroll, setAnimatingScroll] = useState(false);
  const [resetBool, setResetBool] = useState();
  const [startingScrollPosition, setStartingScrollPosition] = useState(0);
  const [endingScrollPosition, setEndingScrollPosition] = useState(0);
  const isMouseOver = useMouseOver([mouseOverRef], true);
  const scrollHostRef = useRef();

  const stopAnimatedScroll = useCallback(() => {
    setAnimatingScroll(false);
  }, []);
  const startAnimatedScroll = useCallback(() => {
    setAnimatingScroll(true);
  }, []);

  const resetAnimation = useCallback(() => {
    setResetBool(true);
  }, [setResetBool]);

  useEffect(() => {
    // will only be true for one render and immediately toggle back to false
    if (resetBool) {
      setResetBool(false);
    }
  }, [resetBool]);

  useSpring({
    reset: resetBool,
    from: { scrollLeft: startingScrollPosition },
    to: { scrollLeft: endingScrollPosition },
    onChange: ({ value: { scrollLeft } }) => {
      const scrollElement = scrollHostRef.current;
      if (scrollElement) {
        scrollElement.scrollLeft = scrollLeft;
      }
    },
  });

  const scrollToPosition = useCallback(
    (start, end) => {
      if (start !== end) {
        // startAnimatedScroll();
        resetAnimation();
        setStartingScrollPosition(start);
        setEndingScrollPosition(end);
      }
    },
    [startAnimatedScroll, setStartingScrollPosition, setEndingScrollPosition]
  );

  const checkScrollElement = useCallback(
    (positionFunc) => {
      console.log("test");
      const scrollElement = scrollHostRef.current;
      if (scrollElement) {
        return () => positionFunc(scrollElement);
      }
    },
    [scrollHostRef]
  );

  const scrollToStart = checkScrollElement(({ scrollLeft }) => {
    scrollToPosition(scrollLeft, 0);
  });

  const scrollToEnd = checkScrollElement(
    ({ scrollLeft, scrollWidth, clientWidth }) => {
      const leftMax = scrollWidth - clientWidth;
      scrollToPosition(scrollLeft, leftMax);
    }
  );

  const scrollNext = checkScrollElement(
    ({ scrollLeft, scrollWidth, clientWidth }) => {
      const leftMax = scrollWidth - clientWidth;
      scrollToPosition(scrollLeft, Math.min(leftMax, scrollLeft + clientWidth));
    }
  );

  const scrollPrev = checkScrollElement(({ scrollLeft, clientWidth }) => {
    const leftMin = 0;
    scrollToPosition(scrollLeft, Math.max(leftMin, scrollLeft - clientWidth));
  });

  return (
    <>
      <CarouselContainer ref={mouseOverRef}>
        <CarouselContent
          ref={scrollHostRef}
          numCols={4}
          total={children.length}
          containerWidth={800}
          showCustomScrollbar={showCustomScrollbar}
        >
          {React.Children.map(children, (Child) => {
            return <CarouselItem>{Child}</CarouselItem>;
          })}
        </CarouselContent>
        <Scrollbar
          numElements={children.length}
          isMouseOver={isMouseOver}
          scrollHostRef={scrollHostRef}
        />

        <LeftButtons>
          <ScrollButton onClick={scrollToStart}>Start</ScrollButton>
          <ScrollButton onClick={scrollPrev}>Prev</ScrollButton>
        </LeftButtons>
        <RightButtons>
          <ScrollButton onClick={scrollToEnd}>End</ScrollButton>
          <ScrollButton onClick={scrollNext}>Next</ScrollButton>
        </RightButtons>
      </CarouselContainer>
      {animatingScroll ? <div> animating happening</div> : null}
    </>
  );
};
