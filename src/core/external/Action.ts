import { ActionCallback } from "../../type/external";
import ActionMode from "../internal/ActionMode";
import State from "./State";

class Action<TargetState extends State, Mode extends ActionMode> {
  public static onEnter<T extends State>(state: T, cb: ActionCallback) {
    return new Action(state, ActionMode.Enter, cb);
  }

  public static onExit<T extends State>(state: T, cb: ActionCallback) {
    return new Action(state, ActionMode.Exit, cb);

  }

  public static onUpdate<T extends Exclude<State, State.Init | State.Destroy>>(state: T, cb: ActionCallback) {
    return new Action(state, ActionMode.Update, cb);
  }

  private constructor(
    public readonly state: TargetState,
    public readonly mode: Mode,
    public readonly cb: ActionCallback
  ) {}
}

export default Action;
