import { makeAutoObservable } from "mobx";
import Sheet from "../class/event-system/Sheet";
import UUIDGenerator from "../../utils/uuid";
import * as Utils from "../class/event-system/utils";
import { ControlType } from "../class/event-system/NodeControl";
export default class EventSystemStore {
  sheets = {};
  selectedSheet = null;
  sheetOrder = [];
  interactionUIType = null; // interactionHierarchy 또는 interactionPanel로 구분.
  isMultiSelectCtrlPressed = false; // 인터렉션 패널에서 ctrl키를 누르고 있는지 확인하는 변수

  contextMenuPosition = [0, 0];
  contextMenuType = null;
  canvasSize = null;

  //FIXME : user setting
  camera = {
    min: 0.75,
    max: Infinity,
    speed: 1,
  };

  constructor(string_store) {
    this.stringStore = string_store;
    // isNewComponent : true when 유저가 새로운 프로젝트 생성
    // false when 유저가 기존 프로젝트를 로드
    //FIXME : selectedSheet를 최초로 겟할 때 selectedSheet가 null이면 시트를 생성하는게 best
    const isNewComponent = true;
    if (isNewComponent) {
      const defaultSheet = this.createSheet();
      this.setSelectedSheet(defaultSheet.uuid);
      this.setSheetOrder({
        uuid: defaultSheet.uuid,
      });
    }

    makeAutoObservable(this);
  }

  /**
   * 기존에 사용하던 nodes, wire를 getter와 setter로 대체하여 사용
   */
  get nodes() {
    return this.getSelectedSheet().nodes;
  }

  get wires() {
    return this.getSelectedSheet().wires;
  }

  get groups() {
    return this.getSelectedSheet().groups;
  }

  get cameraPosition() {
    return this.getSelectedSheet().cameraPosition;
  }

  get cameraZoom() {
    return this.getSelectedSheet().cameraZoom;
  }

  get selectedNodes() {
    return this.getSelectedSheet().selectedNodes;
  }
  get selectedGroups() {
    return this.getSelectedSheet().selectedGroups;
  }
  get selectedSockets() {
    return this.getSelectedSheet().selectedSockets;
  }
  get copiedNodes() {
    return this.getSelectedSheet().copiedNodes;
  }

  /**
   * @description
   * 이벤트 시스템 메서드
   */
  setCanvasSize(s) {
    this.canvasSize = s;
  }

  closeContextMenu() {
    this.contextMenuType = null;
  }

  nodeContextMenu(position) {
    this.contextMenuPosition = position;
    this.contextMenuType = "Node";
  }

  groupContextMenu(position) {
    this.contextMenuPosition = position;
    this.contextMenuType = "Group";
  }

  sheetContextMenu(position) {
    this.contextMenuPosition = position;
    this.contextMenuType = "Sheet";
  }

  panelContextMenu(position) {
    this.contextMenuPosition = position;
    this.contextMenuType = "Panel";
  }

  createSheet(args = {}) {
    const { name = this.uniqueSheetName(), uuid = UUIDGenerator.run() } = args;
    const sheet = new Sheet({ name, uuid });
    Object.assign(this.sheets, {
      [uuid]: sheet,
    });
    return sheet;
  }

  uniqueSheetName() {
    const names = Object.values(this.sheets).map((v) => v.name);
    let newName = "";
    function checkName(v) {
      return v !== newName;
    }
    for (let i = 0; i < names.length + 1; i++) {
      newName = this.defaultSheetName(i + 1);
      if (names.every((v) => checkName(v))) {
        break;
      }
    }
    return newName;
  }

  uniqueNodeTypeName(sheet, type) {
    const names = sheet.nodes.map((v) => v.name);
    let newName = "";
    function checkName(v) {
      return v !== newName;
    }
    for (let i = 0; i < names.length + 1; i++) {
      newName = this.defaultNodeName(i + 1, type);
      if (names.every((v) => checkName(v))) {
        break;
      }
    }
    return newName;
  }

  uniqueGroupName(sheet) {
    const names = sheet.groups.map((v) => v.name);
    let newName = "";
    function checkName(v) {
      return v !== newName;
    }
    for (let i = 0; i < names.length + 1; i++) {
      newName = this.defaultGroupName(i + 1);
      if (names.every((v) => checkName(v))) {
        break;
      }
    }

    return newName;
  }

  defaultSheetName(index) {
    return `${this.stringStore.string("DefaultSheetName")} ${index}`;
  }

  defaultGroupName(index) {
    return `${this.stringStore.string("DefaultGroupName")} ${index}`;
  }

  defaultNodeName(index, type) {
    return `${this.stringStore.string(`Default${type}NodeName`)} ${index}`;
  }

  deleteSheet(uuid) {
    this.deleteSheetOrder(uuid);
    if (this.selectedSheet === uuid) {
      this.setSelectedSheet(this.visibleSheetOrder[0]);
    }
    delete this.sheets[uuid];
  }

  getSheetByUuid(uuid) {
    return this.sheets[uuid];
  }

  setSelectedSheet(uuid) {
    this.selectedSheet = uuid;
    this.getSheetByUuid(uuid).show();
  }

  getSelectedSheet() {
    return this.getSheetByUuid(this.selectedSheet);
  }

  isSelectedSheet(uuid) {
    return this.selectedSheet === uuid;
  }

  getSheetOrderByUuid(uuid) {
    return this.sheetOrder.indexOf(uuid);
  }

  setSheetOrder(args) {
    const { uuid, order } = args;

    if (typeof order === "undefined") {
      this.sheetOrder.push(uuid);
      return;
    }

    this.sheetOrder.splice(order, 0, uuid);
  }

  deleteSheetOrder(uuid) {
    this.sheetOrder.remove(uuid);
  }

  get visibleSheetOrder() {
    return this.sheetOrder.filter((uuid) => !this.sheets[uuid].hidden);
  }

  getInteractionUIType() {
    return this.interactionUIType;
  }

  setInteractionUIType(type) {
    this.interactionUIType = type;
  }

  getIsMultiSelectCtrlPressed() {
    return this.isMultiSelectCtrlPressed;
  }

  setIsMultiSelectCtrlPressed(bool) {
    this.isMultiSelectCtrlPressed = bool;
  }

  zoomInCamera() {
    this.getSelectedSheet().zoomIn(this.camera);
  }

  zoomOutCamera() {
    this.getSelectedSheet().zoomOut(this.camera);
  }

  toJSON() {
    return {
      sheets: this.sheets,
      selectedSheet: this.selectedSheet,
      sheetOrder: this.sheetOrder,
    };
  }

  parseInteractionJson(json) {
    this.parseInteractions(Utils.parse(json));
  }

  parseInteractions(data) {
    Object.entries(data?.sheets).forEach(([uuid, rawSheet]) => {
      const { nodes, wires, groups, ...rest } = rawSheet;
      const sheet = new Sheet(rest);
      sheet.parseInteractions({ nodes, wires, groups });
      Object.assign(this.sheets, {
        [uuid]: sheet,
      });
    });
    this.sheetOrder = data?.sheetOrder;
    this.selectedSheet = data?.selectedSheet;
  }

  parsePrefab(data, metaObjects) {
    const prefabIdMap = new Map();
    metaObjects.forEach((object) => {
      if (object.prefabId) {
        prefabIdMap.set(object.prefabId, object.objectId);
      }
    });
    Object.entries(data?.sheets).forEach(([, rawSheet]) => {
      const { nodes, wires, groups, ...rest } = rawSheet;
      rest.uuid = UUIDGenerator.run();
      const sheet = new Sheet(rest);
      nodes.forEach((node) => {
        if (node.prefabId) {
          const refUuid = prefabIdMap.get(node.prefabId);
          Object.entries(node.control).forEach(([, value]) => {
            switch (value.type) {
              case ControlType.Object:
              case ControlType.SpotLight:
              case ControlType.PointLight:
                value.value = refUuid;
                node.objectId = refUuid;
                break;
              default:
                break;
            }
          });
        }
      });
      sheet.parseInteractions({ nodes, wires, groups });
      Object.assign(this.sheets, {
        [rest.uuid]: sheet,
      });
      this.sheetOrder = [...this.sheetOrder, rest.uuid];
      this.setSelectedSheet(rest.uuid);
    });
  }

  clearStore() {
    this.sheetOrder = [];
    Object.values(this.sheets).forEach((sheet) => sheet.clearNodes());
    this.sheets = {};
  }
}
