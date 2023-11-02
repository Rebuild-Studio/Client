import { Buffer } from 'buffer';
import { ResponseDto } from '../webSocket/services/model/commonResponse.model';
import { getChunks } from '../webSocket/utils/getChunks';

globalThis.Buffer = Buffer;

const isProduction = import.meta.env.PROD;
const CHUNK_SIZE = 1024 * 1024 * 10;

interface WsModuleConstructor {
  targetService: string;
  chunkSize?: number;
}

/**
 * @class WsModule
 * @description WebSocket 모듈
 * SAP는 64 바이트 길이의 고정 헤더와 가변 헤더, 바디, 바이너리 데이터로 이루어진다.
 * 가변 헤더, 바디, 바이너리 의 길이는 고정 헤더에 명시된다.
 * @property {string} userId 사용자 아이디(sas 프로토콜에 따라 최대 7자리 - 싱글턴)
 * @property {WebSocket} socket WebSocket 객체 - 매 요청당  1채널 사용
 * @property {string} targetService 서비스 명(api 명세에 정의된 서비스 명)
 * @property {number} chunkSize 청크 사이즈
 * @property {Uint8Array} headerBytes 헤더 정보에 대한 Byte Array
 *
 * @method setUserId 사용자 아이디 설정
 * @method createFixedHeader 고정 헤더 정보에 대한 Byte Array 생성(프라이빗 함수)
 * @method encodeVarHeader 가변 헤더 정보에 대한 Byte Array 생성
 * @method encodeBody 바디 정보에 대한 Byte Array 생성
 * @method handleServerMessage 서버로부터 받은 response 메시지 처리
 * @method send 메시지 전송
 * @method sendInChunks 청크 단위로 메시지 전송
 * @method assembleMessage 메시지 조립
 * @method onReceiveMessage 서버로부터 메시지 수신
 */
class WsModule {
  static userId: string = 'user2';
  public socket: WebSocket;

  private targetService: string;
  private chunkSize: number;
  public headerBytes: Uint8Array;

  constructor({ targetService, chunkSize = CHUNK_SIZE }: WsModuleConstructor) {
    this.targetService = `service-0.1/com.tmax.mx.controller.${targetService}`;
    this.chunkSize = chunkSize;
    this.headerBytes = this.createFixedHeader();
    this.socket = new WebSocket(
      isProduction
        ? import.meta.env.VITE_SOCKET_SERVER_URL
        : 'ws://localhost:8080'
    );
  }

  private createFixedHeader() {
    const fixedHeader = new ArrayBuffer(64);
    const headerBytes = new Uint8Array(fixedHeader);

    headerBytes[0] = 43;
    headerBytes[1] = 236;
    headerBytes[3] = 1;
    headerBytes[5] = 113;
    headerBytes[19] = 1;
    //persona ID 설정
    headerBytes.set(new TextEncoder().encode('q'), 43);
    //user ID 설정
    headerBytes.set(new TextEncoder().encode(WsModule.userId).reverse(), 36);

    return headerBytes;
  }

  private encodeVarHeader() {
    return new TextEncoder().encode(
      JSON.stringify({
        targetServiceName: this.targetService
      })
    );
  }

  public async encodeBody<T extends { [key: string]: unknown }>(body: T) {
    const varBody = JSON.stringify(body);
    const encodedBody = new TextEncoder().encode(varBody);
    return {
      encodedBody
    };
  }

  //TODO : 청크 단위로 메세지 전송을 위한 byteLength 추출가능한 함수 필요
  public async encodeBodyWithMetaData() {}

  public setUserId(userId: string) {
    WsModule.userId = userId;
  }

  private async handleServerMessage(data: ArrayBuffer) {
    const dataView = new DataView(data);
    const headerLength = dataView.getInt32(24);
    const bodyStart = 64 + headerLength;

    const bodyLength = dataView.getInt32(28);
    const bodyBytes = new Uint8Array(data, bodyStart, bodyLength);
    const bodyString = new TextDecoder().decode(bodyBytes);

    return await JSON.parse(bodyString);
  }

  public assembleMessage(
    ...args:
      | [encodedBody: Uint8Array, byteArray: Uint8Array]
      | [encodedBody: Uint8Array]
      | []
  ) {
    let totalByteLength = 0;
    const reqHeaderBytes = this.headerBytes;
    const encodedVarHeader = this.encodeVarHeader();
    const fixedHeader = new DataView(reqHeaderBytes.buffer);
    fixedHeader.setInt32(24, encodedVarHeader.byteLength);
    args[0] && fixedHeader.setInt32(28, args[0].byteLength);
    args[1] && fixedHeader.setInt32(32, args[1].length);

    const messageContents = [reqHeaderBytes, encodedVarHeader, ...args];
    const messageLength = messageContents.reduce((acc, cur) => {
      return acc + cur.byteLength;
    }, 0);
    const message = new ArrayBuffer(messageLength);
    const messageBytes = new Uint8Array(message);

    for (const messageContent of messageContents) {
      messageBytes.set(messageContent, totalByteLength);
      totalByteLength += messageContent.byteLength;
    }
    return messageBytes;
  }

  public send(messageBytes: Uint8Array) {
    this.socket.binaryType = 'arraybuffer';
    this.socket.onopen = () => this.socket.send(messageBytes);
  }

  public sendInChunks(messageBytes: Uint8Array) {
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      getChunks(messageBytes, this.chunkSize).forEach((chunk) => {
        this.socket.send(chunk);
      });
    };
  }

  public onReceiveMessage<T>() {
    return new Promise<T>((resolve, reject) => {
      this.socket.onmessage = async (event) => {
        const response: ResponseDto<T> = await this.handleServerMessage(
          event.data
        );
        if (response) {
          //TODO : 여기서 에러 throw 하도록 수정
          resolve(response.result);
        } else {
          reject(new Error('Request failed'));
        }
        this.socket.close();
      };
    });
  }
}

export default WsModule;
