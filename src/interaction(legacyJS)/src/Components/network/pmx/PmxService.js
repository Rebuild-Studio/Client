import MXApiModule from "../MXApiModule";
import ServiceError from "../error/ServiceError";
import convertArgs from "../utils/convertArgs";

const PostData = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.post("/published", params).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });
  return res;
};

const pmxServiceMap = {
  postPmx: PostData,
};

const pmxEndPoints = {
  postPmx: "postPmx",
};

const executePmx =
  (map) =>
  (endPointName, ...args) =>
    map[endPointName](args);

const PmxService = executePmx(pmxServiceMap);

export { pmxEndPoints };
export default PmxService;
