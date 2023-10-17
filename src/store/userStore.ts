import { observable } from "mobx";

const userStore = observable({
  accessToken: ""
});

export default userStore;
