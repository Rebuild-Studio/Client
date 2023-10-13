import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateNodeButton from "../../02. Studio/04. EventPanel/node-bar/CreateNodeButton";
import CreateNodeMenuButton from "../../02. Studio/04. EventPanel/node-bar/CreateNodeMenuButton";
import { RandomNode } from "../../../class/event-system/LogicNode/RandomNode";
import { AnimationNode } from "../../../class/event-system/Animation/AnimationNode";
import { FlagNode } from "../../../class/event-system/LogicNode/FlagNode";
import { CounterNode } from "../../../class/event-system/LogicNode/CounterNode";
import CameraNode from "../../../class/event-system/ObjectNode/CameraNode";
import { TimerNode } from "../../../class/event-system/InputNode/TimerNode";
import { StartNode } from "../../../class/event-system/InputNode/StartNode";
import { KeyboardNode } from "../../../class/event-system/InputNode/KeyboardNode";
import { ObjectSensorNode } from "../../../class/event-system/SensorNode/ObjectSensorNode";
import { CameraSensorNode } from "../../../class/event-system/SensorNode/CameraSensorNode";
import ObjectNode from "../../../class/event-system/ObjectNode/ObjectNode";
import SpotLightNode from "../../../class/event-system/ObjectNode/PointLightNode";
import PointLightNode from "../../../class/event-system/ObjectNode/PointLightNode";
import { MouseNode } from "../../../class/event-system/InputNode/MouseNode";
import { MousePositionNode } from "../../../class/event-system/InputNode/MousePositionNode";
import { Vector3CalculationNode } from "../../../class/event-system/MathNode/Vector3CalculationNode";
import { Vector3CompareNode } from "../../../class/event-system/MathNode/Vector3CompareNode";
import { CalculationNode } from "../../../class/event-system/MathNode/CalculationNode";
import { CompareNode } from "../../../class/event-system/LogicNode/CompareNode";
import { MathSymbolNode } from "../../../class/event-system/LogicNode/MathSymbolNode";
import { ConstBooleanNode } from "../../../class/event-system/VariableNode/ConstBooleanNode";
import { ConstNumberNode } from "../../../class/event-system/VariableNode/ConstNumberNode";
import { ConstVector3Node } from "../../../class/event-system/VariableNode/ConstVector3Node";
import { ConstColorNode } from "../../../class/event-system/VariableNode/ConstColorNode";
import { VariableBooleanNode } from "../../../class/event-system/VariableNode/VariableBooleanNode";
import { VariableNumberNode } from "../../../class/event-system/VariableNode/VariableNumberNode";
import { VariableStringNode } from "../../../class/event-system/VariableNode/VariableStringNode";
import { ConvertNode } from "../../../class/event-system/ConvertNode/ConvertNode";
import { PointLightSensorNode } from "../../../class/event-system/SensorNode/PointLightSensorNode";
import { SpotLightSensorNode } from "../../../class/event-system/SensorNode/SpotLightSensorNode";
import { SoundNode } from "../../../class/event-system/SoundNode/SoundNode";

import { MeshPhysicalMaterialNode } from "../../../class/event-system/VariableNode/MeshPhysicalMaterialNode";
import { LogicGateNode } from "../../../class/event-system/LogicNode/LogicGateNode";

// TODO : Set Buttons By Mode
// import TempButtonToDownloadPrefab from "../../02. Studio/04. EventPanel/node-bar/TempButtonToDownloadPrefab";
// import TempButtonToDownloadProject from "../../02. Studio/04. EventPanel/node-bar/TempButtonToDownloadProject";

function MainCategory({ children, label, gap = "0px" }) {
  return (
    <Box sx={style.categoryContainer}>
      <Box sx={style.categoryContent(gap)}>{children}</Box>
      <Typography style={style.categoryLabel}>{label}</Typography>
    </Box>
  );
}

const TopBarEvent = () => {
  return (
    <Box sx={style.topBarEventContainer}>
      {/*루트*/}
      <Box sx={style.topBarEventContent}>
        {/*mx.gaia를 위해 안되는 오브젝트 비활성화*/}

        {/*<MainCategory label="라이브러리">*/}
        {/*  <CreateNodeButton*/}
        {/*    node={FunctionNode}*/}
        {/*    backgroundImageName="btn_함수"*/}
        {/*    width="63px"*/}
        {/*  />*/}
        {/*</MainCategory>*/}
        {/*입력*/}
        <MainCategory label="이벤트(입력)">
          {/*마우스*/}
          <CreateNodeButton node={MouseNode} backgroundImageName="btn_마우스" />
          {/*키보드*/}
          <CreateNodeButton
            node={KeyboardNode}
            backgroundImageName="btn_키보드"
          />
          {/*시작*/}
          <CreateNodeButton node={StartNode} backgroundImageName="btn_시작" />
          {/*타이머*/}
          <CreateNodeButton node={TimerNode} backgroundImageName="btn_타이머" />
        </MainCategory>
        {/*사물*/}
        <MainCategory label="사물">
          {/*카메라*/}
          <CreateNodeButton
            node={CameraNode}
            backgroundImageName="btn_카메라"
          />
          {/*라이트*/}
          <CreateNodeMenuButton
            items={[
              { node: PointLightNode, label: "PointLight" },
              { node: SpotLightNode, label: "SpotLight" },
            ]}
            backgroundImageName="btn_광원"
          />
          {/*오브젝트*/}
          <CreateNodeButton
            node={ObjectNode}
            backgroundImageName="btn_오브젝트"
          />
        </MainCategory>
        <MainCategory label="사물 속성">
          <CreateNodeButton
            node={MeshPhysicalMaterialNode}
            backgroundImageName="btn_머터리얼"
          />
          <CreateNodeButton
            node={AnimationNode}
            backgroundImageName="btn_애니메이션"
            label="애니메이션"
            width="63px"
          />
        </MainCategory>
        {/*연산 노드*/}
        <MainCategory label="연산">
          <CreateNodeMenuButton
            items={[
              {
                node: Vector3CalculationNode,
                label: "CalculationMenu",
              },
              {
                node: Vector3CompareNode,
                label: "CompareMenu",
              },
            ]}
            backgroundImageName="btn_연산벡터"
          />
          <CreateNodeMenuButton
            items={[
              {
                node: CalculationNode,
                label: "CalculationMenu",
              },
              {
                node: CompareNode,
                label: "CompareMenu",
              },
              {
                node: MathSymbolNode,
                label: "MathSymbol",
              },
            ]}
            backgroundImageName="btn_연산넘버"
          />
          <CreateNodeMenuButton
            items={[{ node: LogicGateNode, label: "LogicGate" }]}
            backgroundImageName="btn_연산불리언"
          />
        </MainCategory>
        {/*기타 노드*/}
        <MainCategory label="기타">
          <CreateNodeButton node={RandomNode} backgroundImageName="btn_랜덤" />
          <CreateNodeButton node={FlagNode} backgroundImageName="btn_플래그" />
          <CreateNodeButton
            node={CounterNode}
            backgroundImageName="btn_카운터"
          />
        </MainCategory>
        {/*논리 노드*/}
        {/*센서*/}
        <MainCategory label="감지" gap="6px">
          {/*마우스센서*/}
          <CreateNodeButton
            node={MousePositionNode}
            backgroundImageName="btn_마우스센서"
          />
          {/*카메라센서*/}
          <CreateNodeButton
            node={CameraSensorNode}
            backgroundImageName="btn_카메라센서"
          />
          {/*광원센서*/}
          <CreateNodeMenuButton
            items={[
              { node: PointLightSensorNode, label: "PointLight" },
              { node: SpotLightSensorNode, label: "SpotLight" },
            ]}
            backgroundImageName="btn_광원센서"
          />

          {/*오브젝트센서*/}
          <CreateNodeButton
            node={ObjectSensorNode}
            backgroundImageName="btn_오브젝트센서"
          />
        </MainCategory>
        {/*상수*/}
        <MainCategory label="상수">
          <CreateNodeMenuButton
            items={[
              { node: ConstBooleanNode, label: "ConstBoolean" },
              { node: ConstNumberNode, label: "ConstNumber" },
              { node: ConstVector3Node, label: "ConstVector3" },
              { node: ConstColorNode, label: "ConstColor" },
            ]}
            backgroundImageName="btn_상수"
          />
        </MainCategory>
        {/*변수*/}
        <MainCategory label="변수">
          <CreateNodeMenuButton
            items={[
              { node: VariableBooleanNode, label: "VariableBoolean" },
              { node: VariableNumberNode, label: "VariableNumber" },
              { node: VariableStringNode, label: "VariableString" },
            ]}
            backgroundImageName="btn_변수"
          />
        </MainCategory>
        {/*변환*/}
        <MainCategory label="　">
          <CreateNodeButton node={ConvertNode} backgroundImageName="btn_변환" />
        </MainCategory>
        <MainCategory label="　">
          <CreateNodeButton node={SoundNode} backgroundImageName="btn_사운드" />
        </MainCategory>
      </Box>
    </Box>
  );
};
export default TopBarEvent;

const style = {
  categoryContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingLeft: "16px",
    paddingRight: "12px",
    borderRight: 1,
    borderColor: "#1c1c1c",
  },

  categoryContent: (gap) => ({
    width: "100%",
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: gap,
  }),

  categoryLabel: {
    fontFamily: "Pretendard",
    fontSize: "11px",
    fontWeight: "400",
    color: "#959595",
    textAlign: "center",
  },

  topBarEventContainer: {
    position: "fixed",
    top: "90px",
    height: "87px",
    width: "100%",
    backgroundColor: "#282828",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 0,
    borderBottom: 2,
    borderTop: 2,
    borderColor: "#222",
  },

  topBarEventContent: {
    height: "87px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
};
