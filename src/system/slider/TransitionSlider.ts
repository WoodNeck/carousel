import Slider from "./Slider";
import Carousel from "../../Carousel";
import SystemOrder from "../SystemOrder";
import SystemContext from "../SystemContext";
import * as ID from "../id";
import { EVENT } from "../../const/event";

export interface TransitionSliderOptions {
  initialIndex: number;
}

// CSS Transition 기반의 슬라이더
class TransitionSlider extends Slider {
  public readonly order = SystemOrder.after(ID.RENDERER);

  private _initialIndex: TransitionSliderOptions["initialIndex"];

  private _carousel: Carousel | null;
  private _position: number;
  private _posDelta: number;

  public constructor({
    initialIndex = 1
  }: Partial<TransitionSliderOptions> = {}) {
    super();

    this._initialIndex = initialIndex;
    this._carousel = null;
    this._position = 0;
    this._posDelta = 0;
  }

  public init({ carousel }: SystemContext): void {
    if (!carousel.wrapper) throw new Error("Can't init TransitionSlider without carousel wrapper element.");

    // wrapper 크기 재갱신
    this._carousel = carousel;

    this._slideToIndex(this._initialIndex);
  }

  public destroy(): void {
    if (!this._carousel) return;

    this._carousel = null;
    this._position = 0;
    this._posDelta = 0;
  }

  public slideTo(index: number) {
    const carousel = this._carousel;
    if (!carousel || !carousel.wrapper) return Promise.resolve(false);

    const wrapper = carousel.wrapper;
    return new Promise<boolean>(resolve => {
      const onTransitionEnd = () => {
        wrapper.removeEventListener(EVENT.TRANSITION_END, onTransitionEnd);
        wrapper.removeEventListener(EVENT.TRANSITION_CANCEL, onTransitionCancel);
        console.log("end");
        resolve(true);
      };
      const onTransitionCancel = () => {
        wrapper.removeEventListener(EVENT.TRANSITION_END, onTransitionEnd);
        wrapper.removeEventListener(EVENT.TRANSITION_CANCEL, onTransitionCancel);
        console.log("cancel");
        resolve(false);
      };

      wrapper.addEventListener(EVENT.TRANSITION_END, onTransitionEnd);
      wrapper.addEventListener(EVENT.TRANSITION_CANCEL, onTransitionCancel);

      this._slideToIndex(index);
    });
  }

  public setSlideDelta(delta: number) {
    this._posDelta = delta;
    this._applyTransform();
  }

  private _slideToIndex(index: number) {
    const carousel = this._carousel;
    if (!carousel) return;

    const slideToMove = carousel.slides.get(index);
    if (!slideToMove) return;

    const slidesBefore = carousel.slides.all.slice(0, index);
    const posBefore = slidesBefore.reduce((size, slide) => {
      return size + slide.size.horizontal;
    }, 0);

    const position = posBefore + slideToMove.size.margin.left;

    this._position = position;
    this._posDelta = 0;

    this._applyTransform();
  }

  private _applyTransform() {
    const carousel = this._carousel;
    const wrapper = carousel?.wrapper;
    if (!carousel || !wrapper) return;

    const position = this._position + this._posDelta;

    wrapper.style.transform = `translate(-${position}px)`;
  }
}

export default TransitionSlider;
