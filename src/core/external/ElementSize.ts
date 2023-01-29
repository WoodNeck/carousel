/**
 * DOM 영역에서 실제 클라이언트 영역을 벗어나는 추가분을 나타내는 인터페이스, px
 */
interface DOMPadding {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

class ElementSize {
  /**
   * width는 border left/right을 포함
   */
  public readonly width: number;
  /**
   * height은 border top/bottom을 포함
   */
  public readonly height: number;
  public readonly margin: DOMPadding;
  public readonly border: DOMPadding;
  /**
   * 수평 마진 포함
   */
  public readonly horizontal: number;
  /**
   * 수직 마진 포함
   */
  public readonly vertical: number;

  private constructor({
    width,
    height,
    margin,
    border
  }: {
    width: number;
    height: number;
    margin: DOMPadding;
    border: DOMPadding;
  }) {
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.border = border;

    // 자주 쓰이므로 미리 계산해서 캐시
    this.horizontal = width
      + margin.left
      + margin.right;

    this.vertical = height
      + margin.top
      + margin.bottom;
  }

  public static zero() {
    return new ElementSize({
      width: 0,
      height: 0,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      border: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    });
  }

  public static fromElement(element: HTMLElement): ElementSize {
    const style = getComputedStyle(element);

    const getSize = (size: string) => size.endsWith("%") ? 0 : parseFloat(size);

    return new ElementSize({
      width: getSize(style.width),
      height: getSize(style.height),
      margin: {
        left: getSize(style.marginLeft),
        right: getSize(style.marginRight),
        top: getSize(style.marginTop),
        bottom: getSize(style.marginBottom)
      },
      border: {
        left: getSize(style.borderLeft),
        right: getSize(style.borderRight),
        top: getSize(style.borderTop),
        bottom: getSize(style.borderBottom)
      }
    });
  }
}

export default ElementSize;
