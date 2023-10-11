import { Vector3 } from "three";

export default class NodeRuntime {
  constructor(args) {
    const { node, processes } = args;
    this.node = node;
    this.data = {};
    this.initControl(this.node.control);
    this.initReference(this.node.referenceParameter);
    this.inputs = {};
    this.error = undefined;
    this.done = false;

    this.dataKeys = Object.keys(this.data);
    this.inputKeys = Object.keys(this.node.inputSockets.sockets);
    this.outputKeys = Object.keys(this.node.outputSockets.sockets);

    this.alreadyRead = -1;

    this.processes = [];
    this.initProcesses(processes);
  }
  //public methods
  readValueIndex(index) {
    this.readValue(this.inputKeys[index]);
  }
  writeValueIndex(index, value) {
    this.writeValue(this.outputKeys[index], value);
  }
  readValue(key, index) {
    try {
      if (this.alreadyRead >= index) {
        return;
      }
      this.inputs[key] = this.node.inputSockets.readValue(key);
      this.alreadyRead = index;
    } catch (e) {
      if (e.message === "not ready") {
        throw e;
      } else {
        this.setError(`NodeRuntime : InputSocket ${key} is not defined.`);
      }
    }
  }
  writeValue(key, value) {
    try {
      this.node.outputSockets.setValue(key, value);
    } catch (e) {
      this.setError(`NodeRuntime : OutputSocket ${key} is not defined.`);
    }
  }
  setInputDefaultValueAll(value) {
    this.inputKeys.forEach((key) => {
      this.setInputDefaultValue(key, value);
    });
  }
  setOutputDefaultValueAll(value) {
    this.outputKeys.forEach((key) => {
      this.setOutputDefaultValue(key, value);
    });
  }
  setInputDefaultValueIndex(index, value) {
    this.setInputDefaultValue(this.inputKeys[index], value);
  }
  setOutputDefaultValueIndex(index, value) {
    this.setOutputDefaultValue(this.outputKeys[index], value);
  }
  setInputDefaultValue(key, value) {
    this.node.inputSockets.setDefaultValue(key, value);
  }
  setOutputDefaultValue(key, value) {
    this.node.outputSockets.setDefaultValue(key, value);
  }
  setError(error, verbose = true) {
    this.error = error;
    this.node.outputSockets.setError(error);
    if (verbose) {
      console.warn(this.error);
      console.warn(`NodeRuntime ${this.node.uuid} is disabled.`);
    }
    return this.error;
  }
  setDone(done) {
    this.done = done;
    this.node.outputSockets.setReady(done);
  }
  getDone() {
    return this.error || this.done;
  }
  //private methods
  //Temp init - before fix typo defaultValue value
  initControl(data) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this.data[key] = value.value;
        if (this.data[key]?.isVector3) {
          this.data[key] = new Vector3().copy(this.data[key]);
        }
      });
    }
  }
  initReference(data) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this.data[key] = value.defaultValue;
        if (this.data[key]?.isVector3) {
          this.data[key] = new Vector3().copy(this.data[key]);
        }
      });
    }
  }
  initProcesses(processes) {
    processes.forEach((Process) => {
      this.processes.push(new Process(this));
    });
  }
  onStart() {
    if (this.error) {
      return;
    }
    this.processes.forEach((process) => {
      process.start();
    });
  }
  onEnd() {
    if (this.error) {
      return;
    }
    this.processes.forEach((process) => {
      process.end();
    });
  }
  onUpdate(state, delta, xrFrame) {
    //return true : don't try updating this node in fixedUpdate.
    if (this.getDone()) {
      return true;
    }
    try {
      this.readValues();
    } catch (e) {
      return false;
    }
    if (this.error) {
      return true;
    }
    this.work(state, delta, xrFrame);
    this.setDone(true);
    return true;
  }
  work(state, delta, xrFrame) {
    this.processes.forEach((process) => {
      process.work(state, delta, xrFrame);
    });
  }
  readValues() {
    this.inputKeys.forEach((key, index) => {
      this.readValue(key, index);
    });
    this.alreadyRead = -1;
  }
}
