import { useRef } from "react";
import styled from "styled-components/macro";
import { ScrollbarThumb } from "./ScrollbarThumb";

const ScrollbarContainer = styled.div`
  height: 48px;
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
