/**
 * @description
 * path/?id=1&token=123... 와 같은 url에서 =의 좌측과 우측을 추출해 각각 키 밸류로 반환합니다.
 * @returns {Object} params
 * @example
 * {
 * id: "1",
 * token: "123"
 * }
 */
const getUrlParams = () => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const url = window.location.href;
  const params = {};
  let match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};

export default getUrlParams;
