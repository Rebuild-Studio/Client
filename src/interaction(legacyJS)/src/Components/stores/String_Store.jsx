import { makeAutoObservable } from "mobx";
import { debugJson } from "../views/02. Studio/04. EventPanel/data/Data";
import * as Utils from "../class/event-system/utils";

export default class StringStore {
  strings = {};
  nodeNameStrings = {};

  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  //load된 json에서 key(string)에 해당하는 value(string)을 찾아 리턴
  //key가 string이 아니면 key를 그대로 리턴
  //json에 해당하는 value가 없을 경우 key를 그대로 리턴
  //TODO : Default Json (영어?)를 두고 value를 못 찾을 때 사용할 수 있도록.
  string(key) {
    if (typeof key !== "string") {
      return key;
    }

    // "Default"로 시작하여 "NodeName"으로 끝나는 key는 nodeNameStrings에서 추가
    if (/^Default.*NodeName/.test(key) || /[가-힣]/.test(key)) {
      // 한글이 포함된 key(노드 이름 바꿀 때 사이드 이펙트 <- 수정 필요)는 console.warn 동작하지 않도록.
      const ret = this.strings[key];
      if (typeof ret === "undefined") {
        return key;
      }
      return ret;
    } else {
      const ret = this.strings[key];
      if (typeof ret === "undefined") {
        console.warn(
          `string store can not find string for ${key} in current language`
        );
        this.addString(key);
        return key;
      }
      return ret;
    }
  }

  addString(key) {
    this.strings[key] = key;
  }

  convert(key, args) {
    const initial = this.string(key);
    const data = args;

    return data.reduce((a, c, i) => {
      const replacer = Utils.isCryptString(c)
        ? this.string(Utils.decryptString(c))
        : c;
      const ret = a.replace(Utils.templateArg(i), replacer);
      return ret;
    }, initial);
  }

  convertToSpans(key, args, defaultSpanStyle, spanStyles) {
    const initial = this.string(key);
    const data = args;
    const spans = [];
    const t = Utils.templateArg("");

    function getSpan(string, getSpanDefaultSpanStyle) {
      let p = 0;
      let iter = 0;
      const maxIter = 2 * data.length + 1;
      while (p !== -1 && iter < maxIter) {
        const newP = string.indexOf(t, p);
        if (newP === -1) {
          const newSpan = (
            <span key={`span-${string}`} style={getSpanDefaultSpanStyle}>
              {string.slice(p)}
            </span>
          );
          spans.push(newSpan);
          p = newP;
        } else {
          const prev = string.slice(p, newP);
          if (prev.length) {
            const newSpan = (
              <span key={`span-${string}`} style={getSpanDefaultSpanStyle}>
                {prev}
              </span>
            );
            spans.push(newSpan);
          }
          const argIndex = Number(string.at(newP + t.length));
          const c = data[argIndex];
          const replacer = Utils.isCryptString(c)
            ? this.string(Utils.decryptString(c))
            : c;
          getSpan(replacer, spanStyles[argIndex]);
          p = newP + t.length + argIndex.toString().length;
        }
        iter++;
      }
    }

    getSpan(initial, defaultSpanStyle);
    return spans;
  }

  load() {
    this.parse(debugJson);
  }

  parse(json) {
    this.strings = JSON.parse(json);
  }
}
