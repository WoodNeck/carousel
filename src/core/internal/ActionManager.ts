import Carousel from "../../Carousel";
import { Action, State } from "../external";
import ActionMode from "./ActionMode";

class ActionManager {
  private _actions: Record<State, Record<ActionMode, Action<State, ActionMode>[]>>;

  public constructor() {
    this._actions = Object.values(State)
      .reduce((actions, state) => {
        actions[state] = Object.values(ActionMode)
          .reduce((modes, mode) => {
            modes[mode] = [];

            return modes;
          }, {});

        return actions;
      }, {} as Record<State, Record<ActionMode, Action<State, ActionMode>[]>>);
  }

  public add(action: Action<State, ActionMode>) {
    this._actions[action.state][action.mode].push(action);
  }

  public runEnter(carousel: Carousel, state: State) {
    for (const action of this._actions[state][ActionMode.Enter]) {
      action.cb(carousel);
    }
  }

  public runUpdate(carousel: Carousel, state: State) {
    for (const action of this._actions[state][ActionMode.Update]) {
      action.cb(carousel);
    }
  }

  public runExit(carousel: Carousel, state: State) {
    for (const action of this._actions[state][ActionMode.Exit]) {
      action.cb(carousel);
    }
  }
}

export default ActionManager;
