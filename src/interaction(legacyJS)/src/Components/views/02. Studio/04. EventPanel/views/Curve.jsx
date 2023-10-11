import Box from "@mui/material/Box";

//cX, cY: path가 svg의 영역을 초과하면 선이 렌더링되지 않으므로 svg의 여유 공간을 확보
const cX = 100;
const cY = 10;
const curvature = 0.4;

//Curve : svg - path 엘리먼트를 이용한 3차 베지어 곡선으로 두 지점을 잇는 선을 그림
//노드 그래프가 잘 보이도록, 곡선의 출발점과 도착점의 기울기를 우측으로 설정
export default function Curve(props) {
  const { color, start, end } = props;
  const stroke = color ? color : "white";
  const startX = start[0];
  const startY = start[1];
  const endX = end[0];
  const endY = end[1];

  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);
  const cT = curvature * width;
  const translateX = (endX > startX ? startX : endX) - cX;
  const translateY = (endY > startY ? startY : endY) - cY;
  const mX = (endX > startX ? 0 : width) + cX;
  const mY = (endY > startY ? 0 : height) + cY;
  const lX = (endX > startX ? width : 0) + cX;
  const lY = (endY > startY ? height : 0) + cY;
  const svgWidth = width + 2 * cX;
  const svgHeight = height + 2 * cY;
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: "-1",
      }}
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      <svg data-name="wire" width={svgWidth} height={svgHeight}>
        <path
          data-name="wire"
          stroke={stroke}
          strokeWidth="2"
          fill="transparent"
          d={`M ${mX} ${mY} C ${mX - cT} ${mY} ${lX + cT} ${lY} ${lX} ${lY}`}
        />
      </svg>
    </Box>
  );
}
