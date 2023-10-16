import { makeAutoObservable } from "mobx";
import { NodeType } from "./NodeType";
import { ControlSocket, ControlType } from "./NodeControl";
import UUIDGenerator from "../../../utils/uuid";
import Socket from "./Socket";
import Wire from "./Wire";
import NodeGroup from "./NodeGroup";
import * as Utils from "./utils";
import InteractionHierachyVM from "../../view_models/05. Hierarchy/InteractionHierarchy_VM";

const POSITION_INTERVAL = 50;

export default class Sheet {
  uuid;
  name;
  type = "sheet";
  nodes = [];
  wires = [];
  groups = [];
  nodesAndGroups = [];
  hidden = false;

  cameraPosition = [0, 0];
  pointerPosition = [0, 0];
  cameraZoom = 1;

  selectedNodes = [];
  selectedGroups = [];
  selectedSockets = [];
  socketPositions = {};
  copiedNodes = [];
  copiedGroups = [];
  constructor({
    name,
    uuid = UUIDGenerator.run(),
    nodes = [],
    wires = [],
    groups = [],
    nodesAndGroups = [],
    hidden = false,
    cameraPosition = [0, 0],
    cameraZoom = 1,
    socketPositions = {},
  }) {
    this.name = name;
    this.uuid = uuid;
    this.nodes = nodes;
    this.wires = wires;
    this.groups = groups;
    this.nodesAndGroups = nodesAndGroups;
    this.hidden = hidden;
    this.cameraPosition = cameraPosition;
    this.camreaZoom = cameraZoom;
    this.socketPositions = socketPositions;

    makeAutoObservable(this);
  }

  setName(name) {
    this.name = name;
    this.updateNodesAndGroups();
    InteractionHierachyVM.InteractionHierachyListFilter();
  }

  setType(type) {
    this.type = type;
  }

  addNode(node) {
    const current = this.getNodeByUuid(node.uuid);
    if (current) Object.assign(current, node);
    else this.nodes.push(node);
    this.updateNodesAndGroups();

    InteractionHierachyVM.interactionHierarchyList.push(node);
  }

  setNodes(nodes) {
    this.nodes = nodes;
  }

  deleteNode(uuid) {
    this.nodes = this.nodes.filter((e) => e.uuid !== uuid);
    this.updateNodesAndGroups();
    InteractionHierachyVM.InteractionHierachyListFilter();
  }

  addWire(wire) {
    const current = this.getWireByUuid(wire.uuid);
    if (current) Object.assign(current, wire);
    else this.wires.push(wire);
  }

  setWires(wires) {
    this.wires = wires;
  }

  deleteWire(wire) {
    this.wires = this.wires.filter((e) => {
      if (e.uuid === wire.uuid) {
        this.getSocketByUuid(e.headSocket)?.removeWireByUuid(e.uuid);
        this.getSocketByUuid(e.tailSocket)?.removeWireByUuid(e.uuid);
        e.dispose();
      }
      return e.uuid !== wire.uuid;
    });
  }

  /**
   * @description
   * 노드 관련 메서드
   */
  clearNodes() {
    this.nodes.forEach((node) => {
      this.deleteAllSocket(node);
    });
    this.nodes = [];
    this.updateNodesAndGroups();
    InteractionHierachyVM.InteractionHierachyListFilter();
  }

  updateNodesAndGroups() {
    this.nodesAndGroups = [...this.nodes, ...this.groups];
  }

  getNodesAndGroups() {
    return this.nodesAndGroups;
  }

  //노드 get
  getNodeByUuid = (uuid) => {
    for (const n of this.nodes) {
      if (n.uuid === uuid) return n;
    }
  };

  getNodeProp(uuid, key) {
    const node = this.getNodeByUuid(uuid);
    if (node) {
      return node[key];
    }
  }

  getNodePosition(uuid) {
    let position = this.getNodeProp(uuid, "position");
    if (!position) {
      position = [0, 0];
      this.setNodePosition(uuid, position);
    }
    return position;
  }

  getNodeWorldPosition(uuid) {
    const nodePosition = this.getNodePosition(uuid);
    return nodePosition.map((p) => {
      return p * this.cameraZoom;
    });
  }

  //노드 속성 업데이트
  setNodeProp(uuid, key, value) {
    const node = this.getNodeByUuid(uuid);
    if (node) {
      node[key] = value;
    }
  }

  setNodePosition(uuid, position) {
    this.setNodeProp(uuid, "position", position);
  }

  addNodePosition(uuid, position) {
    const current = this.getNodePosition(uuid);
    const scaledPosition = position.map((p) => {
      return p / this.cameraZoom;
    });
    const newPosition = current.map((p, i) => {
      return p + scaledPosition[i];
    });
    this.setNodePosition(uuid, newPosition);
  }

  addSelectedNodesPosition(position) {
    for (const uuid of this.selectedNodes) {
      this.addNodePosition(uuid, position);
    }
  }

  setNodeCategory(uuid, category) {
    this.setNodeProp(uuid, "category", category);
  }

  setValueProp(uuid, key, value) {
    const node = this.getNodeByUuid(uuid);
    if (node.control[key]) {
      node.control[key].value = value;
    }
  }

  setObjectValueProp(uuid, key, value) {
    const node = this.getNodeByUuid(uuid);
    if (value) {
      // node.name = value.name; // Node의 Dropbox 변경 시 이름 변경되는 코드.
      node.control[key].value = value.value;
      node.objectId = value.value;
      const defaultKeys = ["position", "rotation", "scale", "visible"];
      switch (node.type) {
        case "Object": {
          const inputKeys = Object.keys(node.inputSockets);
          inputKeys.forEach((key) => {
            if (!defaultKeys.includes(key)) {
              node.deleteInputSocket(key);
            }
          });
          break;
        }
        case "ObjectSensor": {
          const outputKeys = Object.keys(node.outputSockets);
          outputKeys.forEach((key) => {
            if (!defaultKeys.includes(key)) {
              node.deleteInputSocket(key);
            }
          });
          break;
        }
        default:
          break;
      }
      // this.setValueProp(uuid, "material", []);
      this.setValueProp(uuid, "animation", []);
      node.update();
    }
  }

  //소켓 생성
  createInputSocket = (node, key, type, name = key) => {
    node?.addInputSocket(key, type, null, name);
  };

  createOutputSocket = (node, key, type, name = key) => {
    node?.addOutputSocket(key, type, null, name);
  };

  //소켓 삭제
  deleteInputSocket = (node, key) => {
    const socket = node.inputSockets[key];
    const wires = socket.wires;
    socket.dispose();
    if (wires.length > 0) this.deleteWires(wires);
    node.deleteInputSocket(key);
  };

  deleteOutputSocket = (node, key) => {
    const socket = node.outputSockets[key];
    const wires = socket.wires;
    socket.dispose();
    if (wires.length > 0) this.deleteWires(wires);
    node.deleteOutputSocket(key);
  };

  deleteAllSocket = (node) => {
    for (const socket of Object.values(
      Object.assign(node.inputSockets, node.outputSockets)
    )) {
      const wires = socket.wires;
      socket.dispose();
      if (wires.length > 0) this.deleteWires(wires);
    }
    node.deleteAllSockets();
  };

  deleteAllSocketInSheet = (node) => {
    for (const socket of Object.values(
      Object.assign(node.inputSockets, node.outputSockets)
    )) {
      if (this.selectedSockets.some((uuid) => uuid === socket.uuid))
        this.clearSelectedSocket();
      const wires = socket.wires;
      socket.dispose();
      if (wires.length > 0) this.deleteWiresInSheet(wires);
    }
    node.deleteAllSockets();
  };

  // 소켓 get
  getSocketByUuid = (uuid) => {
    for (const node of this.nodes) {
      const { inputSockets, outputSockets } = node;
      for (const socket in inputSockets) {
        if (inputSockets[socket].uuid === uuid) {
          return inputSockets[socket];
        }
      }
      for (const socket in outputSockets) {
        if (outputSockets[socket].uuid === uuid) {
          return outputSockets[socket];
        }
      }
    }
  };

  convertSockets = (uuid, key, value, type) => {
    this.setValueProp(uuid, key, value);
    const node = this.getNodeByUuid(uuid);
    this.deleteAllSocket(node);
    if (!value) {
      return;
    }
    const socketData = ControlSocket.options[type][node.type][value];
    socketData.inputSocket.forEach((socket) => {
      this.createInputSocket(node, socket.name, socket.type);
    });
    socketData.outputSocket.forEach((socket) => {
      this.createOutputSocket(node, socket.name, socket.type);
    });
  };

  setSocketsByArray = (uuid, key, value, type, isInput) => {
    const node = this.getNodeByUuid(uuid);
    const prevSockets = node.control[key].value;
    const getNonMatchingArray = (array, target) => {
      const targetUuid = target.map((e) => e.key);
      return array.filter((e) => !targetUuid.includes(e.key));
    };
    const SocketsToDelete = getNonMatchingArray(prevSockets, value);
    const SocketsToCreate = getNonMatchingArray(value, prevSockets);
    const deleteSocket = isInput
      ? this.deleteInputSocket
      : this.deleteOutputSocket;
    const createSocket = isInput
      ? this.createInputSocket
      : this.createOutputSocket;

    SocketsToDelete.forEach((socket) => deleteSocket(node, socket.key));
    SocketsToCreate.forEach((socket) =>
      createSocket(node, socket.key, type, socket.name)
    );

    this.setValueProp(uuid, key, value);
  };

  //와이어 생성
  createWire = (fromSocket, toSocket) => {
    const wire = fromSocket?.setWire(toSocket);
    return wire;
  };

  createWireByUuid = (uuids) => {
    const sockets = uuids.map((uuid) => this.getSocketByUuid(uuid));
    return this.createWire(
      ...(sockets[0].isInput ? sockets.toReversed() : sockets)
    );
  };

  //와이어 삭제
  deleteWires = (wires) => wires.forEach((e) => this.deleteWire(e));

  deleteWireByUuid = (uuid) => {
    for (const w of this.wires) {
      if (w.uuid === uuid) this.deleteWire(w);
    }
  };

  //와이어 get
  getWireByUuid = (uuid) => {
    for (const wire of this.wires) {
      if (wire.uuid === uuid) return wire;
    }
  };

  getWiresInNode(node) {
    return [
      ...Object.values(node.inputSockets),
      ...Object.values(node.outputSockets),
    ].reduce((ret, socket) => [...ret, ...socket.wires], []);
  }

  getWiresInNodes(nodes) {
    const all = this.getDirtyWiresInNodes(nodes);
    return all.filter((wire, index) => all.indexOf(wire) === index);
  }

  getWiresBetweenNodes(nodes) {
    const all = this.getDirtyWiresInNodes(nodes);
    return all.filter((wire, index) =>
      all.some((w, i) => w.uuid === wire.uuid && i !== index)
    );
  }

  //Internal only
  getDirtyWiresInNodes(nodes) {
    return nodes.reduce(
      (ret, node) => [...ret, ...this.getWiresInNode(node)],
      []
    );
  }

  clearStore() {
    this.clearNodes();
  }

  parseInteractionJson(json) {
    this.parseInteractions(Utils.parse(json));
  }

  parseInteractions(data) {
    const addedNodeUuids = [];
    const addedGroupUuids = [];
    data?.nodes?.forEach((rn) => {
      const node = this.deserializeNode(rn);
      this.addNode(node);
      addedNodeUuids.push(node.uuid);
    });
    data?.wires?.forEach((rw) => {
      const wire = this.deserializeWire(rw);
      this.addWire(wire);
    });
    data?.groups?.forEach((rg) => {
      const group = this.deserializeGroup(rg);
      this.addGroup(group);
      addedGroupUuids.push(group.uuid);
    });
    this.clearSelectedNodes();
    this.selectNodes(addedNodeUuids);
    this.clearSelectedGroups();
    this.selectGroups(addedGroupUuids);
  }

  deserializeNode(rawNode) {
    const nodeClass = NodeType[rawNode.type];

    const node = new nodeClass();

    for (const prop in rawNode) {
      if (prop === "outputSockets" || prop === "inputSockets") {
        for (const raws in rawNode[prop]) {
          const socket = new Socket();

          Object.assign(socket, rawNode[prop][raws]);

          socket.wires = [];

          node[prop][raws] = socket;
        }
      } else node[prop] = rawNode[prop];
    }

    return node;
  }

  deserializeWire(raw) {
    const wire = new Wire();

    const sockets = [
      this.getSocketByUuid(raw.headSocket),

      this.getSocketByUuid(raw.tailSocket),
    ];

    sockets.forEach((s) => {
      const found = s.wires.find((w) => {
        w.uuid = wire.uuid;
      });

      if (!found) {
        s.wires.push(wire);
      }
    });

    Object.assign(wire, raw);

    return wire;
  }

  deserializeGroup(raw) {
    const group = new NodeGroup();
    for (const prop in raw) {
      if (prop === "children" || prop === "group") {
        continue;
      } else {
        group[prop] = raw[prop];
      }
    }
    const rawChildren = raw["children"];
    const children = rawChildren.map((c) => this.getNodeByUuid(c));
    this.addChildrenToGroup(group, children);
    const parent = this.getGroupByUuid(raw["group"]);
    parent?.addChildren([group.uuid]);
    return group;
  }

  initNodePosition(node, position) {
    function distance(p1, p2) {
      return (
        (p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1])
      );
    }
    for (const n of this.nodes) {
      if (n.uuid === node.uuid) continue;
      if (
        distance(n.position, position) <
        POSITION_INTERVAL * POSITION_INTERVAL
      ) {
        this.initNodePosition(node, [
          position[0] + POSITION_INTERVAL,
          position[1] + POSITION_INTERVAL,
        ]);
        return;
      }
    }
    node.position = position;
  }
  isSelectedNode(uuid) {
    return this.selectedNodes.find((s) => {
      return s === uuid;
    });
  }
  getSelectedNodes() {
    return this.selectedNodes.map((uuid) => this.getNodeByUuid(uuid));
  }
  selectNode(uuid) {
    if (!this.isSelectedNode(uuid)) {
      this.selectedNodes.push(uuid);
    }
  }
  selectNodes(uuids) {
    uuids.forEach((uuid) => this.selectNode(uuid));
  }
  unselectNode(uuid) {
    this.selectedNodes.remove(uuid);
  }
  clearSelectedNodes() {
    const ret = this.selectedNodes.slice();
    this.selectedNodes.clear();
    return ret;
  }
  selectSocket(uuid) {
    this.selectedSockets.push(uuid);
    return this.selectedSockets;
  }
  unselectSocket(uuid) {
    this.selectedSockets.remove(uuid);
  }
  clearSelectedSocket() {
    this.selectedSockets.clear();
  }
  validateSockets(uuids) {
    const sockets = uuids.map((uuid) => this.getSocketByUuid(uuid));
    if (
      sockets[0].type !== sockets[1].type ||
      sockets[0].node === sockets[1].node ||
      sockets[0].isInput === sockets[1].isInput
    ) {
      return false;
    }
    return true;
  }
  detectConvertFromTo(value) {
    switch (value) {
      case "BooleanToNumber":
        return { from: "boolean", to: "number" };
      case "ColorToNumber":
        return { from: "color", to: "r" };
      case "NumberToBoolean":
        return { from: "number", to: "boolean" };
      case "NumberToVector3":
        return { from: "x", to: "vector3" };
      case "NumberToColor":
        return { from: "r", to: "color" };
      case "Vector3ToNumber":
        return { from: "vector3", to: "x" };
      default:
        return { from: "", to: "" };
    }
  }
  checkConvertableSockects(uuids) {
    const sockets = uuids.map((uuid) => this.getSocketByUuid(uuid));
    const from = sockets[0].type;
    const to = sockets[1].type;
    switch (from) {
      case ControlType.Boolean:
        if (to === ControlType.Number) {
          return "BooleanToNumber";
        }
        break;
      case ControlType.Color:
        if (to === ControlType.Number) {
          return "ColorToNumber";
        }
        break;
      case ControlType.Number:
        if (to === ControlType.Boolean) {
          return "NumberToBoolean";
        }
        if (to === ControlType.Color) {
          return "NumberToColor";
        }
        if (to === ControlType.Vector3) {
          return "NumberToVector3";
        }
        break;
      case ControlType.Vector3:
        if (to === ControlType.Number) {
          return "Vector3ToNumber";
        }
        break;
      default:
        return "None";
    }
  }
  getSocketPosition(uuid) {
    const position = this.socketPositions[uuid];
    if (!position) {
      return [0, 0];
    }
    return this.socketPositions[uuid];
  }
  getSocketWorldPosition(uuid) {
    const localPosition = this.getSocketPosition(uuid);
    const socket = this.getSocketByUuid(uuid);
    if (!socket) {
      return [0, 0];
    }
    const nodePosition = this.getNodePosition(socket.node);
    return localPosition.map((p, i) => {
      return this.cameraZoom * (p + nodePosition[i]);
    });
  }
  setSocketPosition(uuid, position, canvasSize) {
    if (!canvasSize) {
      return;
    }
    const screenSocketPosition = [
      position.left + position.width / 2,
      position.top + position.height / 2 - 78,
    ];
    const anchoredPosition = screenSocketPosition.map((p, i) => {
      return p - canvasSize[i] / 2;
    });
    const socket = this.getSocketByUuid(uuid);
    if (!socket) {
      delete this.socketPositions[uuid];
      return;
    }
    const nodePosition = this.getNodeWorldPosition(socket.node);
    const scaledDelta = anchoredPosition.map((p, i) => {
      return p - nodePosition[i];
    });
    const ret = scaledDelta.map((p, i) => {
      return p / this.cameraZoom + this.cameraPosition[i];
    });
    this.socketPositions[uuid] = ret;
  }
  getPositionBetweenSockets(uuids) {
    const position1 = this.getSocketWorldPosition(uuids[0]);
    const position2 = this.getSocketWorldPosition(uuids[1]);
    return [
      (position1[0] + position2[0]) / 2,
      (position1[1] + position2[1]) / 2,
    ];
  }
  setPointerPosition(position, canvasSize) {
    const screenPointerPosition = [position[0], position[1] - 74];
    const anchoredPosition = screenPointerPosition.map((p, i) => {
      return p - canvasSize[i] / 2;
    });
    const scaledDelta = anchoredPosition.map((p, i) => {
      return p / this.cameraZoom + this.cameraPosition[i];
    });
    this.pointerPosition = scaledDelta;
  }
  getPointerWorldPosition() {
    return this.pointerPosition.map((v) => {
      return v * this.cameraZoom;
    });
  }
  addCopiedNodes() {
    this.copiedNodes = [...this.selectedNodes];
  }
  addCopiedNodesAndGroups() {
    this.copiedNodes = [...this.selectedNodes];
    this.copiedGroups = [...this.selectedGroups];
  }
  cloneNodes(srcNodeUuids, sheetId, copySuffix) {
    const dstNodes = [];
    const socketTable = {};

    for (const uuid of srcNodeUuids) {
      const srcNode = this.getNodeByUuid(uuid);

      const dstNode = srcNode.clone();
      this.addNode(dstNode);
      dstNode.name = this.cloneNodeName(srcNode.name, copySuffix);

      // for (const controlKey in srcNode.control) {
      //   switch (controlKey) {
      //     case "convert":
      //       this.convertSockets(
      //         dstNode.uuid,
      //         controlKey,
      //         srcNode.control[controlKey].value,
      //         srcNode.control[controlKey].type
      //       );
      //       break;
      //     case "animation":
      //       this.setSocketsByArray(
      //         dstNode.uuid,
      //         controlKey,
      //         srcNode.control[controlKey].value,
      //         ControlType.Number,
      //         srcNode.type === "Object" ? true : false
      //       );
      //       break;
      //     case "material":
      //       this.setSocketsByArray(
      //         dstNode.uuid,
      //         controlKey,
      //         srcNode.control[controlKey].value,
      //         srcNode.control[controlKey].type,
      //         srcNode.type === "Object" ? true : false
      //       );
      //       break;
      //     default:
      //       break;
      //   }
      // }
      // dstNode.control = Utils.copy(srcNode.control);

      const [x, y] = this.getNodePosition(srcNode.uuid);
      this.initNodePosition(dstNode, [x, y]);

      const srcSockets = [
        ...Object.values(srcNode.inputSockets),
        ...Object.values(srcNode.outputSockets),
      ];
      const dstSockets = [
        ...Object.values(dstNode.inputSockets),
        ...Object.values(dstNode.outputSockets),
      ];
      srcSockets.forEach((socket, index) => {
        socketTable[socket.uuid] = dstSockets[index];
      });

      dstNode.group = srcNode.group;

      dstNodes.push(dstNode);
    }

    const srcNodes = srcNodeUuids.map((uuid) => this.getNodeByUuid(uuid));
    const srcWires = this.getWiresBetweenNodes(srcNodes);
    const dstWires = [];
    for (const wire of srcWires) {
      dstWires.push(
        this.createWire(
          socketTable[wire.tailSocket],
          socketTable[wire.headSocket]
        )
      );
    }
    for (const wire of dstWires) {
      this.addWire(wire);
    }

    return { nodes: dstNodes, wires: dstWires };
  }

  cloneNodeName(name, copySuffix) {
    let ret = name + copySuffix;
    const getName = (index) => {
      ret = name + copySuffix + (index ? ` ${index}` : "");
      return this.nodes.some((node) => node.name === ret);
    };
    for (let i = 0; i < this.nodes.length; i++) {
      if (!getName(i)) {
        break;
      }
    }
    return ret;
  }

  setNodeSize(uuid, size) {
    const node = this.getNodeByUuid(uuid);
    node.size = size;
  }

  /**
   * @description
   * 그룹 관련 메서드
   */
  createGroup(args) {
    const { name = undefined, uuid = undefined, sheetId = undefined } = args;
    const group = new NodeGroup(name ? name : this.createGroupName(), uuid);
    this.addGroup(group);
    return group;
  }

  addGroup(group) {
    this.groups.push(group);
    this.updateNodesAndGroups();
  }

  addChildrenToGroup(group, children) {
    children.forEach((childNode) => childNode.setGroup(group.uuid));
    group.addChildren(children.map((child) => child.uuid));
    this.updateNodesAndGroups();

    InteractionHierachyVM.addGroupToHierarchyUI(group, children);
  }

  addChildrenToGroupByUuid(groupUuid, childUuids) {
    const group = this.getGroupByUuid(groupUuid);
    const children = childUuids.map((child) => this.getNodeByUuid(child));
    this.addChildrenToGroup(group, children);
  }

  getNodeGroup(nodes, groups) {
    const selected = [];
    nodes.forEach((uuid) => {
      const node = this.getNodeByUuid(uuid);
      const root = this.getRootGroup(node);
      if (!selected.includes(root)) {
        selected.push(root);
      }
    });
    groups.forEach((uuid) => {
      const group = this.getGroupByUuid(uuid);
      const root = this.getRootGroup(group);
      if (!selected.includes(root)) {
        selected.push(root);
      }
    });
    return selected;
  }

  openFolderByUuid(uuid) {
    const group = this.getGroupByUuid(uuid);
    group.folder = "open";
  }

  closeFolderByUuid(uuid) {
    const group = this.getGroupByUuid(uuid);
    group.folder = "close";
  }

  createGroupName() {
    const numArray = [];
    for (let i = 0; i < this.groups.length; i++) {
      const _name = this.groups[i].name;
      if (_name.substring(0, 5) === "Group") {
        const num = _name.substring(6, _name.length - 1);
        if (!isNaN(num)) numArray.push(Number(num));
      }
    }
    let count = 0;
    while (numArray.length !== 0) {
      const n = numArray.shift();
      if (count === n) count++;
      else break;
    }
    return "Group" + count;
  }

  deleteGroupByUuid(uuid) {
    this.groups = this.groups.filter((e) => {
      if (e.uuid === uuid) {
        const group = this.getGroupByUuid(uuid);
        group.children.forEach((nodeUuid) =>
          this.getNodeByUuid(nodeUuid).setGroup(null)
        );
        e.dispose();
        if (this.selectedGroups.some((groupUuid) => uuid === groupUuid)) {
          this.unselectGroup(uuid);
        }
      }
      return e.uuid !== uuid;
    });

    this.updateNodesAndGroups();
    InteractionHierachyVM.InteractionHierachyListFilter();
  }

  getGroupsDescendants(uuids, sheetId = this.uuid, ret = undefined) {
    if (!ret) ret = { nodes: [], wires: [], groups: [] };
    for (const uuid of uuids) {
      const group = this.getGroupByUuid(uuid);
      ret.groups.push(group);
      group.children.forEach((child) => {
        const node = this.getNodeByUuid(child);
        ret.nodes.push(node);
        const wires = this.getWiresInNode(node);
        for (const wire of wires) {
          if (ret.wires.some((w) => w.uuid === wire.uuid)) continue;
          ret.wires.push(wire);
        }
      });
    }
    return ret;
  }

  deleteGroupAndChildrenByUuid(uuid, sheetId = this.uuid) {
    const group = this.getGroupByUuid(uuid);
    group.children.forEach((child) => {
      this.deleteNodesByUuidInSheet([child], sheetId);
    });
    this.deleteGroupByUuid(uuid);
    InteractionHierachyVM.InteractionHierachyListFilter();
  }

  deleteGroupsAndChildren(uuids) {
    uuids.forEach((uuid) => this.deleteGroupAndChildrenByUuid(uuid));
  }

  getGroupByUuid(uuid) {
    for (const g of this.groups) if (g.uuid === uuid) return g;
  }

  getGroupWorldPosition(uuid) {
    return this.getGroupByUuid(uuid).position;
  }

  excludeChildFromGroup(uuid) {
    const node = this.getNodeByUuid(uuid);
    const child = node ? node : this.getGroupByUuid(uuid);
    const groupUuid = child.group;
    if (!groupUuid) return null;
    const group = this.getGroupByUuid(groupUuid);
    group?.deleteChild(uuid);
    child.group = null;

    InteractionHierachyVM.excludeChildFromGroupToHierarchyUI(group, child);
    return groupUuid;
  }

  mergeGroup(groupUuid, targets) {
    const group = this.getGroupByUuid(groupUuid);
    targets.forEach((uuid) => {
      const node = this.getNodeByUuid(uuid);
      node.setGroup(groupUuid);
    });
    group?.addChildren(targets);

    this.updateNodesAndGroups();
    InteractionHierachyVM.InteractionHierachyListFilter();
    return group;
  }

  selectGroup(uuid) {
    if (!this.isSelectedGroup(uuid)) {
      this.selectedGroups.push(uuid);
    }
  }

  selectGroups(uuids) {
    uuids.forEach((uuid) => this.selectGroup(uuid));
  }

  unselectGroup(uuid) {
    this.selectedGroups.remove(uuid);
    this.getGroupByUuid(uuid).children.forEach((c) => this.unselectNode(c));
  }

  isSelectedGroup(uuid) {
    return this.selectedGroups.some((group) => group === uuid);
  }

  clearSelectedGroups() {
    const ret = this.selectedGroups?.slice();
    this.selectedGroups.clear();
    return ret;
  }

  isSelectedChildrenGroup(uuid) {
    return this.isSelectedGroup(uuid)
      ? this.getChildrenOfGroup(uuid).some((child) =>
          this.isSelectedNode(child)
        )
      : false;
  }

  getRootGroup(child) {
    if (!child.group) {
      return child;
    } else {
      const group = this.getGroupByUuid(child.group);
      return this.getRootGroup(group);
    }
  }

  checkReference(groupUuids, nodeUuids) {
    if (
      groupUuids.some((uuid) => !this.getGroupByUuid(uuid)) ||
      nodeUuids.some((uuid) => !this.getNodeByUuid(uuid))
    ) {
      return false;
    } else {
      return true;
    }
  }

  getToBeCloned(groupUuids, nodeUuids) {
    const excGroups = nodeUuids
      .map((nodeUuid) => this.getNodeByUuid(nodeUuid).group)
      .filter((groupUuid) => {
        return groupUuid ? groupUuids.includes(groupUuid) : false;
      });

    const srcGroups = groupUuids.filter((group) => {
      return !excGroups.includes(group);
    });

    const srcNodes = [...nodeUuids];
    srcGroups.forEach((uuid) =>
      srcNodes.push(...this.getChildrenOfGroup(uuid))
    );

    return { srcGroups, srcNodes };
  }

  cloneNodeAndGroup(srcGroups, srcNodes, copySuffix) {
    const toBeSelected = [];
    const clonedNodes = this.cloneNodes(srcNodes, this.uuid, copySuffix);

    const dstNodes = clonedNodes.nodes;

    const dstWires = clonedNodes.wires;

    const dstGroups = [];
    if (srcGroups.length === 0) {
      dstNodes.forEach((node) => {
        node.group = null;
        toBeSelected.push(node.uuid);
      });
    }
    for (const groupUuid of srcGroups) {
      const srcGroup = this.getGroupByUuid(groupUuid);

      const dstGroup = this.createGroup({
        name: this.cloneGroupName(srcGroup.name, copySuffix),
      });
      const children = [];
      for (const node of dstNodes) {
        if (node.group === srcGroup.uuid) {
          node.group = null;
          children.push(node.uuid);
        } else {
          node.group = null;
          toBeSelected.push(node.uuid);
        }
      }
      this.addChildrenToGroupByUuid(dstGroup.uuid, children);
      dstGroups.push(dstGroup);
    }

    this.clearSelectedNodes();
    this.clearSelectedGroups();
    this.selectNodes(toBeSelected);
    this.selectGroups(dstGroups.map((group) => group.uuid));
    return { groups: dstGroups, nodes: dstNodes, wires: dstWires };
  }

  cloneGroupName(name, copySuffix) {
    let ret = name + copySuffix;
    const getName = (index) => {
      ret = name + copySuffix + (index ? ` ${index}` : "");
      return this.groups.some((group) => group.name === ret);
    };
    for (let i = 0; i < this.groups.length; i++) {
      if (!getName(i)) {
        break;
      }
    }
    return ret;
  }

  addSelectedGroupsPosition(position) {
    for (const uuid of this.selectedGroups) {
      this.addGroupPosition(uuid, position);
    }
  }

  addGroupPosition(uuid, position) {
    const group = this.getGroupByUuid(uuid);
    if (group.children.length > 0) {
      if (group.children.some((child) => this.isSelectedNode(child))) {
        return;
      }
      this.addNodesPosition(group.children, position);
    } else {
      const current = group.position;
      const scaledPosition = position.map((p) => {
        return p / this.cameraZoom;
      });
      const newPosition = current.map((p, i) => {
        return p + scaledPosition[i];
      });
      group.setPosition(newPosition);
      //group.position = newPosition;
    }
  }

  setGroupName(uuid, name) {
    const group = this.getGroupByUuid(uuid);
    group.name = name;

    this.updateNodesAndGroups();
  }

  getNodeOrGroupByUuid(uuid) {
    const node = this.getNodeByUuid(uuid);
    const obj = node ? node : this.getGroupByUuid(uuid);
    return obj;
  }

  selectNodeOrGroup(uuid) {
    const obj = this.getNodeOrGroupByUuid(uuid);
    if (obj?.type === "group") {
      this.selectGroup(uuid);
    } else {
      this.selectNode(uuid);
    }
  }

  unselectNodeOrGroup(uuid) {
    const obj = this.getNodeOrGroupByUuid(uuid);
    if (obj?.type === "group") {
      this.unselectGroup(uuid);
    } else {
      this.unselectNode(uuid);
    }
  }

  getGroupOfNodeOrGroup(uuid) {
    const obj = this.getNodeOrGroupByUuid(uuid);
    return obj?.group;
  }

  getChildrenOfGroup(uuid) {
    const group = this.getGroupByUuid(uuid);
    return group?.children?.map((child) => child);
  }

  addNodesPosition(uuids, position) {
    for (const uuid of uuids) {
      this.addNodePosition(uuid, position);
    }
  }

  addGroupsPosition(uuids, position) {
    for (const uuid of uuids) {
      this.addGroupPosition(uuid, position);
    }
  }

  /**
   * @description
   * 시트 숨기기
   */
  hide() {
    this.hidden = true;
  }

  show() {
    this.hidden = false;
  }

  /**
   * @description
   * 카메라 메서드
   */
  setCameraPosition(p) {
    this.cameraPosition = p;
  }

  addCameraPosition(x, y) {
    const scale = this.cameraZoom;
    this.cameraPosition[0] += x / scale;
    this.cameraPosition[1] += y / scale;
  }

  zoomIn({ min, max, speed }) {
    this.cameraZoom = Math.max(
      min,
      Math.min(max, this.cameraZoom / Math.pow(0.95, speed))
    );
  }

  zoomOut({ min, max, speed }) {
    this.cameraZoom = Math.max(
      min,
      Math.min(max, this.cameraZoom * Math.pow(0.95, speed))
    );
  }

  focusSelected() {
    const selectedPositions = [];

    this.selectedNodes.forEach((uuid) => {
      const node = this.getNodeByUuid(uuid);
      const position = this.getNodeWorldPosition(node.uuid);
      selectedPositions.push(position);
    });

    this.selectedGroups.forEach((uuid) => {
      const group = this.getGroupByUuid(uuid);
      const position = group.position;
      if (position) {
        selectedPositions.push(position);
      }
    });

    const length = selectedPositions.length;
    if (length === 0) {
      return;
    }
    const position = selectedPositions
      .reduce((a, c) => a.map((v, i) => v + c[i]))
      .map((v) => v / length);
    this.setCameraPosition(position);
  }

  /**
   * @description
   * in-sheet 메서드
   */
  createNodeByTypeInSheet = (args) => {
    const { type, name = type, uuid = undefined } = args;
    const node = new NodeType[type](name, uuid);
    this.initNodePosition(node, [
      this.cameraPosition[0],
      this.cameraPosition[1],
    ]);
    this.addNode(node);
    return node;
  };

  /**
   * @param nodeClass
   * @param uuid
   * @param name
   *
   * @description get nodeClass(e.g randomNode class, convertNode class ..) and add node to this.sheet
   */
  createNodeWithNodeClass = ({ node, uuid, name }) => {
    const nodeInstance = new node(name, uuid);
    this.initNodePosition(nodeInstance, [
      this.cameraPosition[0],
      this.cameraPosition[1],
    ]);
    this.addNode(nodeInstance);
    return nodeInstance;
  };

  deleteNodeInSheet = (node) => {
    this.deleteNode(node.uuid);
    this.deleteAllSocketInSheet(node);
    this.getGroupByUuid(node.group)?.deleteChild(node.uuid);
  };

  deleteNodesByUuidInSheet = (uuids) => {
    uuids.forEach((uuid) => this.deleteNodeInSheet(this.getNodeByUuid(uuid)));
  };

  deleteSelectedNodesInSheet() {
    this.deleteNodesByUuidInSheet(this.selectedNodes);
    this.clearSelectedNodes();
  }

  createWireByUuidInSheet = (uuids) => {
    const wire = this.createWireByUuid(uuids);
    this.addWire(wire);
    return wire;
  };

  deleteWiresInSheet = (wires) => {
    wires.forEach((wire) => this.deleteWire(wire));
  };

  deleteWireByUuidInSheet = (uuid) => {
    const wire = this.getWireByUuid(uuid);
    this.deleteWire(wire);
  };

  toJSON() {
    return {
      uuid: this.uuid,
      name: this.name,
      nodes: this.nodes,
      wires: this.wires,
      groups: this.groups,
      hidden: this.hidden,
      cameraPosition: this.cameraPosition,
      cameraZoom: this.cameraZoom,
      socketPositions: this.socketPositions,
    };
  }
}
