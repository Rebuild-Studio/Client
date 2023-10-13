import React, { useEffect } from "react";
import { List, Box, Button, Typography, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import storeContainer from "../../../../stores/storeContainer";
import { reaction } from "mobx";
import InteractionHierachyVM from "../../../../view_models/05. Hierarchy/InteractionHierarchy_VM";
import { eventSystem_store } from "../../../../stores/Interaction_Stores";

const InteractionHierarchyList = observer(() => {
  const { string_store, common_store, eventSystem_store, hierarchy_store } =
    storeContainer;
  // "data-()" 작성시 InteractionPanelEvents 클래스를 통해 우클릭 메뉴 동작
  const buttonDataAttributes = (object, index) => ({
    "data-name": object.type === "group" ? "group" : "node",
    "data-nodeuuid": object.type !== "group" ? object.uuid : null,
    "data-groupuuid": object.type === "group" ? object.uuid : null,
    "data-ui": "leftTab",
    "data-divider": index,
  });
  const iconUrl = {
    group: "icon_그룹@2x.png",
    Mouse: "icon_마우스@2x.png",
    MousePosition: "icon_마우스@2x.png",
    MouseRaycast: "icon_마우스@2x.png",
    Keyboard: "Clip path group3@2x.png",
    Start: "Clip path group2@2x.png",
    Timer: "icon_timer@2x.png",
    Camera: "icon_camera@2x.png",
    SpotLight: "icon_환경광@2x.png",
    PointLight: "icon_환경광@2x.png",
    Object: "Clip path group@2x.png",
    Vector3Calculation: "btn_연산노드@2x.png",
    Vector3Compare: "btn_연산노드@2x.png",
    Calculation: "btn_연산노드@2x.png",
    Compare: "btn_연산노드@2x.png",
    MathSymbol: "btn_연산노드@2x.png",
    LogicGate: "btn_연산노드@2x.png",
    Random: "Vector@2x.png",
    Flag: "Vector@2x.png",
    Counter: "Vector@2x.png",
    CameraSensor: "btn_카메라@2x.png",
    PointLightSensor: "btn_광원@2x.png",
    SpotLightSensor: "btn_광원@2x.png",
    ObjectSensor: "btn_오브젝트@2x.png",
    ConstBoolean: "btn_상수노드@2x.png",
    ConstNumber: "btn_상수노드@2x.png",
    ConstVector3: "btn_상수노드@2x.png",
    ConstColor: "icom_컬러변수@2x.png",
    Convert: "icon_변환@2x.png",
  };

  useEffect(() => {
    InteractionHierachyVM.InteractionHierachyListFilter();

    const dispose = reaction(
      () => {
        return eventSystem_store.nodesAndGroups;
      },
      () => {
        InteractionHierachyVM.InteractionHierachyListFilter();
      }
    );

    return () => {
      dispose();
    };
  }, []);
  return (
    <>
      {/*Hierarchy*/}
      <List
        data-name="panel" // 좌측 탭에서 빈 공간 우클릭시 동작
        data-ui="leftTab"
        sx={{
          height: common_store.topSlide
            ? `calc(100vh - ${204}px)`
            : `calc(100vh - ${114}px)`,
        }}
      >
        {InteractionHierachyVM.interactionHierarchyList.map((object, index) => (
          <Box key={index}>
            {/** Divider */}
            {index === InteractionHierachyVM.dividerIndex && (
              <Divider
                style={{
                  backgroundColor: "#d4ed3e",
                  height: "2px",
                  opacity: 0.7,
                }}
              />
            )}
            <Box
              sx={{
                ...style.buttonWrapper,
                ...style.ListButtonStyle(object), // Node 참조하며 Selected된 그룹, 오브젝트 하이라이트
              }}
              onClick={() => {
                InteractionHierachyVM.toggleFolder(object);
              }}
              className={
                object.type === "group"
                  ? "hierarchyListGroup"
                  : "hierarchyListNode"
              }
              data-ui="leftTab"
              data-nodeuuid={object.type !== "group" && object.uuid}
              data-groupuuid={object.type === "group" && object.uuid}
              data-divider={index}
            >
              <Button
                sx={style.button}
                fullWidth
                {...buttonDataAttributes(object, index)}
              >
                <img
                  src={
                    object.type === "group"
                      ? object.folder === "open"
                        ? "legacyJS/Icons/Studio/Interaction/Hierarchy/icon_끄룹@2x.png"
                        : "legacyJS/Icons/Studio/Interaction/Hierarchy/" +
                          iconUrl[object.type]
                      : "legacyJS/Icons/Studio/Interaction/Hierarchy/" +
                        iconUrl[object.type]
                  }
                  alt="icon_object"
                  style={style.clipPathGroup(object)}
                />
                <Typography
                  sx={style.textArea}
                  {...buttonDataAttributes(object, index)}
                >
                  {string_store.string(object.name)}
                </Typography>
              </Button>
            </Box>

            {/** End Divider - Hierarchy의 마지막 Box에서만 생기는 구분선 */}
            {index ===
              InteractionHierachyVM.interactionHierarchyList.length - 1 &&
              index === InteractionHierachyVM.dividerIndex - 1 && (
                <Divider
                  style={{
                    backgroundColor: "#d4ed3e",
                    height: "2px",
                    opacity: 0.7,
                  }}
                />
              )}
          </Box>
        ))}
      </List>
    </>
  );
});

export default InteractionHierarchyList;

const style = {
  ListButtonStyle: (object) => ({
    backgroundColor: `${
      eventSystem_store.getSelectedSheet().isSelectedNode(object.uuid) ||
      eventSystem_store.getSelectedSheet().isSelectedGroup(object.uuid)
        ? "#303030"
        : "transparent"
    }`,
    "&:hover": {
      backgroundColor: "#303030",
    },
  }),
  grid: {
    mt: "10px",
    ml: "11px",
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": { width: 0 },
  },
  buttonWrapper: {
    width: "100%",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  button: {
    fontFamily: "SourceHanSansKR",
    fontSize: "14px",
    fontWeight: "500",
    color: "#fff",
    textAlign: "left",
    textTransform: "none",
    justifyContent: "flex-start",
  },
  gridSx: {
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": { width: 0 },
  },
  boxSx: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightClickBoxSx: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "253px",
    height: "30px",
  },
  nameBoxSx: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
  },
  textArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    color: "#fff",
  },
  textFieldSx: {
    width: "67.00%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  },
  textFieldInputProps: {
    fontFamily: "SpoqaHanSansNeo",
    fontWeight: "500",
    color: "#c4c4c4",
    backgroundColor: "#transparent",
    height: "24px",
    borderColor: "#e6e6e6",
    outlineColor: "#d4ed3e",
  },
  groupWrapper: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none",
    ml: "3px",
  },
  groupAssetWrapper: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none",
    textAlign: "left",
  },
  IconButtonSx: {
    width: "16px",
    height: "16px",
    ml: "12px",
  },
  clipPathGroup: (object) => ({
    width: "16px",
    height: "16px",
    objectFit: "contain",
    marginLeft: `${
      object.type !== "group" ? (object.group === null ? 0 : 18) : 0
    }px`,
    marginRight: "6px",
    // marginLeft: `${(length - 1) * 18 + 6}px`,
  }),
};
