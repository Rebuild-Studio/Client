import MXApiModule from "../MXApiModule";
import ServiceError from "../error/ServiceError";

// 파라미터 none
const GetPrefabData = async () => {
  const res = await MXApiModule.get("/prefab/public").catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

const prefabServiceMap = {
  getPrefabPublic: GetPrefabData,
};

const prefabEndPoints = {
  getPrefabPublic: "getPrefabPublic",
};

const executePrefab =
  (map) =>
  (endPointName, ...args) =>
    map[endPointName](args);

const PrefabService = executePrefab(prefabServiceMap);

export { prefabEndPoints };
export default PrefabService;
