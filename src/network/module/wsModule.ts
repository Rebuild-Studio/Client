const isProduction = import.meta.env.PROD;
const wsModule = new WebSocket(
  isProduction ? import.meta.env.VITE_SOCKET_SERVER_URL : "ws://localhost:8080"
);

export default wsModule;
