import React, { useCallback, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import useEventListener from "../hooks/useEventListener";
import { useMouseOver } from "../hooks/useMouseOver";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import {
  CarouselContainer,
  CarouselContent,
  CarouselItem,
  StyledEndButton,
  StyledStartButton
} from "./CarouselStyles";

const GoToEndButton = ({ scrollToEnd }) => {
  return <StyledEndButton onClick={() => scrollToEnd()}>GoEnd</StyledEndButton>;
};

const GoToStartButton = ({ scrollToStart }) => {
  return (
    <StyledStartButton onClick={() => scrollToStart()}>
      GoStart
    </StyledStartButton>
  );
};

export const Carousel = ({ children, showCustomScrollbar = true }) => {
  const mouseOverRef = useRef();
  const [animatingScroll, setAnimatingScroll] = useState(false);
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

  useSpring({
    cancel: !animatingScroll || startingScrollPosition === endingScrollPosition,
    onRest: stopAnimatedScroll,
    from: { scrollX: startingScrollPosition },
    to: { scrollX: endingScrollPosition },
    onChange: ({ value: { scrollX } }) => {
      const scrollElement = scrollHostRef.current;
      if (scrollElement) {
        scrollElement.scrollLeft = scrollX;
      }
    }
  });

  useEventListener(
    "scroll",
    () => {
      setStartingScrollPosition(scrollHostRef.current.scrollLeft);
    },
    scrollHostRef.current
  );

  const scrollToPosition = useCallback(
    (start, end) => {
      startAnimatedScroll();
      setStartingScrollPosition(start);
      setEndingScrollPosition(end);
    },
    [startAnimatedScroll, setStartingScrollPosition, setEndingScrollPosition]
  );

  const scrollToStart = () => {
    const scrollElement = scrollHostRef.current;
    if (scrollElement) {
      scrollToPosition(scrollElement.scrollLeft, 0);
    }
  };

  const scrollToEnd = () => {
    const scrollElement = scrollHostRef.current;
    if (scrollElement) {
      scrollToPosition(scrollElement.scrollLeft, scrollElement.scrollWidth);
    }
  };

  return (
    <>
      <CarouselContainer ref={mouseOverRef}>
        <CarouselContent
          ref={scrollHostRef}
          numCols={4}
          total={children.length}
          containerWidth={800}
          stopAnimatedScroll={stopAnimatedScroll}
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
        <GoToStartButton scrollToStart={scrollToStart} />
        <GoToEndButton scrollToEnd={scrollToEnd} />
      </CarouselContainer>
      {animatingScroll ? <div> animating happening</div> : null}
    </>
  );
};
