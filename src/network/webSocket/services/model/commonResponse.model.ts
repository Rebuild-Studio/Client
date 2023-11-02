interface ResponseDto<T> {
  result: T;
  resultCode: number;
  resultMsg: string;
}

export type { ResponseDto };
