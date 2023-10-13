/*
  @Cutom Error
  1000 Invalid Token 토큰 만료 시
  1001 Max retry count exceeded 재시도 회수 초과
*/

class ServiceError extends Error {
  constructor(status, errorMessage, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }

    this.status = status;
    this.errorMessage = errorMessage;
  }
}

export default ServiceError;
