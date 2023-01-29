import Slider from "./Slider";
import Carousel from "../../Carousel";
import SystemOrder from "../SystemOrder";
import SystemContext from "../SystemContext";
import { ElementSize } from "../../core/external";
import * as ID from "../id";

export interface TransitionSliderOptions {
  initialIndex: number;
}

// CSS Transition 기반의 슬라이더
class TransitionSlider extends Slider {
  public readonly order = SystemOrder.after(ID.RENDERER);

  private _initialIndex: TransitionSliderOptions["initialIndex"];

  private _carousel: Carousel | null;
  private _wrapperSize: ElementSize;
  private _position: number;
  private _posDelta: number;

  public constructor({
    initialIndex = 1
  }: Partial<TransitionSliderOptions> = {}) {
    super();

    this._initialIndex = initialIndex;
    this._wrapperSize = ElementSize.zero();
    this._carousel = null;
    this._position = 0;
    this._posDelta = 0;
  }

  public init({ carousel }: SystemContext): void {
    if (!carousel.wrapper) throw new Error("Can't init TransitionSlider without wrapper element.");

    // wrapper 크기 재갱신
    this._carousel = carousel;
    this.resize();

    this._slideToIndex(this._initialIndex);
  }

  public destroy(): void {
    if (!this._carousel) return;

    this._wrapperSize = ElementSize.zero();
    this._carousel = null;
    this._position = 0;
    this._posDelta = 0;
  }

  public setSlideDelta(delta: number) {
    this._posDelta = delta;
    this._applyTransform();
  }

  public resize() {
    if (!this._carousel || !this._carousel.wrapper) {
      this._wrapperSize = ElementSize.zero();
    } else {
      this._wrapperSize = ElementSize.fromElement(this._carousel.wrapper);
    }
  }

  private _slideToIndex(index: number) {
    const carousel = this._carousel;
    if (!carousel) return;

    const slideToMove = carousel.slides.list[index];
    if (!slideToMove) return;

    const slidesBefore = carousel.slides.list.slice(0, index);
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
    const wrapperSize = this._wrapperSize;
    if (!carousel || !wrapper || wrapperSize.width === 0) return;

    const position = this._position + this._posDelta;
    const posInPercentage = 100 * position / wrapperSize.width;

    wrapper.style.transform = `translate(-${posInPercentage}%)`;
  }
}

export default TransitionSlider;
