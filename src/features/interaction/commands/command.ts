export default class Command {
  store: any;
  id: number;
  updatable: boolean;
  type: string;
  name: string;

  constructor(store: any) {
    this.store = store;
    this.id = -1;
    this.updatable = false;
    this.type = '';
    this.name = '';
  }

  getDetailData(): Array<any> {
    return [];
  }
}
