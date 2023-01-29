import State from "./State";
import ActionManager from "../internal/ActionManager";
import type Carousel from "../../Carousel";

class StateMachine {
  private _state: State | null;
  private _carousel: Carousel;
  private _actionManager: ActionManager;

  public get val() { return this._state; }

  public constructor(carousel: Carousel, actionManager: ActionManager) {
    this._state = null;
    this._carousel = carousel;
    this._actionManager = actionManager;
  }

  public is(state: State): boolean {
    return this._state === state;
  }

  public change(state: State | null) {
    const carousel = this._carousel;
    const actionManager = this._actionManager;
    const prevState = this._state;

    if (state === prevState) throw new Error(`Wrong state transition from ${prevState} to ${state}`);

    if (prevState != null) {
      actionManager.runExit(carousel, prevState);
    }

    this._state = state;

    if (state != null) {
      actionManager.runEnter(carousel, state);
    }
  }
}

export default StateMachine;
