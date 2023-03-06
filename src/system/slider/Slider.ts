import System from "../System";
import * as ID from "../id";

abstract class Slider extends System {
  public readonly id = ID.SLIDER;
  public abstract slideTo(index: number): Promise<boolean>;
  public abstract setSlideDelta(delta: number): void;
}

export default Slider;
