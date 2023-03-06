import Action from "./core/external/Action";
import State from "./core/external/State";
import StateMachine from "./core/external/StateMachine";
import SlideCollection from "./core/external/SlideCollection";
import SystemSchedule from "./core/internal/SystemSchedule";
import ActionManager from "./core/internal/ActionManager";
import ActionMode from "./core/internal/ActionMode";
import MainLoop from "./core/internal/MainLoop";
import System from "./system/System";
import {
  ActionCallback,
} from "./type/external";

class Carousel {
  public get root() { return this._root; }
  public get wrapper() { return this._wrapper; }
  public get state() { return this._stateMachine; }
  public get slides() { return this._slideCollection; }

  private _root: HTMLElement | null;
  private _wrapper: HTMLElement | null;
  private _slideCollection: SlideCollection;
  private _actionManager: ActionManager;
  private _stateMachine: StateMachine;
  private _systemSchedule: SystemSchedule;
  private _mainLoop: MainLoop;

  public constructor() {
    this._root = null;
    this._wrapper = null;
    this._slideCollection = new SlideCollection();
    this._actionManager = new ActionManager();
    this._stateMachine = new StateMachine(this, this._actionManager);
    this._mainLoop = new MainLoop(this, this._actionManager);
    this._systemSchedule = new SystemSchedule({
      carousel: this,
      loop: this._mainLoop
    });
  }

  public mount(el: HTMLElement): this {
    const state = this._stateMachine;

    state.change(State.Init);

    this._root = el;
    this._wrapper = el.querySelector(".carousel-wrapper");
    this._systemSchedule.start(el);
    this._mainLoop.run();

    state.change(State.Idle);

    return this;
  }

  public destroy(): this {
    if (!this._root) return this;

    const state = this._stateMachine;
    const schedule = this._systemSchedule;

    state.change(State.Destroy);

    // 여기서 리소스 전부 해제
    schedule.stop(this._root);
    schedule.removeAll();
    this._mainLoop.stop();
    this._root = null;
    this._wrapper = null;

    state.change(null);

    return this;
  }

  public addSystem(system: System): this {
    this._systemSchedule.spawn(system);

    return this;
  }

  public addSetup(cb: ActionCallback): this {
    this._actionManager.add(Action.onExit(State.Init, cb));

    return this;
  }

  public addAction(action: Action<State, ActionMode>): this {
    this._actionManager.add(action);

    return this;
  }
}

export default Carousel;
