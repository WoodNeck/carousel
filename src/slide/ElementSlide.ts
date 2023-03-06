import Slide from "./Slide";
import ElementSize from "../core/external/ElementSize";

class ElementSlide extends Slide {
  public readonly element: HTMLElement;
  public get index() { return parseFloat(this.element.dataset.slideIndex!); }

  public constructor(element: HTMLElement) {
    super();
    this.element = element;
  }

  public resize() {
    this.size = ElementSize.fromElement(this.element);
  }
}

export default ElementSlide;
