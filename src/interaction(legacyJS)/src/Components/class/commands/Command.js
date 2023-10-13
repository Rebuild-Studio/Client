export default class Command {
  constructor(store) {
    this.store = store;
    this.id = -1;
    this.updatable = false;
    this.type = "";
    this.name = "";
  }

  getDetailData() {
    return [];
  }
}
