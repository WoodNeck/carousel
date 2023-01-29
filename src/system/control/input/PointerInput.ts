const DOWN = "pointerdown";
const MOVE = "pointermove";
const UP = "pointerup";
const CANCEL = "pointercancel";

class PointerInput {
  private _onDown: () => any;
  private _onMove: (delta: number) => any;
  private _onUp: () => any;
  private _onCancel: () => any;

  private _el: HTMLElement | null;
  private _delta: number = 0;

  // 여러 개의 핸들러를 받게 만들 수도 있겠지만 지금 당장 필요한지는 모르겠음
  public constructor({
    onDown,
    onMove,
    onUp,
    onCancel
  }) {
    this._onDown = onDown;
    this._onMove = onMove;
    this._onUp = onUp;
    this._onCancel = onCancel;
  }

  public enable(element: HTMLElement) {
    this._el = element;
    element.addEventListener(DOWN, this._onPointerDown);
    element.addEventListener(CANCEL, this._onPointerCancel);
  }

  public disable() {
    const el = this._el;
    if (!el) return;

    el.removeEventListener(DOWN, this._onPointerMove);
    el.removeEventListener(CANCEL, this._onPointerCancel);
    this._clearSubevents(el);

    this._el = null;
  }

  private _clearSubevents(el: HTMLElement) {
    this._delta = 0;
    el.removeEventListener(MOVE, this._onPointerMove);
    el.removeEventListener(UP, this._onPointerUp);
  }

  private _onPointerDown = (evt: PointerEvent) => {
    console.log("DOWN", evt);

    // 2손가락 터치 등은 무시
    if (!evt.isPrimary) return;

    const el = this._el!;
    el.setPointerCapture(evt.pointerId);
    el.addEventListener(MOVE, this._onPointerMove);
    el.addEventListener(UP, this._onPointerUp);

    this._delta = 0;
    this._onDown();
  };

  private _onPointerMove = (evt: PointerEvent) => {
    if (!evt.isPrimary) return;

    // 입력이 왼쪽으로 움직이면, transform이 반대로 적용되어야 하므로
    this._delta -= evt.movementX;

    // 테스트했을 때 넓게 잡아 10px정도를 벗어날 경우 스크롤 발생하므로 그때까지는 캐시
    if (this._willScroll(evt)) return;

    this._onMove(this._delta);
  };

  private _onPointerUp = (evt: PointerEvent) => {
    if (!evt.isPrimary) return;

    console.log("UP", evt);

    const el = this._el!;
    this._clearSubevents(el);

    this._onUp();
  };

  // 스크롤 발생 등으로 인한 cancel
  private _onPointerCancel = (evt: PointerEvent) => {
    if (!evt.isPrimary) return;
    console.log("CANCEL", evt);

    const el = this._el!;
    this._clearSubevents(el);

    this._onCancel();
  };

  private _willScroll(evt: PointerEvent): boolean {
    return evt.pointerType === "touch" && this._delta < 10;
  }
}

export default PointerInput;
