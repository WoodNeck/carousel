import Slide from "./Slide";
import ElementSize from "../ElementSize";

class ElementSlide extends Slide {
  public readonly element: HTMLElement;

  public constructor(element: HTMLElement) {
    super();
    this.element = element;
  }

  public resize() {
    this.size = ElementSize.fromElement(this.element);
  }
}

export default ElementSlide;
