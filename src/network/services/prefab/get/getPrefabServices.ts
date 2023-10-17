import apiModule from "@network/module/apiModule";

const getPublicPrefab = async () => {
  const res = await apiModule.get("/prefab/public");

  return res;
};

const getPrefabServices = {
  getPublicPrefab: getPublicPrefab
};

export default getPrefabServices;
