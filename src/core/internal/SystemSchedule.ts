import { SystemContext } from "../../system";
import System from "../../system/System";
import SystemOrderType from "../../system/SystemOrderType";

// ECS 아님, 영향은 받았지만
class SystemSchedule {
  private _ctx: Omit<SystemContext, "root">;
  private _systems: System[] = [];

  public constructor(ctx: Omit<SystemContext, "root">) {
    this._ctx = ctx;
  }

  /**
   * 특정 시스템 생성
   */
  public spawn(system: System) {
    const carousel = this._ctx.carousel;

    if (carousel.root) {
      system.init({
        ...this._ctx,
        root: carousel.root
      });
    }

    this._bindSysRef(system);
    this._systems.push(system);
  }

  /**
   * 전체 시스템 시작
   */
  public start(root: HTMLElement) {
    const systems = this._systems;

    const orderedSystems = systems.filter(system => system.order);
    const nonOrderedSystems = systems.filter(system => !system.order);

    // order가 정해져있는 시스템에 대해 미리 참조할 구조체 생성
    const initBefore: Record<symbol, Array<System> | null> = {};
    const initAfter: Record<symbol, Array<System> | null> = {};

    orderedSystems.forEach(sys => {
      const order = sys.order!;
      const initRef = order.type === SystemOrderType.BEFORE ? initBefore : initAfter;

      if (initRef[order.ref]) {
        initRef[order.ref]!.push(sys);
      } else {
        initRef[order.ref] = [sys];
      }
    });

    const initSystem = (system: System) => {
      const systemsBefore = initBefore[system.id] ?? [];
      const systemsAfter = initAfter[system.id] ?? [];

      systemsBefore.forEach(sys => initSystem(sys));
      system.init({ ...this._ctx, root });
      systemsAfter.forEach(sys => initSystem(sys));
    };

    nonOrderedSystems.forEach(system => initSystem(system));
  }

  /**
   * 전체 시스템 정지
   */
  public stop(root: HTMLElement) {
    this._systems.forEach(system => system.destroy({ ...this._ctx, root }));
  }

  /**
   * 모든 시스템 제거
   */
  public removeAll() {
    this._systems = [];
  }

  /**
   * 레퍼런스 바인딩
   */
  private _bindSysRef(newSys: System) {
    const id = newSys.id;

    // 기존 존재하는 시스템들의 ref에 신규 시스템을 바인딩
    this._systems.forEach(sys => {
      if (id in sys.refs) {
        if (sys.refs[id] != null) {
          console.warn("System duplication on same ID, received:", newSys, ", prev:", sys.refs[id], ", inside:", sys);
        }

        sys.refs[id] = newSys;
      }
    });

    // 추가된 시스템의 ref에 기존 시스템을 바인딩
    this._systems.forEach(sys => {
      if (sys.id in newSys.refs) {
        if (newSys.refs[sys.id] != null) {
          console.warn("System duplication on same ID, received:", sys, ", prev:", newSys.refs[sys.id], ", inside:", newSys);
        }

        newSys.refs[sys.id] = sys;
      }
    });
  }
}

export default SystemSchedule;
