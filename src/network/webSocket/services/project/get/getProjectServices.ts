import WsModule from "@/network/module/wsModule";
import { ResponseGetMxProjectList } from "./model/getMxProjectList.model";
import { ResponseDto } from "../../model/commonResponse.model";

const socket = WsModule.socket;

//TODO req,res DTO 만들기
const getMyMxProjectList = async () => {
  const wsModule = new WsModule({
    targetService: "service-0.1/com.tmax.mx.controller.FindMyMxController",
  });
  const message = wsModule.assembleMessage();
  wsModule.sendInChunks(message);

  return new Promise<ResponseGetMxProjectList>((resolve, reject) => {
    socket.onmessage = async (event) => {
      const response: ResponseDto<ResponseGetMxProjectList> =
        await wsModule.handleServerMessage(event.data);

      // TODO response DTO 만들기, CommonResponseDTO에 따른 에러처리
      if (response) {
        resolve(response.result);
      } else {
        reject(new Error("Request failed"));
      }
    };
  });
};

const getProjectServices = {
  getMyMxProjectList,
};

export default getProjectServices;
