export default class OutputSocketRuntimes {
  constructor(sockets) {
    this.error = undefined;
    this.sockets = {};
    this.ready = false;
    for (const [key, value] of Object.entries(sockets)) {
      this.sockets[key] = {
        uuid: value.uuid,
        type: value.type,
        value: undefined,
        defaultValue: undefined,
        refs: value.wires.length,
        currentRefs: 0,
        wires: value.wires,
      };
    }
  }
  setError(error) {
    this.error = error;
  }
  setValue(name, value) {
    //set value after node logics
    this.sockets[name].value = value;
    this.sockets[name].currentRefs = this.sockets[name].refs;
  }
  setReady(ready) {
    this.ready = ready;
  }
  setDefaultValue(name, value) {
    this.sockets[name].defaultValue = value;
    this.sockets[name].value = value;
  }
  giveValue(name) {
    //give value to input sockets
    if (this.error) {
      throw Error("disabled");
    }
    if (!this.ready) {
      throw Error("not ready");
    }
    const value = this.sockets[name].value;
    if (this.sockets[name].currentRefs > 0) {
      this.sockets[name].currentRefs--;
      if (
        this.sockets[name].currentRefs === 0 &&
        typeof this.sockets[name].defaultValue !== "undefined"
      ) {
        this.sockets[name].value = this.sockets[name].defaultValue;
      }
    }
    return value;
  }
  getName(uuid) {
    for (const [key, value] of Object.entries(this.sockets)) {
      if (value.uuid === uuid) {
        return key;
      }
    }
  }
  isConnected(name) {
    return this.sockets[name].wires.length > 0;
  }
}
