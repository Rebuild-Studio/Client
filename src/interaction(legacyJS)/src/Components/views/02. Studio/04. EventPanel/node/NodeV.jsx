import { useRef, useMemo } from "react";
import { observer } from "mobx-react";
import storeContainer from "../../../../stores/storeContainer";
import DataV from "./Header/DataV";
import TitleV from "./Header/TitleV";
import InputV from "./Body/SocketTab/InputV";
import OutputV from "./Body/SocketTab/OutputV";
import ReferenceParameterV from "./Body/ReferenceParameterV";
import { nodeOutline } from "../../../../../constants/styles/interaction/node";
import { socketPosition } from "../../../../../constants/strings/interaction/socket";

const hasControls = (node) => {
  const keys = Object.keys(node.control);
  return keys.length > 0;
};

const getSocketProps = (socketType, socket, node) => {
  return {
    key: `${socketType}${socket.uuid}`,
    nodeUuid: node.uuid,
    socket: socket,
    update: node.random,
    reference: socket.reference,
  };
};

const NodeV = observer(({ node }) => {
  const { eventSystem_store } = storeContainer;
  const _ref = useRef();
  const [translateX, translateY] = eventSystem_store
    .getSelectedSheet()
    .getNodeWorldPosition(node.uuid);
  const scale = useMemo(
    () => eventSystem_store.cameraZoom,
    [eventSystem_store.cameraZoom]
  );
  const outline = eventSystem_store.getSelectedSheet().isSelectedNode(node.uuid)
    ? nodeOutline.selected
    : nodeOutline.unselected;

  return (
    <div
      style={style.Container(scale, { x: translateX, y: translateY }, outline)}
      data-nodeuuid={node.uuid}
      data-name="node"
      ref={_ref}
      className="Node"
      data-group={node.group}
    >
      <TitleV node={node} />
      {hasControls(node) && <DataV node={node} />}
      {Object.entries(node.outputSockets).map(([_, value]) => {
        const props = getSocketProps(socketPosition.OUTPUT, value, node);
        return <OutputV key={props.key} {...props} />;
      })}
      {Object.entries(node.inputSockets).map(([_, value]) => {
        const props = getSocketProps(socketPosition.INPUT, value, node);
        return <InputV key={props.key} {...props} />;
      })}
      {Object.entries(node.referenceParameter).map(([key, value]) => {
        return <ReferenceParameterV key={key} reference={value} />;
      })}
    </div>
  );
});

export default NodeV;

const style = {
  Container: (scale, translate, outline) => ({
    transform: `translate(${translate.x}px, ${translate.y}px)`,
    width: `${180 * scale}px`,
    fontSize: `${scale * 12}px`,
    position: "absolute",
    backgroundColor: "#393939",
    borderRadius: "6px",
    cursor: "pointer",
    height: "auto",
    paddingBottom: "6px",
    boxSizing: "content-box",
    outline: outline,
  }),
};
