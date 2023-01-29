import Carousel from "../../Carousel";
import ActionManager from "./ActionManager";

class MainLoop {
  private _carousel: Carousel;
  private _actionManager: ActionManager;
  private _rafID: number = -1;

  public constructor(carousel: Carousel, actionManager: ActionManager) {
    this._carousel = carousel;
    this._actionManager = actionManager;
  }

  public run() {
    this._rafID = requestAnimationFrame(this._onFrame);
  }

  public stop() {
    cancelAnimationFrame(this._rafID);
    this._rafID = -1;
  }

  /**
   * 매 프레임마다 동작
   */
  private _onFrame = () => {
    const state = this._carousel.state.val;

    if (state) {
      this._actionManager.runUpdate(this._carousel, state);
    }

    this._rafID = requestAnimationFrame(this._onFrame);
  };
}

export default MainLoop;
