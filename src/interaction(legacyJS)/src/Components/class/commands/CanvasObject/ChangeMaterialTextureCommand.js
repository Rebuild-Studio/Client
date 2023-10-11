//prettier-ignore
export default class ChangeMaterialTextureCommand {
  constructor(metaObject, materialUuid, currentValue, newValue) {
    this.type = " ChangeMaterialTextureCommand";
    this.name = "재질 변환";
    this.metaObject = metaObject;
    this.materialUuid = materialUuid;
    this.currentValue = currentValue;
    this.newValue = newValue;
  }

  execute() {
    this.metaObject.SetMaterialProps(this.materialUuid , "Template", this.newValue);
  }

  undo() {
    this.metaObject.SetMaterialProps(this.materialUuid , "Template", this.currentValue);
  }
}
