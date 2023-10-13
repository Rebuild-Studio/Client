//prettier-ignore
export default class AnimationToggleOffCommand {
  constructor(metaObject, name, currentValue, newValue) {
    this.type = " AnimationToggleCommand";
    this.name = name+" 애니메이션끔";
    this.metaObject = metaObject;
    this.prop = "Animation";
    this.currentValue = currentValue;
    this.newValue = newValue;
    
  }

  execute() {
    this.metaObject.SetProps(this.prop, this.newValue);
  }

  undo() {
    this.metaObject.SetProps(this.prop, this.currentValue);
  }
}
