//prettier-ignore
export default class ChangePropsSliderCommand {
  constructor(metaObject, name,prop, currentValue, newValue) {
    this.type = " ChangePropsSliderCommand";
    this.name = name
    this.metaObject = metaObject;
    this.prop = prop;
    this.currentValue = currentValue;
    this.newValue = newValue;
  }

  execute() {
    console.log(this.prop)
    this.metaObject.SetProps(this.prop, this.newValue);
  }

  undo() {
    this.metaObject.SetProps(this.prop, this.currentValue);
  }
}
