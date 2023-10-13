//prettier-ignore
export default class ChangeLightPropsCommands {
  constructor(metaObject, prop,currentValue, newValue) {
    this.type = " ChangeMaterialPropsCommand";
    this.name = "Light"+"_"+prop;
    this.metaObject = metaObject;
    this.prop=prop
    this.currentValue = currentValue;
    this.newValue = newValue;
  }

  execute() {
    this.metaObject.SetProps( this.prop, this.newValue);
  }

  undo() {
    this.metaObject.SetProps(this.prop, this.currentValue);
  }
}
