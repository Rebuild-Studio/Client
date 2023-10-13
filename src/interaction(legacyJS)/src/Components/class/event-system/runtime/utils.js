import { KeyFormat } from "../NodeControl";

export function raycastFormat(type) {
  return `__Interaction__${type}__`;
}

export function generateKeyFormat(key = "", type) {
  try {
    const format = KeyFormat.options.get(type);
    return format + key;
  } catch {
    console.warn(`${type} is not defined to generate key format`);
  }
  return key;
}

export function extractKeyFormat(key = "", type) {
  try {
    const format = KeyFormat.options.get(type);
    if (key.startsWith(format)) {
      return key.substring(format.length);
    } else {
      console.warn(`cannot extract key from ${key}`);
    }
  } catch {
    console.warn(`cannot extract key from ${key}`);
  }
  return key;
}
