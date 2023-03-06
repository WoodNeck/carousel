import Slide from "../Slide";
import SlideCursor from "./SlideCursor";
import SlideOrder from "./SlideOrder";
import SlideQuery from "./SlideQuery";

class SlideQueryResult {
  private _slides: Slide[];
  private _cursor: SlideCursor;

  public constructor(slides: Slide[], cursor: SlideCursor) {

  }

  public add(query: SlideQuery, cursorFn?: (cursor: SlideCursor) => SlideCursor): this {
    return this;
  }

  public order(order: SlideOrder): this {
    return this;
  }

  public exec(): Slide[] {
    return [];
  }
}

export default SlideQueryResult;
