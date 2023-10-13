export default class NodeProcess {
  constructor(nodeRuntime, dataKeys, inputKeys, outputKeys) {
    this.nodeRuntime = nodeRuntime;
    this.dataKeys = dataKeys ? dataKeys : nodeRuntime.dataKeys;
    this.inputKeys = inputKeys ? inputKeys : nodeRuntime.inputKeys;
    this.outputKeys = outputKeys ? outputKeys : nodeRuntime.outputKeys;

    this.data = this.nodeRuntime.data;
    this.inputs = {};
    this.outputs = {};
  }
  setError(error) {
    this.nodeRuntime.setError(error);
  }
  start() { }
  work(state, delta, xrFrame) {
    this.readValues();
    if (!this.changed) {
      return;
    }
    this.coreWork(state, delta, xrFrame);
    this.writeValues();
  }
  coreWork() { }
  end() { }

  Inputs() {
    return Object.values(this.inputs);
  }
  Data() {
    return Object.values(this.data);
  }
  Outputs(values, instantUpdate) {
    values.forEach((value, index)=>{
      this.Output(index, value);
    });
    if(instantUpdate){
      this.writeValues();
    }
  }
  Input(index) {
    return this.inputs[this.inputKeys[index]];
  }
  Datum(index) {
    return this.data[this.dataKeys[index]];
  }
  Output(index, value) {
    this.outputs[this.outputKeys[index]] = value;
  }
  readValues() {
    this.changed = false;
    for (const key of this.inputKeys) {
      const read = this.nodeRuntime.inputs[key];
      this.changed = this.changed || read.changed;
      this.inputs[key] = read.value;
    }
  }
  writeValues() {
    for (const key of this.outputKeys) {
      const write = this.outputs[key];
      this.nodeRuntime.writeValue(key, write);
    }
  }
}