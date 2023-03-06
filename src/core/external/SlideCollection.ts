import { SlideQueryResult } from "../../slide";
import Slide from "../../slide/Slide";
import SlideQuery from "../../slide/query/SlideQuery";

/**
 * 슬라이드 콜렉션
 */
class SlideCollection {
  private _list: Slide[] = [];

  /**
   * 전체 슬라이드 목록을 반환
   */
  public get all() { return [...this._list]; }

  /**
   * 새로운 슬라이드를 추가
   * @param slides
   */
  public add(slides: Slide[]) {
    this._list.push(...slides);
  }

  /**
   * "index"번째 슬라이드를 반환, 슬라이드가 없을 경우 null을 반환
   * @param index
   * @returns
   */
  public get(index: number): Slide | null {
    const slide = this._list[index];
    return slide || null;
  }

  /**
   * 슬라이드 목록을 초기화
   * @returns
   */
  public clear() {
    // 제일 빠르다고 함, 아마도?
    // https://www.measurethat.net/Benchmarks/Show/373/0/empty-an-array-in-javascript
    this._list = [];
    return this;
  }

  /**
   * 슬라이드 목록에서 쿼리를 수행하고 그 결과를 반환
   * @param query
   * @returns
   */
  public query(query: SlideQuery): SlideQueryResult {
    return;
  }

  /**
   * 슬라이드 목록에서 쿼리를 수행하되, 결과에 슬라이드를 추가하지 않고 커서만 업데이트
   * @param query
   */
  public cursor(query: SlideQuery): SlideQueryResult {

  }
}

export default SlideCollection;
