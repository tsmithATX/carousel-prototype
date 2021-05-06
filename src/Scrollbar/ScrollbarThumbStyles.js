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

export const ThumbDragWrapper = styled.div.attrs((props) => ({
  style: {
    width: `${props.width}%`,
    transform: `translateX(${props.leftTransform}px)`,
  },
}))`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledThumb = styled.div`
  width: 100%;
  background-color: #414142;
  height: 100%;
  position: absolute;
`;
