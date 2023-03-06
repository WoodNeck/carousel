import Control from "./Control";
import Carousel from "../../Carousel";
import PointerInput from "./input/PointerInput";
import System from "../System";
import State from "../../core/external/State";
import * as ID from "../id";
import SystemContext from "../SystemContext";
import SlideQuery from "../../slide/query/SlideQuery";

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
    const carousel = this._carousel;
    const slider = this.refs[ID.SLIDER];
    if (!carousel || !slider) return;

    carousel.state.change(State.Hold);
  };

  private _onInputMove = (delta: number) => {
    const carousel = this._carousel;
    const slider = this.refs[ID.SLIDER];
    if (!carousel || !slider) return;

    if (!carousel.state.is(State.Animating)) {
      carousel.state.change(State.Animating);
    }

    slider.setSlideDelta(delta);
  };

  private _onInputUp = async (delta: number) => {
    const carousel = this._carousel;
    const slider = this.refs[ID.SLIDER];
    if (!carousel || !slider || delta === 0) return;

    const current = carousel.slides.query(SlideQuery.Current).exec()[0];
    const newSlideIndex = delta > 0 ? current.index + 1 : current.index - 1;

    const fulfilled = await slider.slideTo(newSlideIndex);

    if (fulfilled) {
      carousel.state.change(State.Idle);
    }
  };

  private _onInputCancel = () => {
    const carousel = this._carousel;
    const slider = this.refs[ID.SLIDER];
    if (!carousel || !slider) return;

    carousel.state.change(State.Idle);
  };
}

export default OneByOneControl;
