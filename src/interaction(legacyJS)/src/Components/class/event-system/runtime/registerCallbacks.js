import NodeRuntime from "./nodes/NodeRuntime";

import Vector3CalculationRuntime from "./nodes/middle/vector3calculation/Vector3CalculationRuntime";
import CalculationRuntime from "./nodes/middle/calculation/CalculationRuntime";
import CameraRuntime from "./nodes/camera/CameraRuntime";
import CameraSensorRuntime from "./nodes/camera/CameraSensorRuntime";
import ConvertRuntime from "./nodes/middle/convert/ConvertRuntime";
import ObjectRuntime from "./nodes/things/ObjectRuntime";
import SensorRuntime from "./nodes/things/sensor/SensorRuntime";
import ThingRuntime from "./nodes/things/ThingRuntime";
import VariableRuntime from "./nodes/variable/VariableRuntime";
import MaterialRuntime from "./nodes/middle/material/MaterialRuntime";

import VectorCompareProcess from "./nodes/middle/VectorCompareProcess";
import CompareProcess from "./nodes/middle/CompareProcess";

import KeyboardCanvasEventProcess from "./nodes/input/canvas-event/KeyboardCanvasEventProcess";
import MouseSignalCanvasEventProcess from "./nodes/input/canvas-event/MouseSignalCanvasEventProcess";
import MousePositionCanvasEventProcess from "./nodes/input/canvas-event/MousePositionCanvasEventProcess";
import StartProcess from "./nodes/input/StartProcess";

import TimerProcess from "./nodes/middle/TimerProcess";
import ChangedProcess from "./nodes/middle/ChangedProcess";

import LogicProcess from "./nodes/middle/LogicProcess";

import AnalyzeProcess from "./nodes/middle/AnalyzeProcess";
import MapProcess from "./nodes/middle/MapProcess";
import DigitizeProcess from "./nodes/middle/DigitizeProcess";
import InverseProcess from "./nodes/middle/InverseProcess";
import RandomProcess from "./nodes/random/RandomProcess";
import FlagProcess from "./nodes/middle/FlagProcess";
import CounterProcess from "./nodes/middle/CounterProcess";

import PositionToAngleProcess from "./nodes/middle/PositionToAngleProcess";
import AngleToPositionProcess from "./nodes/middle/AngleToPositionProcess";
import AngleDifferenceProcess from "./nodes/middle/AngleDifferenceProcess";

import RaycastProcess from "./nodes/things/RaycastProcess";

export default function registerCallbacks(node) {
  const type = node.type;
  let Runtime = NodeRuntime;
  const processes = [];
  switch (type) {
    //Camera
    case "Camera":
      Runtime = CameraRuntime;
      break;
    //Compare
    case "Vector3Compare":
      processes.push(VectorCompareProcess);
      break;
    case "Compare":
      processes.push(CompareProcess);
      break;
    //Convert
    case "Convert":
      Runtime = ConvertRuntime;
      break;
    //Input
    case "Keyboard":
      processes.push(KeyboardCanvasEventProcess);
      break;
    case "Mouse":
      processes.push(MouseSignalCanvasEventProcess);
      break;
    case "MousePosition":
      processes.push(MousePositionCanvasEventProcess);
      break;
    case "Start":
      processes.push(StartProcess);
      break;
    //Observe
    case "Timer":
      processes.push(TimerProcess);
      break;
    case "Changed":
      processes.push(ChangedProcess);
      break;
    //Boolean
    case "LogicGate":
      processes.push(LogicProcess);
      break;
    //Calculation
    case "Vector3Calculation":
      Runtime = Vector3CalculationRuntime;
      break;
    case "Calculation":
      Runtime = CalculationRuntime;
      break;
    //Math
    case "MathSymbol":
      processes.push(AnalyzeProcess);
      break;
    case "Map":
      processes.push(MapProcess);
      break;
    case "Digitize":
      processes.push(DigitizeProcess);
      break;
    case "Inverse":
      processes.push(InverseProcess);
      break;
    case "Random":
      processes.push(RandomProcess);
      break;
    case "Flag":
      processes.push(FlagProcess);
      break;
    case "Counter":
      processes.push(CounterProcess);
      break;
    //Angle
    case "PositionToAngle":
      processes.push(PositionToAngleProcess);
      break;
    case "AngleToPosition":
      processes.push(AngleToPositionProcess);
      break;
    case "AngleDifference":
      processes.push(AngleDifferenceProcess);
      break;
    //Raycast
    case "MouseRaycast":
      Runtime = ThingRuntime;
      processes.push(RaycastProcess);
      break;
    //Sensor
    case "PointLightSensor":
    case "SpotLightSensor":
    case "ObjectSensor":
      Runtime = SensorRuntime;
      break;
    case "CameraSensor":
      Runtime = CameraSensorRuntime;
      break;
    //Things
    case "PointLight":
    case "SpotLight":
    case "Object":
      Runtime = ObjectRuntime;
      break;
    //Variable
    case "ConstBoolean":
    case "ConstColor":
    case "ConstNumber":
    case "ConstVector3":
    case "MaterialTemplate":
      Runtime = VariableRuntime;
      break;
    case "MeshPhysicalMaterial":
      Runtime = MaterialRuntime;
      break;
    default:
      console.warn(`node runtime not implemented for type ${type}`);
      break;
  }
  node.runtime = new Runtime({ node: node, processes: processes });
}
