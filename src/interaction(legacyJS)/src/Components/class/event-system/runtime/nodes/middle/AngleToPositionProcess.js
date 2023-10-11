import { Vector3 } from "three";
import MiddleProcess from "./MiddleProcess";

export default class AngleToPositionProcess extends MiddleProcess {
  calculate(inputs) {
    return [new Vector3(Math.cos(inputs[0]), Math.sin(inputs[0]), 0)];
  }
}