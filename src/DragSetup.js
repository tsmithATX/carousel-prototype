import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const DragSetup = ({ children: chillin }) => {
  return <DndProvider backend={HTML5Backend}>{chillin}</DndProvider>;
};
