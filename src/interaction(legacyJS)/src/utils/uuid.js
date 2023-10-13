import { v4 as uuidv4 } from "uuid";

// JavaScript - Adapter 패턴 적용
// 목적: uuid를 다른 버전으로 바꿀 시 모든 import 부분을 수정하지 않아도 되도록 하기 위함.
class UUIDGenerator {
  run() {
    return uuidv4();
  }
}

export default new UUIDGenerator();
