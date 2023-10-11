import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import storeContainer from "../../../../../stores/storeContainer";
import { Box } from "@mui/material";
import SocketColor from "../../views/SocketColor";

/**
 *
 * @description 소켓의 스타일을 반환합니다.
 * @param {"output" | "input"} type - 소켓의 타입
 * @param {number} unit - 소켓의 크기
 * @param {SocketColor} backgroundColor - 소켓의 배경색
 * @param {0 | -100} zIndex - 소켓의 z-index
 * @returns
 * @example
 * {
 *    unit: number,
 *    marginLeft: number,
 *    marginRight: number,
 *    backgroundColor: SocketColor,
 *    zIndex: 0 | -100
 * }
 */
const getStyleProps = (type, unit, backgroundColor, zIndex) => {
  let marginLeft = unit;
  let marginRight = unit;
  if (type === "output") {
    marginRight = -unit;
  } else {
    marginLeft = -unit;
  }

  return {
    unit,
    marginLeft,
    marginRight,
    backgroundColor,
    zIndex,
  };
};

const SocketV = observer(({ type, socket, dataType, uuid, update }) => {
  const _ref = useRef();
  const { eventSystem_store } = storeContainer;

  const styleProps = getStyleProps(
    type,
    eventSystem_store.cameraZoom * 8,
    SocketColor(dataType),
    socket.wires.length > 0 ? 0 : -100
  );

  useEffect(() => {
    const domElement = _ref.current;
    if (!domElement) {
      return;
    }
    eventSystem_store
      .getSelectedSheet()
      .setSocketPosition(
        uuid,
        domElement.getBoundingClientRect(),
        eventSystem_store.canvasSize
      );
  }, [eventSystem_store, uuid, update]);

  return (
    <Box
      sx={style.Container(styleProps)}
      ref={_ref}
      data-name="socket"
      data-socketuuid={uuid}
    />
  );
});
export default SocketV;

const style = {
  Container: ({ unit, marginRight, marginLeft, backgroundColor, zIndex }) => ({
    display: "inline-block",
    cursor: "pointer",
    verticalAlign: "middle",
    boxSizing: "border-box",
    border: "0px",
    position: "relative",
    borderRadius: `${unit}px ${unit}px ${unit}px ${unit}px`,
    width: `${2 * unit}px`,
    height: `${2 * unit}px`,
    marginTop: `${unit}px`,
    marginBottom: `${unit}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    backgroundColor: `${backgroundColor}`,
    zIndex: `${zIndex}`,
    "&:hover": {
      zIndex: "0 !important",
    },
  }),
};
