import MXApiModule from "../MXApiModule";
import ServiceError from "../error/ServiceError";

const assetServiceKeyMap = {
  postGLB_gltForm: "gltForm",
};
// 파라미터 gltfForm
const PostGLB = async (args) => {
  const params = Object.fromEntries(args);

  const res = await MXApiModule.post(
    "/asset",
    params[assetServiceKeyMap.postGLB_gltForm]
  ).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

const assetServiceMap = {
  postAsset: PostGLB,
};

const assetEndPoints = {
  postAsset: "postAsset",
};

const executeAsset =
  (map) =>
  (endPointName, ...args) =>
    map[endPointName](args);

const AssetService = executeAsset(assetServiceMap);

export { assetEndPoints, assetServiceKeyMap };
export default AssetService;
