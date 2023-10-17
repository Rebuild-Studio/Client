import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useThree, useFrame } from "@react-three/fiber";
import storeContainer from "../../../stores/storeContainer";
import NodeRuntimeArguments from "../../../class/event-system/runtime/NodeRuntimeArguments";

const MAX_ITERATION = 64;
const UPDATE_RATE = 0.01;
let cDelta = 0;
function fixedUpdateNodes(nodes, state, delta, xrFrame) {
  cDelta += delta;
  if (cDelta < UPDATE_RATE) {
    return;
  }
  cDelta -= UPDATE_RATE;
  nodes.forEach((node) => {
    node.runtime.setDone(false);
  });
  let iter = 0;
  let finished = false;
  while (!finished) {
    iter++;
    if (iter > MAX_ITERATION) {
      console.warn(
        "Interaction Runtime : Max Iteration occured! Maybe too many nodes or an circular reference."
      );
      break;
    }
    finished = updateNodes(nodes, state, delta, xrFrame);
  }
}
function updateNodes(nodes, state, delta, xrFrame) {
  let finished = true;
  nodes.forEach((node, index) => {
    const done = node.runtime.onUpdate(state, delta, xrFrame);
    if (!done) {
      finished = false;
      nodes.splice(index, 1);
      nodes.push(node);
    }
  });
  return finished;
}

const SheetRuntime = observer((props) => {
  const { uuid } = props;
  const { eventSystem_store, object_store, loader_store } = storeContainer;
  const nodes = useRef([]);
  const three = useThree();
  const wireWarps = useRef({});
  useEffect(() => {
    //init Event Runtime
    cDelta = 0;
    const currentNodes = nodes.current;
    const connections = {};
    const special = {
      object_store: object_store,
      loader_store: loader_store,
      three: three,
      wireWarps: wireWarps,
    };

    eventSystem_store.getSheetByUuid(uuid).nodes.forEach((node) => {
      const nodeObject = new NodeRuntimeArguments(node, special);
      currentNodes.push(nodeObject);
      for (const value of Object.values(node.outputSockets)) {
        connections[value.uuid] = nodeObject.outputSockets;
      }
    });
    //connect
    currentNodes.forEach((node) => {
      for (const value of Object.values(node.inputSockets.sockets)) {
        for (const tail of value.tails) {
          if (!connections[tail]) {
            console.warn(`InteractionStore data are corrupted.`);
          } else {
            value.foundTails.push({
              sockets: connections[tail],
              name: connections[tail].getName(tail),
            });
          }
        }
      }
    });
    //onStart
    const tabIndex = three.gl.domElement.getAttribute("tabIndex");
    three.gl.domElement.setAttribute("tabIndex", -1);
    currentNodes.forEach((node) => {
      node.runtime.onStart();
    });
    return () => {
      //onEnd
      currentNodes.forEach((node) => {
        node.runtime.onEnd();
      });
      if (tabIndex === null) {
        three.gl.domElement.removeAttribute("tabIndex");
      } else {
        three.gl.domElement.setAttribute("tabIndex", tabIndex);
      }
      //dispose EventRuntime
      currentNodes.splice(0, currentNodes.length);
    };
  }, [eventSystem_store, uuid, three, object_store, loader_store, wireWarps]);
  useFrame((state, delta, xrFrame) => {
    const currentNodes = nodes.current;
    //onUpdate
    fixedUpdateNodes(currentNodes, state, delta, xrFrame);
  });
  return null;
});

const InteractionRuntimeInternal = observer(() => {
  const { eventSystem_store } = storeContainer;
  return eventSystem_store.sheetOrder
    .filter((uuid) => {
      const sheet = eventSystem_store.sheets[uuid];
      return sheet.type !== "function";
    })
    .map((uuid) => {
      return <SheetRuntime key={`sheet-runtime-${uuid}`} uuid={uuid} />;
    });
});

const InteractionRuntime = observer(() => {
  const { common_store } = storeContainer;
  return common_store.isPreview && <InteractionRuntimeInternal />;
});

export default InteractionRuntime;
