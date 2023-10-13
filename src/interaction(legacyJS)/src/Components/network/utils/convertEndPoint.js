import AssetService, { assetEndPoints } from "../asset/AssetService";
import ImgProcessService, {
  imgProcessEndPoints,
} from "../imgProcess/ImgProcessService";
import LibraryService, { libraryEndpoints } from "../library/LibraryService";
import PmxService, { pmxEndPoints } from "../pmx/PmxService";
import PrefabService, { prefabEndPoints } from "../prefab/PrefabService";
import ProjectService, { projectEndPoints } from "../project/ProjectService";

const endpointToServiceMap = {
  [assetEndPoints.postAsset]: AssetService,
  [projectEndPoints.getUserDataWithPage]: ProjectService,
  [projectEndPoints.getProject]: ProjectService,
  [projectEndPoints.getMyProject]: ProjectService,
  [projectEndPoints.postProject]: ProjectService,
  [projectEndPoints.postSearchComponent]: ProjectService,
  [projectEndPoints.deleteProjectWithId]: ProjectService,
  [projectEndPoints.updateProjectWithId]: ProjectService,
  [prefabEndPoints.getPrefabPublic]: PrefabService,
  [imgProcessEndPoints.postImgProcess]: ImgProcessService,
  [imgProcessEndPoints.postImgApart]: ImgProcessService,
  [libraryEndpoints.getLibrary]: LibraryService,
  [pmxEndPoints.postPmx]: PmxService,
};

const convertEndPoint = (endPoint) => {
  const serviceModule = endpointToServiceMap[endPoint];
  if (!serviceModule) {
    throw new Error("유효하지 않은 엔드포인트입니다.");
  }
  return serviceModule;
};

export default convertEndPoint;
