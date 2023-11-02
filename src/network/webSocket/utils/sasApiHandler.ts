import WsModule from '@/network/module/wsModule';
import { TargetService } from '../types/targetService';

/**
 *
 * @param targetService 타겟 서비스 명
 * @param params request dto
 * @returns 메세지 수신 시 반환되는 response dto
 * @description
 * T : request dto
 * R : response dto
 */
const sasApiHandler = async <T, R>(
  targetService: TargetService,
  params?: T
): Promise<R> => {
  const wsModule = new WsModule({
    targetService
  });
  const message = params
    ? wsModule.assembleMessage(
        (await wsModule.encodeBody({ ...params })).encodedBody
      )
    : wsModule.assembleMessage();

  wsModule.send(message);

  return wsModule.onReceiveMessage<R>();
};

export default sasApiHandler;
