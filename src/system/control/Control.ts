import System from "../System";
import * as ID from "../id";

abstract class Control extends System {
  public readonly id = ID.CONTROL;
}

export default Control;
