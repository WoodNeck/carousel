import ElementSize from "../ElementSize";

abstract class Slide {
  public size = ElementSize.zero();

  public abstract resize(): void;
}

export default Slide;
