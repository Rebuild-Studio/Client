import { AnimationNode } from './Animation/AnimationNode';
import { BoolToNumNode } from './ConvertNode/BoolToNumNode';
import { ConvertNode } from './ConvertNode/ConvertNode';
import { NumToBoolNode } from './ConvertNode/NumToBoolNode';
import { NumToVector3Node } from './ConvertNode/NumToVector3Node';
import { Vector3ToNumNode } from './ConvertNode/Vector3ToNumNode';
import { FunctionNode } from './FunctionNode/FunctionNode';
import { KeyboardNode } from './InputNode/KeyboardNode';
import { MouseHoldNode } from './InputNode/MouseHoldNode';
import { MouseNode } from './InputNode/MouseNode';
import { MousePositionNode } from './InputNode/MousePositionNode';
import { MouseRaycastNode } from './InputNode/MouseRaycastNode';
import { MouseSpotNode } from './InputNode/MouseSpotNode';
import { StartNode } from './InputNode/StartNode';
import { TimerNode } from './InputNode/TimerNode';
import { AndNode } from './LogicNode/AndNode';
import { CompareNode } from './LogicNode/CompareNode';
import { CounterNode } from './LogicNode/CounterNode';
import { EqualNode } from './LogicNode/EqualNode';
import { FlagNode } from './LogicNode/FlagNode';
import { GreaterNode } from './LogicNode/GreaterNode';
import { LessNode } from './LogicNode/LessNode';
import { LogicGateNode } from './LogicNode/LogicGateNode';
import { MathSymbolNode } from './LogicNode/MathSymbolNode';
import { NotNode } from './LogicNode/NotNode';
import { OrNode } from './LogicNode/OrNode';
import { PositionSensorNode } from './LogicNode/PositionSensorNode';
import { RandomNode } from './LogicNode/RandomNode';
import { RotationSensorNode } from './LogicNode/RotationSensorNode';
import { ScaleSensorNode } from './LogicNode/ScaleSensorNode';
import { XorNode } from './LogicNode/XorNode';
import { CalculationNode } from './MathNode/CalculationNode';
import { DivideNode } from './MathNode/DivideNode';
import { MinusNode } from './MathNode/MinusNode';
import { MultipleNode } from './MathNode/MultipleNode';
import { PlusNode } from './MathNode/PlusNode';
import { Vector3CalculationNode } from './MathNode/Vector3CalculationNode';
import { Vector3CompareNode } from './MathNode/Vector3CompareNode';
import { OnJoinNode } from './NetworkNode/OnJoinNode';
import { OnLeaveNode } from './NetworkNode/OnLeaveNode';
import { ReceiveBoolMsgNode } from './NetworkNode/ReceiveBoolMsgNode';
import { ReceiveNumMsgNode } from './NetworkNode/ReceiveNumMsgNode';
import { ReceiveVec3MsgNode } from './NetworkNode/ReceiveVec3MsgNode';
import { SendBoolMsgNode } from './NetworkNode/SendBoolMsgNode';
import { SendNumMsgNode } from './NetworkNode/SendNumMsgNode';
import { SendVec3MsgNode } from './NetworkNode/SendVec3MsgNode';
import CameraNode from './ObjectNode/CameraNode';
import ObjectNode from './ObjectNode/ObjectNode';
import PointLightNode from './ObjectNode/PointLightNode';
import SpotLightNode from './ObjectNode/SpotLightNode';
import { CameraSensorNode } from './SensorNode/CameraSensorNode';
import { ObjectSensorNode } from './SensorNode/ObjectSensorNode';
import { PointLightSensorNode } from './SensorNode/PointLightSensorNode';
import { SpotLightSensorNode } from './SensorNode/SpotLightSensorNode';
import { SoundNode } from './SoundNode/SoundNode';
import { ConstBooleanNode } from './VariableNode/ConstBooleanNode';
import { ConstColorNode } from './VariableNode/ConstColorNode';
import { ConstNumberNode } from './VariableNode/ConstNumberNode';
import { ConstVector3Node } from './VariableNode/ConstVector3Node';
import { MaterialTemplateNode } from './VariableNode/MaterialTemplateNode';
import { MeshPhysicalMaterialNode } from './VariableNode/MeshPhysicalMaterialNode';
import { VariableBooleanNode } from './VariableNode/VariableBooleanNode';
import { VariableNumberNode } from './VariableNode/VariableNumberNode';
import { VariableStringNode } from './VariableNode/VariableStringNode';

export const NodeType = {
  // key -> ComponentEnum value
  // TODO : set category

  // 현규 - SoundNode 타입 추가
  Sound: SoundNode,

  // 중선 - ApiListener 타입 추가
  Animation: AnimationNode,

  Mouse: MouseNode,
  MouseSpot: MouseSpotNode,
  MouseHold: MouseHoldNode,
  MousePosition: MousePositionNode,
  MouseRaycast: MouseRaycastNode,
  Keyboard: KeyboardNode,

  Vector3Compare: Vector3CompareNode,
  Compare: CompareNode,
  Equal: EqualNode,
  Greater: GreaterNode,
  Less: LessNode,

  Convert: ConvertNode,
  BoolToNum: BoolToNumNode,
  NumToBool: NumToBoolNode,
  NumToVector3: NumToVector3Node,
  Vector3ToNum: Vector3ToNumNode,

  LogicGate: LogicGateNode,
  And: AndNode,
  Not: NotNode,
  Or: OrNode,
  Xor: XorNode,

  Random: RandomNode,
  Flag: FlagNode,
  Counter: CounterNode,

  MathSymbol: MathSymbolNode,
  Vector3Calculation: Vector3CalculationNode,
  Calculation: CalculationNode,
  Plus: PlusNode,
  Minus: MinusNode,
  Multiple: MultipleNode,
  Divide: DivideNode,

  Start: StartNode,
  Timer: TimerNode,

  Object: ObjectNode,
  PointLight: PointLightNode,
  SpotLight: SpotLightNode,
  Camera: CameraNode,

  OnJoin: OnJoinNode,
  OnLeave: OnLeaveNode,
  ReceiveBoolMsg: ReceiveBoolMsgNode,
  ReceiveNumMsg: ReceiveNumMsgNode,
  ReceiveVec3Msg: ReceiveVec3MsgNode,
  SendBoolMsg: SendBoolMsgNode,
  SendNumMsg: SendNumMsgNode,
  SendVec3Msg: SendVec3MsgNode,

  PositionSensor: PositionSensorNode,
  RotationSensor: RotationSensorNode,
  ScaleSensor: ScaleSensorNode,
  CameraSensor: CameraSensorNode,
  ObjectSensor: ObjectSensorNode,
  PointLightSensor: PointLightSensorNode,
  SpotLightSensor: SpotLightSensorNode,

  ConstNumber: ConstNumberNode,
  ConstBoolean: ConstBooleanNode,
  ConstVector3: ConstVector3Node,
  ConstColor: ConstColorNode,

  VariableBoolean: VariableBooleanNode,
  VariableNumber: VariableNumberNode,
  VariableString: VariableStringNode,

  MeshPhysicalMaterial: MeshPhysicalMaterialNode,
  MaterialTemplate: MaterialTemplateNode,

  Function: FunctionNode
};
export const NodeTypeArray = Object.keys(NodeType).map((key) => NodeType[key]);
