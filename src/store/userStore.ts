import { makeAutoObservable } from "mobx";

class UserStore {
  accessToken = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
const userStore = new UserStore();
export default userStore;
