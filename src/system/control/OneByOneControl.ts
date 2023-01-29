import Control from "./Control";
import Carousel from "../../Carousel";
import PointerInput from "./input/PointerInput";
import System from "../System";
import State from "../../core/external/State";
import * as ID from "../id";
import SystemContext from "../SystemContext";

class OneByOneControl extends Control {
  public readonly refs: System["refs"] = {
    [ID.SLIDER]: null
  };

  private _carousel: Carousel | null;
  private _input: PointerInput;

  public constructor() {
    super();

    this._carousel = null;
    this._input = new PointerInput({
      onDown: this._onInputDown,
      onMove: this._onInputMove,
      onUp: this._onInputUp,
      onCancel: this._onInputCancel
    });
  }

  public init({ carousel, root }: SystemContext) {
    this._carousel = carousel;
    this._input.enable(root);
  }

  public destroy() {
    this._carousel = null;
    this._input.disable();
  }

  private _onInputDown = () => {
    if (!this._carousel) return;

    this._carousel.state.change(State.Hold);
  };

  private _onInputMove = (delta: number) => {
    if (!this._carousel) return;

    if (!this._carousel.state.is(State.Animating)) {
      this._carousel.state.change(State.Animating);
    }

    const slider = this.refs[ID.SLIDER];
    if (!slider) return;

    slider.setSlideDelta(delta);
  };

  private _onInputUp = () => {
    if (!this._carousel) return;

    this._carousel.state.change(State.Idle);
  };

  private _onInputCancel = () => {
    if (!this._carousel) return;

    this._carousel.state.change(State.Idle);
  };
}

export default OneByOneControl;
