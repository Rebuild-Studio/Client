import { observer } from "mobx-react";
import storeContainer from "../../../../../stores/storeContainer";
import Curve from "../../views/Curve";
import SocketColor from "../../views/SocketColor";

//WireV: 두 소켓의 연결 상태를 표현하는 선
const WireV = observer((props) => {
  const { eventSystem_store } = storeContainer;
  const { wire } = props;
  const headSocket = eventSystem_store
    .getSelectedSheet()
    .getSocketByUuid(wire.headSocket);
  if (!headSocket) {
    return null;
  }
  const headPosition = eventSystem_store
    .getSelectedSheet()
    .getSocketWorldPosition(wire.headSocket);
  const tailPosition = eventSystem_store
    .getSelectedSheet()
    .getSocketWorldPosition(wire.tailSocket);
  const color = SocketColor(headSocket.type);
  return <Curve color={color} start={headPosition} end={tailPosition} />;
});
export default WireV;
