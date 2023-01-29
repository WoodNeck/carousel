import SystemOrderType from "./SystemOrderType";

class SystemOrder {
  public readonly type: SystemOrderType;
  public readonly ref: symbol;

  public static before(id: symbol) {
    return new SystemOrder(SystemOrderType.BEFORE, id);
  }

  public static after(id: symbol) {
    return new SystemOrder(SystemOrderType.AFTER, id);
  }

  // 왜 private이냐: SystemOrderType을 밖으로 노출시키지 않아도 됨
  private constructor(type: SystemOrderType, ref: symbol) {
    this.type = type;
    this.ref = ref;
  }
}

export default SystemOrder;
