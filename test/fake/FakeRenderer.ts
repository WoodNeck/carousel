import Carousel, { SlideRenderer, SystemContext } from "../../src";
import FakeSlide from "./FakeSlide";

class FakeRenderer extends SlideRenderer {
  private _carousel: Carousel | null;

  public init({ carousel }: SystemContext) {
    this._carousel = carousel;
  }

  public destroy() {
    if (!this._carousel) return;

    this._carousel.slides.clear();
    this._carousel = null;
  }

  public addSlides(slides: FakeSlide[]) {
    if (!this._carousel) return;

    this._carousel.slides.add(slides);
  }
}

export default FakeRenderer;
