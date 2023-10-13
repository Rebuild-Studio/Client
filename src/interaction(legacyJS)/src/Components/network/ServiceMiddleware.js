import convertEndPoint from "./utils/convertEndPoint";
import ServiceError from "./error/ServiceError";
import convertArgs from "./utils/convertArgs";
import errorHandlerMapper from "./error/handler/errorHandlerMapper";

const MAX_RETRY_COUNT = 3;
/**  
    @params
    endPointName: endpoint명
    이 때 endpoint명은 OOOService.js 안에 있는 OOOEndPoints이용

    args: [key, value], [key, value]... 꼴을 가지는 호출할 api request 파라미터
    이 때 key는 OOOService.js 안에 있는 OOOServiceKeyMap 이용
    value는 기존처럼 값을 넘겨주면 됨

    catch의 e는 ServiceError 클래스
    status code, message를 담고 있는 클래스
    e.status, e.errorMessage로 접근 가능

    사용법 예시
    ServiceMiddleware(projectEndPoints.postProject, [projectServiceKeyMap.postData_formDatas, 보낼 값])
*/
const ServiceMiddleware = async (endPointName, ...args) => {
  // API 호출 시 Loading store 사용하면 됨
  const params = convertArgs(args);
  if (params.count > MAX_RETRY_COUNT) {
    return new ServiceError(1001, "Max retry count exceeded");
  }

  try {
    const apiService = convertEndPoint(endPointName);
    const res = await apiService(endPointName, ...args);
    return res;
  } catch (e) {
    const errorHandlingRes = errorHandlerMapper(e, endPointName, args);

    if (errorHandlingRes instanceof ServiceError) {
      return errorHandlingRes;
    } else {
      if (!params.count) {
        params.count = 0;
      }

      return await ServiceMiddleware(endPointName, ...args, [
        "count",
        params.count + 1,
      ]);
    }
  }
};

export default ServiceMiddleware;
