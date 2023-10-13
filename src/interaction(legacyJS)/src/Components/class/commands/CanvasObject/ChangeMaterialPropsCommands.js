//prettier-ignore
export default class ChangeMaterialPropsCommands {
    constructor(metaObject, prop,materialUuid, currentValue, newValue) {
      this.type = " ChangeMaterialPropsCommand";
      this.name = "Material"+"_"+prop;
      this.metaObject = metaObject;
      this.prop=prop
      this.materialUuid = materialUuid;
      this.currentValue = currentValue;
      this.newValue = newValue;
    }
  
    execute() {
      this.metaObject.SetMaterialProps(this.materialUuid , this.prop, this.newValue);
    }
  
    undo() {
      this.metaObject.SetMaterialProps(this.materialUuid , this.prop, this.currentValue);
    }
  }
