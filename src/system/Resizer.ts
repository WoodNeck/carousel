import System from "./System";
import SystemContext from "./SystemContext";
import * as ID from "./id";

class Resizer extends System {
  public readonly id = ID.RESIZER;
  public readonly order = null;
  public readonly refs = {
    [ID.SLIDER]: null
  };

  private _ignoreFirstResize: boolean;
  private _observer: ResizeObserver;

  public constructor() {
    super();

    this._ignoreFirstResize = false;
    this._observer = new ResizeObserver(this._onResize);
  }

  public init({ root }: SystemContext) {
    const width = root.clientWidth;
    const height = root.clientWidth;

    this._ignoreFirstResize = width !== 0 || height !== 0;
    this._observer.observe(root);
  }

  public destroy() {
    // 모든 observe 해제
    this._observer.disconnect();
  }

  private _onResize = (entries: ResizeObserverEntry[]) => {
    if (this._ignoreFirstResize) {
      this._ignoreFirstResize = false;
      return;
    }

    console.log("RESIZED", entries);
  };
}

export default Resizer;
