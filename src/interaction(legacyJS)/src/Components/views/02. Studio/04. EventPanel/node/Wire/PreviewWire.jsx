import { observer } from "mobx-react";
import storeContainer from "../../../../../stores/storeContainer";
import Curve from "../../views/Curve";
import SocketColor from "../../views/SocketColor";

//PreviewWire : 연결 중인 소켓의 와이어를 미리 그려주는 기능
const PreviewWire = observer(() => {
  const { eventSystem_store } = storeContainer;

  if (eventSystem_store.selectedSockets.length !== 1) {
    return null;
  }
  const uuid = eventSystem_store.selectedSockets[0];
  const socket = eventSystem_store.getSelectedSheet().getSocketByUuid(uuid);
  if (!socket) return null;
  const color = SocketColor(socket.type);
  const pointerPosition = eventSystem_store
    .getSelectedSheet()
    .getPointerWorldPosition();
  const socketPosition = eventSystem_store
    .getSelectedSheet()
    .getSocketWorldPosition(uuid);
  let start, end;
  if (socket.isInput) {
    start = socketPosition;
    end = pointerPosition;
  } else {
    start = pointerPosition;
    end = socketPosition;
  }
  return <Curve color={color} start={start} end={end} />;
});

export default PreviewWire;
