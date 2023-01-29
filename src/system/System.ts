import SystemOrder from "./SystemOrder";
import * as ID from "./id";
import type SystemContext from "./SystemContext";
import type Control from "./control/Control";
import type Slider from "./slider/Slider";
import type SlideRenderer from "./renderer/SlideRenderer";
import type Resizer from "./Resizer";

abstract class System {
  public readonly refs: Partial<{
    [ID.CONTROL]: Control | null;
    [ID.RENDERER]: SlideRenderer | null;
    [ID.SLIDER]: Slider | null;
    [ID.RESIZER]: Resizer | null;
  }> = {};
  public readonly order: SystemOrder | null = null;

  public abstract readonly id: symbol;

  public abstract init(ctx: SystemContext): void;
  public abstract destroy(ctx: SystemContext): void;
}

export default System;
