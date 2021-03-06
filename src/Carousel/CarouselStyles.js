import styled, { css } from "styled-components";

export const hideScrollbarCss = css`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CarouselContent = styled.div`
  display: grid;
  ${({ numCols, total }) => css`
    grid-template-columns: repeat(
      ${total},
      minmax(calc(((100% - (${numCols - 1} * 10px)) / ${numCols})), 1fr)
    );
  `}
  grid-auto-flow: column;
  column-gap: 10px;
  overflow-x: scroll;
  ${hideScrollbarCss}
  position: relative;
`;

export const CarouselItem = styled.div`
  background: #010101;
`;
const CarouselButton = styled.div`
  position: absolute;
  top: 50%;
`;

export const RightButtons = styled(CarouselButton)`
  right: 10px;
`;

export const LeftButtons = styled(CarouselButton)`
  left: 10px;
`;

export const ScrollButton = styled.button``;
