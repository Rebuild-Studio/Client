import { Buffer } from "buffer";

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
 * @property {WebSocket} socket WebSocket 객체 - 싱글톤으로 관리함(채널은 하나만 오픈)
 * @property {string} targetService 서비스 명(api 명세에 정의된 서비스 명)
 * @property {number} chunkSize 청크 사이즈
 * @property {Uint8Array} headerBytes 헤더 정보에 대한 Byte Array
 *
 * @method createFixedHeader 고정 헤더 정보에 대한 Byte Array 생성(프라이빗 함수)
 * @method createVariableParts 바디 정보에 대한 Byte Array 생성
 * @method handleServerMessage 서버로부터 받은 response 메시지 처리
 * @method sendInChunks 청크 단위로 메시지 전송
 */
class WsModule {
  static userId: string = "user";
  static socket = new WebSocket(
    isProduction
      ? import.meta.env.VITE_SOCKET_SERVER_URL
      : "ws://localhost:8080"
  );

  private targetService: string;
  private chunkSize: number;
  public headerBytes: Uint8Array;

  constructor({ targetService, chunkSize = CHUNK_SIZE }: WsModuleConstructor) {
    this.targetService = targetService;
    this.chunkSize = chunkSize;
    this.headerBytes = this.createFixedHeader();
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
    headerBytes.set(new TextEncoder().encode("q"), 43);
    //user ID 설정
    headerBytes.set(new TextEncoder().encode(WsModule.userId).reverse(), 36);

    return headerBytes;
  }

  private encodeVarHeader() {
    return new TextEncoder().encode(
      JSON.stringify({
        targetServiceName: this.targetService,
      })
    );
  }

  public setUserId(userId: string) {
    WsModule.userId = userId;
  }

  // TODO
  public createVariableParts() {
    return {};
  }

  public async handleServerMessage(data: ArrayBuffer) {
    const dataView = new DataView(data);
    const headerLength = dataView.getInt32(24);
    const bodyStart = 64 + headerLength;

    const bodyLength = dataView.getInt32(28);
    const bodyBytes = new Uint8Array(data, bodyStart, bodyLength);
    const bodyString = new TextDecoder().decode(bodyBytes);

    return await JSON.parse(bodyString);
  }

  public assembleMessage() {
    const reqHeaderBytes = this.headerBytes;
    const encodedVarHeader = this.encodeVarHeader();
    const fixedHeader = new DataView(reqHeaderBytes.buffer);
    fixedHeader.setInt32(24, encodedVarHeader.byteLength);

    const message = new ArrayBuffer(
      reqHeaderBytes.byteLength + encodedVarHeader.byteLength
    );
    const messageBytes = new Uint8Array(message);

    messageBytes.set(reqHeaderBytes, 0);
    messageBytes.set(encodedVarHeader, reqHeaderBytes.byteLength);

    return messageBytes;
  }

  public sendInChunks(messageBytes: Uint8Array) {
    const numberOfChunks = Math.ceil(messageBytes.byteLength / this.chunkSize);
    for (let i = 0; i < numberOfChunks; i++) {
      const start = i * this.chunkSize;
      const end = start + this.chunkSize;
      const chunk = messageBytes.slice(start, end);
      WsModule.socket.binaryType = "arraybuffer";
      WsModule.socket.send(chunk);
    }
  }
}

export default WsModule;
