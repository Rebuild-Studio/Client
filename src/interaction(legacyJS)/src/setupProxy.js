const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 음성합성
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://tmaxai.co.kr",
      changeOrigin: true,
    })
  );
  // 얼굴 애니메이션
  app.use(
    createProxyMiddleware(["/local"], {
      // 기타 생성용 proxy 서버
      target: "http://192.168.153.130:8080/",
      changeOrigin: true,
    })
  );
};
