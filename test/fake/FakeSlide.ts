import { ElementSize, Slide } from "../../src";

class FakeSlide extends Slide {
  public index: number;
  public size: ElementSize;

  public constructor(index: number, size: ElementSize) {
    super();

    this.index = index;
    this.size = size;
  }

  public resize() {
    //
  }
}

export default FakeSlide;
