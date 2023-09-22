import storeContainer from "@/store/storeContainer";
import { nanoid } from "nanoid";
import { renderSelectedGroup } from "./renderThreeComponents";

const makeSelectedGroup = () => {
  const { primitiveStore } = storeContainer;

  primitiveStore.clearSelectedGroupPrimitive();
  const storeId = nanoid();
  primitiveStore.addSelectedGroupPrimitive(
    storeId,
    renderSelectedGroup(storeId)
  );
};

export default makeSelectedGroup;
