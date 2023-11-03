interface CommonResponse<T> {
  result: T;
  resultCode: number;
  resultMsg: string;
}

export type { CommonResponse };
