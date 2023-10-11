import * as THREE from "three";
import { ControlType } from "./NodeControl";

//Json Utils
export function stringify(data) {
  return JSON.stringify(data);
}

export function parse(json) {
  return JSON.parse(json, reviver);
}

export function copy(data) {
  return parse(stringify(data));
}

//String Utils
const crypter = "__STRING__KEY__";

export function encryptString(string) {
  return crypter + string;
}

export function isCryptString(string) {
  return typeof string === "string" && string.includes(crypter);
}

export function decryptString(string) {
  return string.replace(crypter, "");
}

export function templateArg(index) {
  return "__ARG__" + index;
}

function reviver(_, value) {
  if (!value) {
    return value;
  } else if (value.isVector3) {
    return new THREE.Vector3().copy(value);
  } else if (value.type === ControlType.Color) {
    const ret = {};
    Object.assign(ret, value);
    ret.value = new THREE.Color(value.value);
    return ret;
  } else {
    return value;
  }
}
