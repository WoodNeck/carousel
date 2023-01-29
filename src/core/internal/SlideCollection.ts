import Slide from "../external/slide/Slide";

// 슬라이드 데이터를 담기만 하는 클래스
class SlideCollection {
  public readonly list: Slide[] = [];

  public add(slides: Slide[]) {
    this.list.push(...slides);
  }

  public clear() {
    this.list.splice(0, this.list.length);
    return this;
  }

  // TODO:
  public query() {

  }
}

export default SlideCollection;
