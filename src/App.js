import { useState } from "react";
import { ItemCard } from "./ItemCard";
import { Carousel } from "./Carousel/Carousel";
import { DragSetup } from "./DragSetup";
import { items } from "./items";
import "./styles.css";

export default function App() {
  const [numItems, setNumItems] = useState(10);
  const slicedItems = items.slice(0, numItems ? numItems : 1);
  return (
    <div className="App">
      <DragSetup>
        <Carousel>
          {slicedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Carousel>
        <div>
          <label htmlFor="numElements">Number of items </label>
          <input
            id="numElements"
            name="numElements"
            type="number"
            value={numItems}
            onChange={(e) => {
              setNumItems(e.target.value);
            }}
          />
        </div>
      </DragSetup>
    </div>
  );
}
