// 이전 값을 저장하는 선형 보간기
class CachedInterpolator {
  private _start: number;
  private _end: number;
  private _interpolated: number;
  private _easing: (x: number) => number;

  public constructor() {
    this._start = 0;
    this._end = 0;
    this._interpolated = 0;
    this._easing = (x: number) => 1 - Math.pow(1 - x, 3);
  }

  public reset() {
    this._start = 0;
    this._end = 0;
    this._interpolated = 0;
  }

  public getInterpolatedValue(progress: number) {
    const easedProgress = this._easing(progress);
    this._interpolated = this._interpolate(this._start, this._end, easedProgress);

    return this._interpolated;
  }

  /**
   * 새로운 end 지점으로 update
   * 현재 interpolated된 값을 start로 사용
   */
  public updateEnd(end: number) {
    this._start = this._interpolated;
    this._end = end;
    this._interpolated = this._start;
  }

  private _interpolate(from: number, to: number, by: number) {
    return from + (to - from) * by;
  }
}

export default CachedInterpolator;
