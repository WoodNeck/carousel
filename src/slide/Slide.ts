import ElementSize from "../core/external/ElementSize";

abstract class Slide {
  public abstract size: ElementSize;
  public abstract index: number;

  public abstract resize(): void;
}

export default Slide;
