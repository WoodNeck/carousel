import Carousel from "../../Carousel";
import SlideRenderer from "./SlideRenderer";
import ElementSlide from "../../slide/ElementSlide";
import SystemContext from "../SystemContext";
import type SlideCollection from "../../core/external/SlideCollection";

interface StandardRendererOptions {
  wrapperSelector: string;
  slideClass: string;
}

class StandardRenderer extends SlideRenderer {
  private _slideClass: StandardRendererOptions["slideClass"];

  private _carousel: Carousel | null;
  private _mutObserver: MutationObserver;

  public constructor({
    slideClass = "carousel-slide"
  }: Partial<StandardRendererOptions> = {}) {
    super();

    this._slideClass = slideClass;

    this._carousel = null;
    this._mutObserver = new MutationObserver(this._onPanelChange);
  }

  public init({ carousel }: SystemContext) {
    if (!carousel.wrapper) throw new Error("Can't init StandardRenderer without wrapper element.");
    const collected = this._getUpdatedSlides(carousel.wrapper, carousel.slides);

    carousel.slides
      .clear()
      .add(collected);

    this._carousel = carousel;
    this._mutObserver.observe(carousel.wrapper, {
      childList: true
    });
  }

  public destroy() {
    if (!this._carousel) return;

    this._carousel.slides.clear();
    this._mutObserver.takeRecords();
    this._mutObserver.disconnect();

    this._carousel = null;
  }

  private _onPanelChange = (mutations: MutationRecord[]) => {
    const carousel = this._carousel;
    if (!carousel || !carousel.root) return;
    if (!carousel.wrapper) {
      throw new Error("Can't init StandardRenderer without wrapper element.");
    }

    const added = mutations
      .reduce((els, record) => [
        ...els,
        ...this._getSlideElements(record.addedNodes)
      ], []);
    const removed = mutations
      .reduce((els, record) => [
        ...els,
        ...this._getSlideElements(record.removedNodes)
      ], []);

    // 슬라이드 변경 없을 경우
    if (added.length <= 0 && removed.length <= 0) return;

    // 현재 슬라이드 엘리먼트
    const updated = this._getUpdatedSlides(carousel.wrapper, carousel.slides);

    carousel.slides
      .clear()
      .add(updated);


    // TODO: 슬라이더 & 컨트롤에 업데이트 정보 전달
  };

  private _getUpdatedSlides(wrapper: HTMLElement, collection: SlideCollection): ElementSlide[] {
    const elements = this._getSlideElements(wrapper.children);
    const slides = collection.all;

    // FIXME:
    // 처음 엘리먼트를 가져올 때, 만약 엘리먼트에 이미 slideIndex가 있을 경우 문제 발생
    const updated = elements.map(el => {
      // 이미 슬라이드가 있었으면 기존것을 사용
      if (el.dataset.slideIndex) return slides[el.dataset.slideIndex];
      // 처음보는 엘리먼트일경우 슬라이드를 새로 생성
      else return new ElementSlide(el);
    });

    // 엘리먼트의 슬라이드 인덱스 업데이트
    elements.forEach((el, idx) => {
      el.dataset.slideIndex = idx.toString();
    });

    // 슬라이드 크기 업데이트
    updated.forEach(slide => slide.resize());

    return updated;
  }

  private _getSlideElements(els: HTMLCollection | NodeList): HTMLElement[] {
    return (Array.from(els) as HTMLElement[])
      .filter(el => el.classList && el.classList.contains(this._slideClass));
  }
}

export default StandardRenderer;
