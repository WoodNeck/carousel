import Carousel from "../Carousel";
import MainLoop from "../core/internal/MainLoop";

interface SystemContext {
  carousel: Carousel;
  root: HTMLElement;
  loop: MainLoop;
}

export default SystemContext;
