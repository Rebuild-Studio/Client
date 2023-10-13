import MXApiModule from "../MXApiModule";
import ServiceError from "../error/ServiceError";
import convertArgs from "../utils/convertArgs";

const projectServiceKeyMap = {
  getUserDataWithPage_offset: "offset",
  postData_formDatas: "formDatas",
  deleteDataById_id: "id",
  updateDataById_id: "id",
  updateDataById_data: "data",
  postSearchComponent: "search",
};

// 파라미터 formDatas
const PostData = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.post(
    "/project",
    params[projectServiceKeyMap.postData_formDatas]
  ).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

// 파라미터 none
const GetData = async () => {
  const res = await MXApiModule.get("/project/all", {}).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

// 파라미터 none
const GetUserDatas = async () => {
  const res = await MXApiModule.get("/project/mine").catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

const GetUserDataWithPage = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.get("/project/mine", {
    params: {
      [projectServiceKeyMap.getUserDataWithPage_offset]:
        params[projectServiceKeyMap.getUserDataWithPage_offset],
    },
  }).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });

  return res;
};

// 파라미터 id
const DeleteDataById = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.delete(
    "/project/" + params[projectServiceKeyMap.deleteDataById_id]
  ).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

// 파라미터 id, datas
const UpdateDataById = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.patch(
    "/project/" + params[projectServiceKeyMap.updateDataById_id],
    params[projectServiceKeyMap.updateDataById_data]
  ).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

const PostSearchComponent = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.post(
    "/project/search",
    params[projectServiceKeyMap.postSearchComponent]
  ).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });

  return res;
};

const projectServiceMap = {
  postProject: PostData,
  getProject: GetData,
  getMyProject: GetUserDatas,
  deleteProjectWithId: DeleteDataById,
  updateProjectWithId: UpdateDataById,
  postSearchComponent: PostSearchComponent,
  getUserDataWithPage: GetUserDataWithPage,
};

const projectEndPoints = {
  postProject: "postProject",
  getProject: "getProject",
  getMyProject: "getMyProject",
  deleteProjectWithId: "deleteProjectWithId",
  updateProjectWithId: "updateProjectWithId",
  postSearchComponent: "postSearchComponent",
  getUserDataWithPage: "getUserDataWithPage",
};

const executeProject =
  (map) =>
  (endPointName, ...args) =>
    map[endPointName](args);

const ProjectService = executeProject(projectServiceMap);

export { projectEndPoints, projectServiceKeyMap };
export default ProjectService;
