import Carousel, { ElementSize, SlideQuery } from "../../../../src";
import FakeRenderer from "../../../fake/FakeRenderer";
import FakeSlide from "../../../fake/FakeSlide";

describe("SlideQuery", () => {
  const createFakeCarousel = () => {
    const fakeRenderer = new FakeRenderer();
    const carousel = new Carousel()
      .addSystem(fakeRenderer);

    fakeRenderer.addSlides([
      new FakeSlide(0, new ElementSize({ width: })),
      new FakeSlide(),
    ]);

    return carousel;
  };

  describe("All", () => {
    it("should return all slides", () => {
      const carousel = createFakeCarousel();
      const queried = carousel.slides.query(SlideQuery.All).exec();
      expect(queried.length).toEqual();
    });
  });
});
