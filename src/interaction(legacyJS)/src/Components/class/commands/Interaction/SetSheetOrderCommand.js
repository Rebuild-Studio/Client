import Command from "../Command";

export default class SetSheetOrderCommand extends Command {
  constructor(store, uuid, order) {
    super(store);
    this.type = "SetSheetOrderCommand";
    this.name = this.type;
    this.sheet = this.store.getSheetByUuid(uuid);
    this.data = {
      uuid,
      order,
      previous: this.store.getSheetOrderByUuid(uuid),
      name: this.sheet.name,
    };
  }
  execute() {
    this.store.deleteSheetOrder(this.data.uuid);
    this.store.setSheetOrder({ uuid: this.data.uuid, order: this.data.order });
  }
  undo() {
    this.store.deleteSheetOrder(this.data.uuid);
    this.store.setSheetOrder({
      uuid: this.data.uuid,
      order: this.data.previous,
    });
  }
  getDetailData() {
    return [this.data.name, this.data.order + 1];
  }
}
