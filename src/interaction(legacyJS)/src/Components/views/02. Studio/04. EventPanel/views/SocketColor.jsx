const _SocketColor = {
  Boolean: "#6d71f9",
  Number: "#ccd5ff",
  Vector3: "#f57dc5",
  Color: "#ff9675",
  // Temp : Material
  Material: "#777777",
};

//SocketColor : 소켓의 데이터 타입에 따라 UI 기획에 정의된 색상을 Css-style hex 형식으로 반환
export default function SocketColor(colorName) {
  const ret = _SocketColor[colorName];
  if (ret) {
    return ret;
  }
  return "#ffffff";
}
