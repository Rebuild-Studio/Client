import imgProcessApi from "../ImgProcessApiModule";
import ServiceError from "../error/ServiceError";
import convertArgs from "../utils/convertArgs";

const imgProcessServiceKeyMap = {
  postImg_imageForm: "imageForm",
  postApart_imageForm: "imageForm",
};

// 파라미터 imageForm
const PostIMG = async (args) => {
  const params = convertArgs(args);
  const res = await imgProcessApi
    .post("/process-shapes", params[imgProcessServiceKeyMap.postImg_imageForm])
    .catch((error) => {
      throw new ServiceError(
        error.response.data.status,
        error.response.data.error
      );
    });
  return res;
};

// 파라미터 imageForm
const PostApart = async (args) => {
  const params = convertArgs(args);
  const res = await imgProcessApi
    .post("/process-lines", params[imgProcessServiceKeyMap.postApart_imageForm])
    .catch((error) => {
      throw new ServiceError(
        error.response.data.status,
        error.response.data.error
      );
    });
  return res;
};

const ImgProcessServiceMap = {
  postImgProcess: PostIMG,
  postImgApart: PostApart,
};

const imgProcessEndPoints = {
  postImgProcess: "postImgProcess",
  postImgApart: "postImgApart",
};

const executeImgProcess =
  (map) =>
  (endPointName, ...args) =>
    map[endPointName](args);

const ImgProcessService = executeImgProcess(ImgProcessServiceMap);

export { imgProcessEndPoints, imgProcessServiceKeyMap };
export default ImgProcessService;
