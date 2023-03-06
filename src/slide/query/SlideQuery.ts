import Slide from "../Slide";

class SlideQuery {
  private _filter: (slide: Slide) => boolean;

  public static All = new SlideQuery(slide => true);
  public static Current = new SlideQuery(slide => true);
  public static Visible = new SlideQuery(slide => true);
  public static Invisible = new SlideQuery(slide => true);
  public static Fixed(count: number) {
    return new SlideQuery(slide => true);
  }
  public static ScreenSize(size: string | number) {
    return new SlideQuery(slide => true);
  }

  public constructor(filter: (slide: Slide) => boolean) {
    this._filter = filter;
  }
}

export default SlideQuery;
