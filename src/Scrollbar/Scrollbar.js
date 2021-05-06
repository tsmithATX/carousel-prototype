import { useRef } from "react";
import styled from "styled-components";
import { ScrollbarThumb } from "./ScrollbarThumb";

const ScrollbarContainer = styled.div`
  height: 48px;
  background-color: rgba(220, 41, 30, 0.2);
  display: flex;
  width: 100%;
`;

export const Scrollbar = ({ scrollHostRef, isMouseOver, numElements }) => {
  const scrollbarContainerRef = useRef();
  return (
    <ScrollbarContainer ref={scrollbarContainerRef}>
      <ScrollbarThumb
        scrollbarContainerRef={scrollbarContainerRef}
        scrollHostRef={scrollHostRef}
        isMouseOver={isMouseOver}
        numElements={numElements}
      />
    </ScrollbarContainer>
  );
};
