import styled from "styled-components/macro";
export const ScrollbarTrack = styled.div`
  position: relative;
  background-color: #eeecec;
  width: 100%;
  height: ${({ $isMouseOver, $dragging }) => {
    if ($dragging) return "8px";
    return $isMouseOver ? "4px" : "2px";
  }};
`;

export const ThumbDragWrapper = styled.div`
  width: ${({ $width }) => $width}%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: blue;
  transform: translateX(${({ leftTransform }) => leftTransform}px);
`;

export const StyledThumb = styled.div`
  width: 100%;
  background-color: #414142;
  height: 100%;
  position: absolute;
`;
