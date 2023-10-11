import CreateWireCommand from "../../../../class/commands/Interaction/CreateWireCommand";
import DeleteWireCommand from "../../../../class/commands/Interaction/DeleteWireCommand";
import SelectSheetCommand from "../../../../class/commands/Interaction/SelectSheetCommand";
import AddSelectedPositionCommand from "../../../../class/commands/Interaction/AddSelectedPositionCommand";
import SelectNodeAndGroupCommand from "../../../../class/commands/Interaction/SelectNodeAndGroupCommand";
import UnselectNodeAndGroupCommand from "../../../../class/commands/Interaction/UnselectNodeAndGroupCommand";
import CreateConvertNodeCommand from "../../../../class/commands/Interaction/CreateConvertNodeCommand";
import CreateGroupCommand from "../../../../class/commands/Interaction/CreateGroupCommand";
import MergeGroupCommand from "../../../../class/commands/Interaction/MergeGroupCommand";
import InteractionHierachyVM from "../../../../view_models/05. Hierarchy/InteractionHierarchy_VM";
import ExcludeFromGroupCommand from "../../../../class/commands/Interaction/ExcludeFromGroupCommand";

const TARGET = {
  NODE: "node",
  SOCKET: "socket",
  PANEL: "panel",
  DROPDOWN: "dropdown",
  GROUP: "group",
  SHEET: "sheet",
};

class InteractionPanelEvents {
  current = null;
  currentUuid = null;
  currentDataDivider = null; // 계층 구조 사이에 pointerUp 시 Divider
  currentDividedTop = null;
  currentDividedBottom = null;
  isDragged = false;

  constructor(eventSystem_store, interactionhistory_store) {
    this.EStore = eventSystem_store;
    this.IStore = interactionhistory_store;
  }

  /**
   * Event Listeners
   */
  onPointerDown = (event) => {
    const { ctrlKey, metaKey, button } = event;
    const { name, nodeuuid, socketuuid, groupuuid, ui } = event.target.dataset;
    const { input, output } = event.target.parentNode.dataset;
    const data = { name, nodeuuid, socketuuid, groupuuid, ui, input, output };
    const isCtrlPressed = ctrlKey || metaKey;
    const selectedSheet = this.EStore.getSelectedSheet();
    const selectedItems =
      selectedSheet.selectedNodes.length + selectedSheet.selectedGroups.length;
    const MULTI_SELECTED = 2;

    this.EStore.setIsMultiSelectCtrlPressed(isCtrlPressed);

    // 다중 선택이 되어 있는 상태인지 판단하는 로직
    if (selectedItems >= MULTI_SELECTED) {
      this.EStore.setIsMultiSelectCtrlPressed(true);
      if (selectedItems == MULTI_SELECTED) {
        if (
          selectedSheet.selectedNodes[0].group ===
          selectedSheet.selectedGroups[0]?.uuid
        ) {
          this.EStore.setIsMultiSelectCtrlPressed(false);
        }
      }
    }

    // event.preventDefault() => 인터랙션 에디터 전체 pointerDown 금지
    // 0: 주 마우스 버튼 (보통 왼쪽 버튼), 1: 보조 마우스 버튼 (보통 가운데 버튼), 2: 보조 마우스 버튼 (보통 오른쪽 버튼)
    if (button === 2) return;

    // 좌측 탭에서 클릭시 동작 (좌측탭 클릭으로도 InteractionPanel이 움직이는 현상 방지)
    // if (data.ui === "leftTab") {
    //   this.EStore.setInteractionUIType("leftTab");
    // }

    this.current = TARGET[data.name?.toUpperCase()] || TARGET.DROPDOWN;
    this.currentUuid = data.groupuuid || data.nodeuuid; // groupuuid가 우선적으로 선택됨

    switch (this.current) {
      case TARGET.SOCKET:
        this.socketHandler({ data });
        break;
      case TARGET.NODE:
        this.nodeHandler({ event, data });
        break;
      case TARGET.GROUP:
        this.groupHandler({ event, data });
        break;
      case TARGET.PANEL:
        this.handleDefaultCase();
        break;
      case TARGET.DROPDOWN:
        if (data.name === "wire") {
          this.handleDefaultCase();
        }
        break;
    }

    if (data.ui === "leftTab") {
      this.EStore.setInteractionUIType("leftTab");
    }
    if (data.ui !== "leftTab") {
      this.EStore.setInteractionUIType("interactionEditor");
    }
    this.isDragged = true;
  };

  onPointerMove = (event) => {
    const sheet = this.EStore.getSelectedSheet();
    const activeUiArea = this.EStore.getInteractionUIType();
    const { divider, ui } = event.target.dataset;
    const data = { divider: parseInt(divider, 10), ui };

    if (!this.isDragged) {
      if (data.ui === "leftTab") {
        this.EStore.setInteractionUIType("leftTab");
      }
      if (data.ui !== "leftTab") {
        this.EStore.setInteractionUIType("interactionEditor");
      }
    }

    if (activeUiArea === "leftTab") {
      this.handleDragAndDropLeftTab(data, event);
    } else {
      // Drag 시 Outline(border 속성 활용) 기능
      if (this.isDragged) this.handleDragAndDropOutline(event);

      if (this.current === TARGET.DROPDOWN) return;
      sheet.setPointerPosition(
        [event.clientX, event.clientY],
        this.EStore.canvasSize
      );
      if (event.buttons === 1 && (event.movementX || event.movementY)) {
        if (
          (this.current === TARGET.NODE &&
            this.EStore.selectedNodes.length > 0) ||
          (this.current === TARGET.GROUP &&
            this.EStore.selectedGroups.length > 0)
        ) {
          this.IStore.execute(
            new AddSelectedPositionCommand(
              this.EStore,
              [event.movementX, event.movementY],
              this.EStore.selectedSheet
            )
          );
          return;
        }

        if (this.current !== TARGET.SOCKET) {
          sheet.addCameraPosition(-event.movementX, -event.movementY);
        }
      }
    }
  };

  onPointerUp = (event) => {
    const { ctrlKey, metaKey } = event;
    const isCtrlPressed = ctrlKey || metaKey;
    const sheet = this.EStore.getSelectedSheet();
    const activeUiArea = this.EStore.getInteractionUIType();
    const { name, divider } = event.target.dataset;
    const data = { name, divider: parseInt(divider, 10) };
    // 좌측 탭의 Hierarchy를 구성하는 Node, Group 컴포넌트에 대한 Drag & Drop 관련 변수
    const draggableHierarchyListNodes =
      document.querySelectorAll(".hierarchyListNode");
    const draggableHierarchyListGroups = document.querySelectorAll(
      ".hierarchyListGroup"
    );
    // 인터렉션 패널을 구성하는 Node, Group 컴포넌트에 대한 Drag & Drop 관련 변수
    const draggableNodes = document.querySelectorAll(".Node");
    const draggableGroups = document.querySelectorAll(".Group");

    const groupList = [...draggableHierarchyListGroups, ...draggableGroups];
    const nodeList = [...draggableHierarchyListNodes, ...draggableNodes];

    // ----- Drag & Drop 기능 코드 블록 시작 -----
    if (!isCtrlPressed) {
      if (this.current === TARGET.NODE || this.current === TARGET.GROUP) {
        // 선택한 노드가 그룹이 없는 경우
        if (
          this.current === TARGET.NODE &&
          !sheet.getNodeByUuid(this.currentUuid)?.group
        ) {
          // 노드 선택, 그룹 위에 드래그한 경우
          groupList.forEach((group) => {
            const rect = group.getBoundingClientRect();
            const hoverThreshold = rect.height / 4;

            const isHovered =
              event.clientX >= rect.left &&
              event.clientX <= rect.right &&
              event.clientY >= rect.top &&
              event.clientY <= rect.bottom;

            // 좌측 탭 Drag & Drop 시 네임 카드의 상하 1/4 부분에 마우스가 위치에 따라 dividerIndex를 설정
            const isTopPart = event.clientY <= rect.top + hoverThreshold;
            const isBottomPart = event.clientY >= rect.bottom - hoverThreshold;

            const isDividedTop = isHovered && isTopPart;
            const isDividedBottom = isHovered && isBottomPart;

            if (isDividedTop) {
              InteractionHierachyVM.setdividerIndex(this.currentDataDivider);
            }
            if (isDividedBottom) {
              InteractionHierachyVM.setdividerIndex(
                this.currentDataDivider + 1
              );
            }

            if (isHovered && activeUiArea !== "leftTab") {
              // Hover 된 Group를 선택하는 로직
              sheet.selectGroup(group.getAttribute("data-groupuuid"));
            }

            if (
              isHovered &&
              activeUiArea === "leftTab" &&
              !isDividedTop &&
              !isDividedBottom
            ) {
              // Hover 된 Group를 선택하는 로직
              sheet.selectGroup(group.getAttribute("data-groupuuid"));
            }
          });

          if (
            sheet.selectedGroups.length === 1 &&
            this.EStore.getIsMultiSelectCtrlPressed() === false
          ) {
            this.IStore.execute(
              new MergeGroupCommand(
                this.EStore,
                sheet.uuid,
                sheet.selectedGroups,
                sheet.selectedNodes
              )
            );
            sheet.clearSelectedGroups();
          }

          // 노드 선택, 노드 위에 드래그한 경우
          nodeList.forEach((node) => {
            const rect = node.getBoundingClientRect();
            const hoverThreshold = rect.height / 4;

            const isHovered =
              event.clientX >= rect.left &&
              event.clientX <= rect.right &&
              event.clientY >= rect.top &&
              event.clientY <= rect.bottom;

            const isTopPart = event.clientY <= rect.top + hoverThreshold;
            const isBottomPart = event.clientY >= rect.bottom - hoverThreshold;

            if (
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.type === "group" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex
              ]?.type === "Object"
            ) {
              if (
                InteractionHierachyVM.interactionHierarchyList[
                  InteractionHierachyVM.dividerIndex - 1
                ]?.folder === "close"
              ) {
                if (this.currentDividedTop) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider
                  );
                } else if (this.currentDividedBottom) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider + 1
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider + 1
                  );
                }
              }
            }

            if (
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.type === "Object" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex
              ]?.type === "Object"
            ) {
              if (
                !(
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex - 1
                  ]?.group !== null &&
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex - 1
                  ]?.group ===
                    InteractionHierachyVM.interactionHierarchyList[
                      InteractionHierachyVM.dividerIndex
                    ]?.group
                )
              ) {
                if (this.currentDividedTop) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider
                  );
                } else if (this.currentDividedBottom) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider + 1
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider + 1
                  );
                }
              }
            }

            if (
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.type === "Object" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex
              ]?.type === "group"
            ) {
              if (this.currentDividedTop) {
                InteractionHierachyVM.setdividerIndex(this.currentDataDivider);
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider
                );
              } else if (this.currentDividedBottom) {
                InteractionHierachyVM.setdividerIndex(
                  this.currentDataDivider + 1
                );
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider + 1
                );
              }
            }

            if (
              InteractionHierachyVM.dividerIndex === 0 ||
              InteractionHierachyVM.dividerIndex ===
                InteractionHierachyVM.interactionHierarchyList.length
            ) {
              if (this.currentDividedTop) {
                InteractionHierachyVM.setdividerIndex(this.currentDataDivider);
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider
                );
              } else if (this.currentDividedBottom) {
                InteractionHierachyVM.setdividerIndex(
                  this.currentDataDivider + 1
                );
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider + 1
                );
              }
            }

            if (
              isHovered &&
              activeUiArea !== "leftTab" &&
              !sheet.getNodeByUuid(node.getAttribute("data-nodeuuid")).group
            ) {
              // Hover 된 Node를 선택하는 로직
              sheet.selectNode(node.getAttribute("data-nodeuuid"));
            }

            if (
              isHovered &&
              activeUiArea === "leftTab" &&
              !isTopPart &&
              !isBottomPart &&
              !sheet.getNodeByUuid(node.getAttribute("data-nodeuuid")).group
            ) {
              // Hover 된 Node를 선택하는 로직
              sheet.selectNode(node.getAttribute("data-nodeuuid"));
            }
          });

          if (
            sheet.selectedNodes.length === 2 &&
            this.EStore.getIsMultiSelectCtrlPressed() === false
          ) {
            this.IStore.execute(
              new CreateGroupCommand(
                this.EStore,
                sheet.uuid,
                sheet.selectedNodes
              )
            );
            sheet.clearSelectedGroups();
            sheet.clearSelectedNodes();
          }
        } else if (
          this.current === TARGET.NODE &&
          sheet.getNodeByUuid(this.currentUuid).group
        ) {
          let count = 0;

          // 노드 선택, 노드 위에 드래그한 경우
          nodeList.forEach((node) => {
            const rect = node.getBoundingClientRect();
            const hoverThreshold = rect.height / 4;

            const isHovered =
              event.clientX >= rect.left &&
              event.clientX <= rect.right &&
              event.clientY >= rect.top &&
              event.clientY <= rect.bottom;

            const isTopPart = event.clientY <= rect.top + hoverThreshold;
            const isBottomPart = event.clientY >= rect.bottom - hoverThreshold;

            if (
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.type === "group" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex
              ]?.type === "Object"
            ) {
              if (
                InteractionHierachyVM.interactionHierarchyList[
                  InteractionHierachyVM.dividerIndex - 1
                ]?.folder === "close"
              ) {
                count += 1;

                if (this.currentDividedTop) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider
                  );
                } else if (this.currentDividedBottom) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider + 1
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider + 1
                  );
                }
              }
            }

            if (
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.type === "Object" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex
              ]?.type === "Object" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.group ===
                InteractionHierachyVM.interactionHierarchyList[
                  InteractionHierachyVM.dividerIndex
                ]?.group
            ) {
              if (
                (sheet.getNodeByUuid(this.currentUuid).group ===
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex - 1
                  ]?.group &&
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex - 1
                  ]?.group ===
                    InteractionHierachyVM.interactionHierarchyList[
                      InteractionHierachyVM.dividerIndex
                    ]?.group) ||
                InteractionHierachyVM.interactionHierarchyList[
                  InteractionHierachyVM.dividerIndex - 1
                ]?.group !==
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex
                  ]?.group
              ) {
                count += 1;

                if (this.currentDividedTop) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider
                  );
                } else if (this.currentDividedBottom) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider + 1
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider + 1
                  );
                }
              }
              if (
                !(
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex - 1
                  ]?.group !== null &&
                  InteractionHierachyVM.interactionHierarchyList[
                    InteractionHierachyVM.dividerIndex - 1
                  ]?.group ===
                    InteractionHierachyVM.interactionHierarchyList[
                      InteractionHierachyVM.dividerIndex
                    ]?.group
                )
              ) {
                count += 1;

                if (this.currentDividedTop) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider
                  );
                } else if (this.currentDividedBottom) {
                  InteractionHierachyVM.setdividerIndex(
                    this.currentDataDivider + 1
                  );
                  InteractionHierachyVM.moveToDividerIndex(
                    this.currentUuid,
                    this.currentDataDivider + 1
                  );
                }
              }
            }

            if (
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex - 1
              ]?.type === "Object" &&
              InteractionHierachyVM.interactionHierarchyList[
                InteractionHierachyVM.dividerIndex
              ]?.type === "group"
            ) {
              count += 1;

              if (this.currentDividedTop) {
                InteractionHierachyVM.setdividerIndex(this.currentDataDivider);
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider
                );
              } else if (this.currentDividedBottom) {
                InteractionHierachyVM.setdividerIndex(
                  this.currentDataDivider + 1
                );
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider + 1
                );
              }
            }

            if (
              InteractionHierachyVM.dividerIndex === 0 ||
              InteractionHierachyVM.dividerIndex ===
                InteractionHierachyVM.interactionHierarchyList.length
            ) {
              count += 1;

              if (this.currentDividedTop) {
                InteractionHierachyVM.setdividerIndex(this.currentDataDivider);
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider
                );
              } else if (this.currentDividedBottom) {
                InteractionHierachyVM.setdividerIndex(
                  this.currentDataDivider + 1
                );
                InteractionHierachyVM.moveToDividerIndex(
                  this.currentUuid,
                  this.currentDataDivider + 1
                );
              }
            }

            if (
              !isHovered &&
              isTopPart &&
              isBottomPart &&
              activeUiArea === "leftTab"
            ) {
              // Hover 된 Node를 선택하는 로직
              sheet.selectNode(node.getAttribute("data-nodeuuid"));
            }
          });

          if (
            this.EStore.getIsMultiSelectCtrlPressed() === false &&
            count !== 0
          ) {
            this.IStore.execute(
              new ExcludeFromGroupCommand(
                this.EStore,
                sheet.uuid,
                sheet.selectedNodes
              )
            );
          }
          count = 0;
        } else if (this.current === TARGET.GROUP) {
          // 그룹 선택, 그룹 위에 드래그한 경우
          groupList.forEach((group) => {
            if (group.uuid !== this.currentUuid) {
              const rect = group.getBoundingClientRect();
              const hoverThreshold = rect.height / 4;

              const isHovered =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

              const isTopPart = event.clientY <= rect.top + hoverThreshold;
              const isBottomPart =
                event.clientY >= rect.bottom - hoverThreshold;

              const isDividedTop = isHovered && isTopPart;
              const isDividedBottom = isHovered && isBottomPart;

              if (isDividedTop) {
                InteractionHierachyVM.setdividerIndex(this.currentDataDivider);
              }
              if (isDividedBottom) {
                InteractionHierachyVM.setdividerIndex(
                  this.currentDataDivider + 1
                );
              }
              if (isHovered && activeUiArea !== "leftTab") {
                // Hover 된 Group를 선택하는 로직
                sheet.selectGroup(group.getAttribute("data-groupuuid"));
              }

              if (
                isHovered &&
                activeUiArea === "leftTab" &&
                !isDividedTop &&
                !isDividedBottom
              ) {
                // Hover 된 Group를 선택하는 로직
                sheet.selectGroup(group.getAttribute("data-groupuuid"));
              }
            }
          });

          if (sheet.selectedGroups.length === 2) {
            if (
              activeUiArea === "leftTab" &&
              this.EStore.getIsMultiSelectCtrlPressed() === false
            ) {
              this.IStore.execute(
                new MergeGroupCommand(
                  this.EStore,
                  sheet.uuid,
                  sheet.selectedGroups,
                  sheet.selectedNodes
                )
              );
            }

            if (
              activeUiArea !== "leftTab" &&
              this.EStore.getIsMultiSelectCtrlPressed() === false
            ) {
              this.IStore.execute(
                new MergeGroupCommand(
                  this.EStore,
                  sheet.uuid,
                  sheet.selectedGroups,
                  sheet.selectedNodes
                )
              );
              sheet.clearSelectedGroups();
            }
          }
        }
      }
    }

    groupList.forEach((group) => {
      group.style.border = "";
    });

    nodeList.forEach((node) => {
      node.style.border = "";
    });

    // ----- Drag & Drop 기능 코드 블록 끝 -----

    if (event.ctrlKey || event.metaKey) {
      this.EStore.setIsMultiSelectCtrlPressed(true);
    } else {
      this.EStore.setIsMultiSelectCtrlPressed(false);
    }

    this.current = null;
    this.currentUuid = null;
    this.currentDataDivider = null;
    this.currentDividedTop = null;
    this.currentDividedBottom = null;
    this.isDragged = false;
    // this.EStore.setInteractionUIType(null);
    InteractionHierachyVM.setdividerIndex(-1);
  };

  /**
   * Panel, Sheet, Dropdown 클릭 시
   * 선택된 노드, 그룹, 소켓을 모두 해제하는 함수
   */
  handleDefaultCase() {
    const selectedSheet = this.EStore.getSelectedSheet();
    selectedSheet.clearSelectedSocket();
    if (
      selectedSheet.selectedNodes.length > 0 ||
      selectedSheet.selectedGroups.length > 0
    ) {
      this.IStore.execute(
        new SelectNodeAndGroupCommand(
          this.EStore,
          undefined,
          true,
          true,
          this.EStore.selectedSheet
        )
      );
    }
  }

  /**
   *  LeftTab에서 Drag & Drop 시 구분선(Divider)를 설정하는 함수
   */
  handleDragAndDropLeftTab = (data, event) => {
    const draggableHierarchyListNodes =
      document.querySelectorAll(".hierarchyListNode");
    const draggableHierarchyListGroups = document.querySelectorAll(
      ".hierarchyListGroup"
    );

    if (!isNaN(data.divider)) {
      this.currentDataDivider = data.divider;
    }

    if (this.current === TARGET.NODE || this.current === TARGET.GROUP) {
      this.handleDragDropElements(draggableHierarchyListGroups, event, data);
      this.handleDragDropElements(draggableHierarchyListNodes, event, data);
    }
  };

  /**
   *  LeftTab에서 Drag & Drop 시 항목명에서 Hover 영역을 범위 설정하는 함수
   */
  handleDragDropElements = (elements, event, data) => {
    const elementArray = Array.from(elements);
    elementArray.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const hoverThreshold = rect.height / 4;

      const isHovered =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      const isTopPart = event.clientY <= rect.top + hoverThreshold;
      const isBottomPart = event.clientY >= rect.bottom - hoverThreshold;

      const isDividedTop = isHovered && isTopPart;
      const isDividedBottom = isHovered && isBottomPart;

      if (isDividedTop) {
        InteractionHierachyVM.setdividerIndex(data.divider);
        this.currentDividedTop = true;
        this.currentDividedBottom = false;
      }
      if (isDividedBottom) {
        InteractionHierachyVM.setdividerIndex(this.currentDataDivider + 1);
        this.currentDividedTop = false;
        this.currentDividedBottom = true;
      }

      if (isHovered && !isDividedTop && !isDividedBottom) {
        element.style.border = "1px groove #d4ed3e";
        InteractionHierachyVM.setdividerIndex(-1);
      } else {
        element.style.border = "";
      }
    });
  };

  /**
   *  Interaction Panel에서 Drag 후 hover 시 Outline을 그리는 함수
   */
  handleDragAndDropOutline = (event) => {
    const allGroupElements = document.querySelectorAll(".Group");
    const allNodeElements = document.querySelectorAll(".Node");

    allGroupElements.forEach((group) => {
      if (group.uuid !== this.currentUuid) {
        this.applyHoverStyle(group, event);
      }
    });

    for (const node of allNodeElements) {
      if (this.current === TARGET.GROUP) {
        break;
      }
      if (this.currentUuid !== node.uuid && this.isNodeInGroup(node)) {
        this.applyHoverStyle(node, event);
      }
    }
  };

  isNodeInGroup = (node) => {
    const nodeUuid = node.getAttribute("data-nodeuuid");
    return (
      nodeUuid && !this.EStore.getSelectedSheet().getNodeByUuid(nodeUuid).group
    );
  };

  applyHoverStyle = (element, event) => {
    const rect = element.getBoundingClientRect();
    const isHovered =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    element.style.border = isHovered ? "0.5px solid #d4ed3e" : "";
  };

  onWheel = (event) => {
    if (event.deltaY < 0) {
      this.EStore.zoomInCamera();
    } else if (event.deltaY > 0) {
      this.EStore.zoomOutCamera();
    }
    this.EStore.getSelectedSheet().setPointerPosition(
      [event.clientX, event.clientY],
      this.EStore.canvasSize
    );
  };

  onContextMenu = (event) => {
    event.preventDefault();
    const { name, nodeuuid, sheetuuid, groupuuid } = event.target.dataset;

    if (name === TARGET.NODE) {
      const sheet = this.EStore.getSelectedSheet();
      const group = sheet.getGroupOfNodeOrGroup(nodeuuid);
      const position = [event.clientX, event.clientY];

      if (group) {
        if (!this.EStore.getSelectedSheet().isSelectedGroup(group)) {
          this.IStore.execute(
            new SelectNodeAndGroupCommand(
              this.EStore,
              group,
              true,
              true,
              this.EStore.selectedSheet
            )
          );
        } else {
          if (this.EStore.getSelectedSheet().isSelectedChildrenGroup(group)) {
            if (!this.EStore.getSelectedSheet().isSelectedNode(nodeuuid)) {
              this.IStore.execute(
                new SelectNodeAndGroupCommand(
                  this.EStore,
                  nodeuuid,
                  true,
                  false,
                  this.EStore.selectedSheet
                )
              );
            }
            this.EStore.nodeContextMenu(position);
            return;
          }
          this.EStore.groupContextMenu(position);
        }
      } else {
        this.EStore.nodeContextMenu(position);
        if (!this.EStore.getSelectedSheet().isSelectedNode(nodeuuid)) {
          this.IStore.execute(
            new SelectNodeAndGroupCommand(
              this.EStore,
              nodeuuid,
              true,
              true,
              this.EStore.selectedSheet
            )
          );
        }
      }
    } else if (name === TARGET.SHEET) {
      const position = [event.clientX, event.clientY];
      this.EStore.sheetContextMenu(position, this.uuid);
      this.IStore.execute(new SelectSheetCommand(this.EStore, sheetuuid));

      return;
    } else if (name === TARGET.PANEL) {
      const position = [event.clientX, event.clientY];
      this.EStore.panelContextMenu(position);
    } else if (name === TARGET.GROUP) {
      const position = [event.clientX, event.clientY];
      if (!this.EStore.getSelectedSheet().isSelectedGroup(groupuuid)) {
        this.IStore.execute(
          new SelectNodeAndGroupCommand(
            this.EStore,
            groupuuid,
            true,
            true,
            this.EStore.selectedSheet
          )
        );
      }
      this.EStore.groupContextMenu(position);
      return;
    }
  };

  /**
   * Handlers
   */

  socketHandler = ({ data }) => {
    const selectedSockets = this.EStore.getSelectedSheet().selectSocket(
      data.socketuuid
    );
    const socketCount = this.EStore.selectedSockets.length;
    var checkConvertable = "";

    if (socketCount === 1) {
      for (const wire of this.EStore.wires) {
        if (wire.headSocket === data.socketuuid) {
          this.IStore.execute(
            new DeleteWireCommand(
              this.EStore,
              wire.uuid,
              this.EStore.selectedSheet
            )
          );
          this.EStore.getSelectedSheet().clearSelectedSocket();
          this.EStore.getSelectedSheet().selectSocket(wire.tailSocket);
          break;
        }
      }
    } else if (socketCount === 2) {
      checkConvertable =
        this.EStore.getSelectedSheet().checkConvertableSockects(
          selectedSockets
        );

      if (this.EStore.getSelectedSheet().validateSockets(selectedSockets)) {
        let isWired = false;
        for (const wire of this.EStore.wires) {
          if (wire.headSocket === data.socketuuid) {
            isWired = true;
            break;
          }
        }
        if (data.output || (data.input && !isWired)) {
          this.IStore.execute(
            new CreateWireCommand(
              this.EStore,
              selectedSockets,
              this.EStore.selectedSheet
            )
          );
        }
      } else if (typeof checkConvertable !== "undefined") {
        const position =
          this.EStore.getSelectedSheet().getPositionBetweenSockets(
            selectedSockets
          );
        console.log(position);
        const fromTo =
          this.EStore.getSelectedSheet().detectConvertFromTo(checkConvertable);
        this.IStore.execute(
          new CreateConvertNodeCommand(this.EStore, {
            uuids: selectedSockets,
            from: fromTo.from,
            to: fromTo.to,
            position: position,
            convertType: checkConvertable,
            sheetId: this.EStore.selectedSheet,
          })
        );
      }
      this.EStore.getSelectedSheet().clearSelectedSocket();
    }
  };

  nodeHandler = ({ event, data }) => {
    const sheet = this.EStore.getSelectedSheet();
    const groupUuid = sheet.getGroupOfNodeOrGroup(data.nodeuuid);

    if (event.ctrlKey || event.metaKey) {
      if (sheet.isSelectedNode(data.nodeuuid)) {
        this.IStore.execute(
          new UnselectNodeAndGroupCommand(
            this.EStore,
            data.nodeuuid,
            this.EStore.selectedSheet
          )
        );
        return;
      }

      if (groupUuid) {
        if (!sheet.isSelectedGroup(groupUuid)) {
          this.IStore.execute(
            new SelectNodeAndGroupCommand(
              this.EStore,
              groupUuid,
              false,
              false,
              this.EStore.selectedSheet
            )
          );
        } else {
          this.IStore.execute(
            new SelectNodeAndGroupCommand(
              this.EStore,
              data.nodeuuid,
              false,
              false,
              this.EStore.selectedSheet
            )
          );
        }
      } else {
        this.IStore.execute(
          new SelectNodeAndGroupCommand(
            this.EStore,
            data.nodeuuid,
            false,
            false,
            this.EStore.selectedSheet
          )
        );
      }
      return;
    }

    if (!sheet.isSelectedNode(data.nodeuuid)) {
      if (groupUuid) {
        if (!sheet.isSelectedGroup(groupUuid)) {
          this.IStore.execute(
            new SelectNodeAndGroupCommand(
              this.EStore,
              groupUuid,
              true,
              true,
              this.EStore.selectedSheet
            )
          );
        } else {
          this.IStore.execute(
            new SelectNodeAndGroupCommand(
              this.EStore,
              data.nodeuuid,
              true,
              false,
              this.EStore.selectedSheet
            )
          );
        }
      } else {
        this.IStore.execute(
          new SelectNodeAndGroupCommand(
            this.EStore,
            data.nodeuuid,
            true,
            true,
            this.EStore.selectedSheet
          )
        );
      }
    }
    this.current = TARGET.NODE;
  };

  groupHandler = ({ event, data }) => {
    const { groupuuid } = data;
    if (event.ctrlKey || event.metaKey) {
      if (this.EStore.getSelectedSheet().isSelectedGroup(data.groupuuid)) {
        this.IStore.execute(
          new UnselectNodeAndGroupCommand(
            this.EStore,
            data.groupuuid,
            this.EStore.selectedSheet
          )
        );
        return;
      }

      this.IStore.execute(
        new SelectNodeAndGroupCommand(
          this.EStore,
          data.groupuuid,
          false,
          false,
          this.EStore.selectedSheet
        )
      );

      return;
    }

    if (!this.EStore.getSelectedSheet().isSelectedGroup(groupuuid)) {
      this.IStore.execute(
        new SelectNodeAndGroupCommand(
          this.EStore,
          groupuuid,
          true,
          true,
          this.EStore.selectedSheet
        )
      );
    } else {
      const selectedNodesLength =
        this.EStore.getSelectedSheet().selectedNodes.length;

      if (selectedNodesLength !== 0) {
        this.IStore.execute(
          new SelectNodeAndGroupCommand(
            this.EStore,
            groupuuid,
            false,
            false,
            this.EStore.selectedSheet
          )
        );
      }
    }
    this.current = TARGET.GROUP;
  };
}

export default InteractionPanelEvents;
