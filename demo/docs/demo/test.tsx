import React from "react";
import Carousel, { StandardRenderer, OneByOneControl, Resizer, TransitionSlider } from "@site/../src";

export default () => {
  const [panels, setPanels] = React.useState([1, 2, 3]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    const carousel = new Carousel()
      .addSystem(new TransitionSlider())
      .addSystem(new StandardRenderer())
      .addSystem(new OneByOneControl())
      .addSystem(new Resizer())
      .addSetup(() => {
        setPanels([...panels.slice(1), 4]);
      })
      .mount(containerRef.current);

    return () => {
      carousel.destroy();
    };
  }, []);

  return <div ref={containerRef} className="carousel">
    <div className="carousel-wrapper">{
      panels.map(id => (
        <div className="carousel-slide" key={id} data-id={id}>{id}</div>
      ))
    }</div>
  </div>;
};
