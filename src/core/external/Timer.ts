class Timer {
  // 진행 주기
  private _period: number;

  private _time: number;
  private _lastTime: number;

  public constructor(period: number) {
    this._period = period;
    this._time = 0;
    this._lastTime = -1;
  }

  public start() {
    this._lastTime = Date.now();
  }

  public reset() {
    this._time = 0;
    this._lastTime = -1;
  }

  /**
   * 진행 정도를 0~1 사이로 반환
   */
  public getNormalizedProgress() {
    return this._time / this._period;
  }

  public isStarted() {
    return this._lastTime < 0;
  }

  public isFinished() {
    return this._time >= this._period;
  }

  /**
   * 시간을 time만큼 추가시킴
   * @param time 진행 시간(ms)
   */
  public tick() {
    const prevLast = this._lastTime;

    this._lastTime = Date.now();
    this._time += this._lastTime - prevLast;
    this._time = Math.min(this._time, this._period);
  }
}

export default Timer;
