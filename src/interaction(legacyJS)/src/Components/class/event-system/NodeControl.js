/*control
name (string) : the name key of data, unique in a node
type (ControlType) : the type of data
value (various types) : the value of data
label (boolean) : if true, show the label of the control
IsDropdown (boolean)
  true : the control will be dropdown header
  false : the control will be in setting dialog
*/
export const ControlType = Object.freeze({
  Animation: "Animation",
  Boolean: "Boolean",
  Color: "Color",
  Number: "Number",
  Vector3: "Vector3",
  Material: "Material",
  MaterialTemplate: "MaterialTemplate",
  Compose: "Compose",
  Object: "Object",
  Sensor: "Sensor",
  PointLight: "PointLight",
  SpotLight: "SpotLight",
  Camera: "Camera",
  String: "String",
  Key: "Key",
  LogicGate: "LogicGate",
  Convert: "Convert",
  Vector3Compare: "Vector3Compare",
  Compare: "Compare",
  Vector3Calculation: "Vector3Calculation",
  Calculation: "Calculation",
  AdvancedCalculation: "AdvancedCalculation",
  MathSymbol: "MathSymbol",
  Action: "Action",
  Counter: "Counter",
  Range: "Range",
  Mouse: "Mouse",
  Function: "Function",
  Asset: "Asset",
  Sound: "Sound",
});
export class LogicGate {
  static options = ["And", "Or", "Xor", "NOT", "NAND", "XNOR", "NOR"];
}

export class Vector3Compare {
  static options = ["=", "≠"];
}

export class Compare {
  static options = ["==", ">", "<", "=>", "<=", "<>"];
}

export class Compose {
  static options = ["compose", "decompose"];
}

export class Counter {
  static options = ["No Limit", "Range", "Loop", "Bounce"];
}

export class Vector3Calculation {
  static options = ["Plus", "Minus", "Divide", "Multiple"];
}

export class Calculation {
  static options = ["Plus", "Minus", "Divide", "Multiple"];
}

export class AdvancedCalculation {
  static options = ["Abs", "Sqrt"];
}
export class Mouse {
  static options = ["LeftButton", "RightButton", "WheelButton"];
}

export class Convert {
  static options = new Map()
    .set(ControlType.Boolean, {
      list: [ControlType.Number],
      map: new Map().set(ControlType.Number, "BooleanToNumber"),
    })
    .set(ControlType.Color, {
      list: [ControlType.Number],
      map: new Map().set(ControlType.Number, "ColorToNumber"),
    })
    .set(ControlType.Number, {
      list: [ControlType.Boolean, ControlType.Vector3, ControlType.Color],
      map: new Map()
        .set(ControlType.Boolean, "NumberToBoolean")
        .set(ControlType.Vector3, "NumberToVector3")
        .set(ControlType.Color, "NumberToColor"),
    })
    .set(ControlType.Vector3, {
      list: [ControlType.Number],
      map: new Map().set(ControlType.Number, "Vector3ToNumber"),
    })
    .set("", { list: [""], map: new Map().set("", undefined) });
}

export class MathSymbol {
  static options = ["SquareRoot", "Absolute"];
}

export class Action {
  static options = ["Spot", "Hold"];
}

export class ControlSocket {
  // control type > node type > control value > get socket data
  static options = {
    Convert: {
      Convert: {
        BooleanToNumber: {
          inputSocket: [
            {
              name: "boolean",
              type: ControlType.Boolean,
            },
          ],
          outputSocket: [
            {
              name: "number",
              type: ControlType.Number,
            },
          ],
        },
        ColorToNumber: {
          inputSocket: [
            {
              name: "color",
              type: ControlType.Color,
            },
          ],
          outputSocket: [
            {
              name: "r",
              type: ControlType.Number,
            },
            {
              name: "g",
              type: ControlType.Number,
            },
            {
              name: "b",
              type: ControlType.Number,
            },
          ],
        },
        NumberToBoolean: {
          inputSocket: [
            {
              name: "number",
              type: ControlType.Number,
            },
          ],
          outputSocket: [
            {
              name: "boolean",
              type: ControlType.Boolean,
            },
          ],
        },
        NumberToVector3: {
          inputSocket: [
            {
              name: "x",
              type: ControlType.Number,
            },
            {
              name: "y",
              type: ControlType.Number,
            },
            {
              name: "z",
              type: ControlType.Number,
            },
          ],
          outputSocket: [
            {
              name: "vector3",
              type: ControlType.Vector3,
            },
          ],
        },
        NumberToColor: {
          inputSocket: [
            {
              name: "r",
              type: ControlType.Number,
            },
            {
              name: "g",
              type: ControlType.Number,
            },
            {
              name: "b",
              type: ControlType.Number,
            },
          ],
          outputSocket: [
            {
              name: "color",
              type: ControlType.Color,
            },
          ],
        },
        Vector3ToNumber: {
          inputSocket: [
            {
              name: "vector3",
              type: ControlType.Vector3,
            },
          ],
          outputSocket: [
            {
              name: "x",
              type: ControlType.Number,
            },
            {
              name: "y",
              type: ControlType.Number,
            },
            {
              name: "z",
              type: ControlType.Number,
            },
          ],
        },
      },
    },
    Compose: {
      MeshPhysicalMaterial: {
        compose: {
          inputSocket: [
            {
              name: "material template",
              type: ControlType.Number,
            },
            {
              name: "color",
              type: ControlType.Color,
            },
            {
              name: "metalness",
              type: ControlType.Number,
            },
            {
              name: "roughness",
              type: ControlType.Number,
            },
            {
              name: "ior",
              type: ControlType.Number,
            },
            {
              name: "opacity",
              type: ControlType.Number,
            },
          ],
          outputSocket: [
            {
              name: "material",
              type: ControlType.Material,
            },
          ],
        },
        decompose: {
          inputSocket: [
            {
              name: "material",
              type: ControlType.Material,
            },
          ],
          outputSocket: [
            {
              name: "material template",
              type: ControlType.Number,
            },
            {
              name: "color",
              type: ControlType.Color,
            },
            {
              name: "metalness",
              type: ControlType.Number,
            },
            {
              name: "roughness",
              type: ControlType.Number,
            },
            {
              name: "ior",
              type: ControlType.Number,
            },
            {
              name: "opacity",
              type: ControlType.Number,
            },
          ],
        },
      },
    },
  };
}

export class Sound {
  // public/sound/에 있는 파일들
  static options = ["duck-quack", "splash", "street-drumloop-85bpm"];
}

export const NodeControl = {
  Sound: Sound,
  Vector3Compare: Vector3Compare,
  Compare: Compare,
  Compose: Compose,
  Vector3Calculation: Vector3Calculation,
  Calculation: Calculation,
  Convert: Convert,
  MathSymbol: MathSymbol,
  LogicGate: LogicGate,
  Action: Action,
  Mouse: Mouse,
  Counter: Counter,
};

export class KeyFormat {
  static options = new Map()
    .set(ControlType.Material, `__${ControlType.Material}__`)
    .set(ControlType.Animation, `__${ControlType.Animation}__`);
}
