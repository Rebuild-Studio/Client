import { observable } from "mobx";

type UserStoreProps = {
  accessToken: string;
}
const userStore = observable<UserStoreProps>({
  accessToken: "",
});

export type { UserStoreProps }
export default userStore;
