import { Vector3, Color } from "three";
import { ControlType } from "./NodeControl";

export const NodeData = {
  default: {
    inputSocket: [],
    outputSocket: [],
  },
  // Animation: {
  //   inputSocket: [
  //     {
  //       name: "time",
  //       type: ControlType.Number,
  //       reference: {
  //         name: "NODE_DAT_ANIMATION_TIME_SCALE",
  //         defaultValue: 0,
  //         type: "Number",
  //         tooltipMessage:
  //           "애니메이션의 속도를 설정합니다. 0 ~ 1 사이의 값으로 설정합니다.",
  //       },
  //     },
  //     {
  //       name: "loop",
  //       type: ControlType.Boolean,
  //       reference: {
  //         name: "NODE_DAT_ANIMATION_LOOP",
  //         defaultValue: true,
  //         type: "Boolean",
  //         tooltipMessage: "애니메이션을 반복할것인지 설정합니다. 참/거짓",
  //       },
  //     },
  //   ],
  //   outputSocket: [],
  //   control: [
  //     {
  //       name: "object",
  //       value: undefined, // 3D Canvas에서 가져온 object의 uuid를 활용하여 Node의 title에 표시
  //       type: ControlType.Object,
  //       IsDropdown: true,
  //       extras: "오브젝트",
  //     },
  //     {
  //       name: "animation",
  //       value: [],
  //       type: ControlType.Animation,
  //     },
  //   ],
  // },

  Asset: {
    inputSocket: [],
    outputSocket: [
      {
        name: "에셋 명",
        type: ControlType.String,
        reference: {
          name: "NODE_DAT_STRING",
          defaultValue: "hohoho",
          type: "String",
          tooltipMessage: "에셋 파일 이름을 작성하세요(확장자 제외)",
        },
      },
    ],
    control: [],
  },

  // Function: {
  //   inputSocket: [],
  //   outputSocket: [],
  //   control: [
  //     {
  //       name: "function",
  //       value: undefined,
  //       type: ControlType.Function,
  //       IsDropdown: true,
  //       extras: "함수",
  //     },
  //   ],
  // },
  // Convert: {
  //   inputSocket: [],
  //   outputSocket: [],
  //   control: [
  //     {
  //       name: "convert",
  //       value: undefined,
  //       type: ControlType.Convert,
  //     },
  //   ],
  // },

  // Keyboard: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   referenceParameter: [
  //     {
  //       name: "NODE_DAT_KEYBOARD_KEY",
  //       defaultValue: "input",
  //       type: "KeyboardInput",
  //       tooltipMessage: "입력 받을 키를 입력해주십시오.",
  //     },
  //     {
  //       name: "NODE_DAT_KEYBOARD_ACTION",
  //       defaultValue: "spot",
  //       type: "KeyboardAction",
  //       tooltipMessage: "키보드 액션 형태를 선택해 주십시오.",
  //     },
  //   ],
  //   // control: [
  //   //   {
  //   //     name: "NODE_DAT_KEY",
  //   //     value: "",
  //   //     type: ControlType.Key,
  //   //   },
  //   //   {
  //   //     name: "NODE_DAT_HOLD",
  //   //     value: "Spot",
  //   //     type: ControlType.Action,
  //   //     label: true,
  //   //   },
  //   // ],
  // },

  // Mouse: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "NODE_DAT_HOLD",
  //       value: "Spot",
  //       type: ControlType.Action,
  //       label: true,
  //     },
  //     {
  //       name: "NODE_DAT_MOUSE_BUTTON_TYPE",
  //       value: undefined,
  //       type: ControlType.Mouse,
  //       label: true,
  //       IsDropdown: true,
  //       extras: "마우스 버튼",
  //     },
  //     {
  //       name: "object",
  //       value: undefined,
  //       type: ControlType.Object,
  //       IsDropdown: true,
  //       extras: "오브젝트",
  //     },
  //   ],
  // },
  // MousePosition: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  // },

  // MouseRaycast: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "object",
  //       value: undefined,
  //       type: ControlType.Object,
  //     },
  //     {
  //       name: "NODE_DAT_HOLD",
  //       value: "Spot",
  //       type: ControlType.Action,
  //       label: true,
  //     },
  //   ],
  // },

  // Start: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  // },

  // Timer: {
  //   inputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //     {
  //       name: "delay",
  //       type: ControlType.Number,
  //       reference: {
  //         name: "NODE_DAT_TIMER_DELAY",
  //         defaultValue: 0,
  //         type: "Number",
  //         tooltipMessage: "시작 이후 얼마 뒤에 타이머가 시작될지 설정합니다.",
  //       },
  //     },
  //     {
  //       name: "duration",
  //       type: ControlType.Number,
  //       reference: {
  //         name: "NODE_DAT_TIMER_DELAY_DURATION",
  //         defaultValue: 0,
  //         type: "Number",
  //         tooltipMessage: "얼마 동안 타이머가 활성화될지 설정합니다.",
  //       },
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   // control: [
  //   //   {
  //   //     name: "NODE_DAT_TIMER_DELAY",
  //   //     value: 1,
  //   //     type: ControlType.Number,
  //   //     label: true,
  //   //     extras: {
  //   //       min: 0,
  //   //     },
  //   //   },
  //   //   {
  //   //     name: "NODE_DAT_TIMER_DURATION",
  //   //     value: 0,
  //   //     type: ControlType.Number,
  //   //     label: true,
  //   //     extras: {
  //   //       min: 0,
  //   //     },
  //   //   },
  //   // ],
  // },
  Changed: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Boolean,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Boolean,
      },
    ],
  },

  // LogicGate: {
  //   inputSocket: [
  //     {
  //       name: "booleanFirst",
  //       type: ControlType.Boolean,
  //     },
  //     {
  //       name: "booleanSecond",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "boolean",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "LogicGate",
  //       value: "And",
  //       type: ControlType.LogicGate,
  //       IsDropdown: true,
  //     },
  //   ],
  // },


  // Compare: {
  //   inputSocket: [
  //     {
  //       name: "numberFirst",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "numberSecond",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "boolean",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "NODE_DAT_COMPARE_OPERATOR",
  //       value: "==",
  //       type: ControlType.Compare,
  //       IsDropdown: true,
  //     },
  //   ],
  // },

  // Equal: {
  //   inputSocket: [
  //     {
  //       name: "numberFirst",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "numberSecond",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "boolean",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  // },


  // MathSymbol: {
  //   inputSocket: [
  //     {
  //       name: "number",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "number",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "symbol",
  //       value: "SquareRoot",
  //       type: ControlType.MathSymbol,
  //       IsDropdown: true,
  //     },
  //   ],
  // },

  // Vector3Calculation: {
  //   inputSocket: [
  //     {
  //       name: "vector3First",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "vector3Second",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "vector3",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "vectorCalculation",
  //       value: "Plus",
  //       type: ControlType.Vector3Calculation,
  //       IsDropdown: true,
  //     },
  //   ],
  // },

  // Vector3Compare: {
  //   inputSocket: [
  //     {
  //       name: "vector3First",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "vector3Second",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "vector3",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "NODE_DAT_COMPARE_OPERATOR",
  //       value: "=",
  //       type: ControlType.Vector3Compare,
  //       IsDropdown: true,
  //     },
  //   ],
  // },

  // Calculation: {
  //   inputSocket: [
  //     {
  //       name: "numberFirst",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "numberSecond",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "number",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "calculation",
  //       value: "Plus",
  //       type: ControlType.Calculation,
  //       IsDropdown: true,
  //     },
  //   ],
  // },

  AdvancedCalculation: {
    inputSocket: [
      {
        name: "number",
        type: ControlType.Number,
      },
    ],
    outputSocket: [
      {
        name: "number",
        type: ControlType.Number,
      },
    ],
    control: [
      {
        name: "advancedCalculation",
        value: "abs",
        type: ControlType.AdvancedCalculation,
        IsDropdown: true,
      },
    ],
  },
  Map: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    control: [
      {
        name: "NODE_DAT_INPUT_MIN",
        value: 0,
        type: ControlType.Number,
      },
      {
        name: "NODE_DAT_INPUT_MAX",
        value: 1,
        type: ControlType.Number,
      },
      {
        name: "NODE_DAT_OUTPUT_MIN",
        value: -1,
        type: ControlType.Number,
      },
      {
        name: "NODE_DAT_OUTPUT_MAX",
        value: 1,
        type: ControlType.Number,
      },
      {
        name: "NODE_DAT_INVERSE",
        value: false,
        type: ControlType.Boolean,
      },
      {
        name: "NODE_DAT_BOUND",
        value: false,
        type: ControlType.Boolean,
      },
    ],
  },
  Digitize: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    control: [
      {
        name: "NODE_DAT_DIVISOR",
        value: 2,
        type: ControlType.Number,
      },
    ],
  },
  Inverse: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
  },
  // Random: {
  //   inputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //     {
  //       name: "number",
  //       type: ControlType.Number,
  //       reference: {
  //         name: "NODE_DAT_RANDOM_RANGE_MAX",
  //         defaultValue: 10,
  //         type: "Number",
  //         tooltipMessage: "0부터 최댓값 까지의 실수가 랜덤하게 출력됩니다.",
  //       },
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "random",
  //       type: ControlType.Number,
  //     },
  //   ],
  // },
  // Flag: {
  //   inputSocket: [
  //     {
  //       name: "on",
  //       type: ControlType.Boolean,
  //     },
  //     {
  //       name: "off",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "signal",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  // },
  // Counter: {
  //   inputSocket: [
  //     {
  //       name: "count_up",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "count_down",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "reset",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   outputSocket: [
  //     {
  //       name: "result",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "NODE_DAT_DEFAULT_VALUE",
  //       value: 0,
  //       type: ControlType.Number,
  //       label: true,
  //       extras: {
  //         min: -1000,
  //         max: 1000,
  //       },
  //     },
  //     {
  //       name: "NODE_DAT_COUNTER_MODE",
  //       value: "No Limit",
  //       type: ControlType.Counter,
  //       label: true,
  //     },
  //     {
  //       name: "NODE_DAT_COUNTER_RANGE",
  //       value: [0, 1000],
  //       type: ControlType.Range,
  //       label: true,
  //     },
  //     {
  //       name: "NODE_DAT_COUNTER_TIMING",
  //       value: 0,
  //       type: ControlType.Number,
  //       label: true,
  //     },
  //   ],
  // },
  PositionToAngle: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Vector3,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
  },
  AngleToPosition: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Vector3,
      },
    ],
  },
  AngleDifference: {
    inputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
    outputSocket: [
      {
        name: "",
        type: ControlType.Number,
      },
    ],
  },

  // Object: {
  //   inputSocket: [
  //     {
  //       name: "asset",
  //       type: ControlType.String,
  //     },
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "rotation",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "scale",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "visible",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   outputSocket: [],
  //   control: [
  //     {
  //       name: "object",
  //       value: undefined, // 3D Canvas에서 가져온 object의 uuid를 활용하여 Node의 title에 표시
  //       type: ControlType.Object,
  //       IsDropdown: true,
  //       extras: "오브젝트",
  //     },
  //     // {
  //     //   name: "material",
  //     //   value: [],
  //     //   type: ControlType.Material,
  //     // },
  //     // {
  //     //   name: "animation",
  //     //   value: [],
  //     //   type: ControlType.Animation,
  //     // },
  //   ],
  // },
  // PointLight: {
  //   inputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "color",
  //       type: ControlType.Color,
  //     },
  //     {
  //       name: "intensity",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "softness",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "resolution",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "blur",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "visible",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   outputSocket: [],
  //   control: [
  //     {
  //       name: "light",
  //       value: undefined,
  //       type: ControlType.PointLight,
  //       IsDropdown: true,
  //       extras: "포인트 라이트",
  //     },
  //   ],
  // },
  // SpotLight: {
  //   inputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "rotation",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "color",
  //       type: ControlType.Color,
  //     },
  //     {
  //       name: "intensity",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "softness",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "resolution",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "blur",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "coneangle",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "penumbra",
  //       type: ControlType.Number,
  //     },
  //     // {
  //     //   name: "decay",
  //     //   type: ControlType.Number,
  //     // },
  //     {
  //       name: "visible",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   outputSocket: [],
  //   control: [
  //     {
  //       name: "light",
  //       value: undefined,
  //       type: ControlType.SpotLight,
  //       IsDropdown: true,
  //       extras: "스포트 라이트",
  //     },
  //   ],
  // },
  // Camera: {
  //   inputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "rotation",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "fov",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "near",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "far",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   outputSocket: [],
  //   control: [],
  // },
  // ObjectSensor: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "rotation",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "scale",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "object",
  //       value: undefined,
  //       type: ControlType.Object,
  //       IsDropdown: true,
  //       extras: "오브젝트",
  //     },
  //     // {
  //     //   name: "material",
  //     //   value: [],
  //     //   type: ControlType.Material,
  //     // },
  //   ],
  // },
  // PointLightSensor: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "color",
  //       type: ControlType.Color,
  //     },
  //     {
  //       name: "intensity",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "softness",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "resolution",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "blur",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "visible",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "light",
  //       value: undefined,
  //       type: ControlType.PointLight,
  //       IsDropdown: true,
  //       extras: "포인트 라이트",
  //     },
  //   ],
  // },
  // SpotLightSensor: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "rotation",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "color",
  //       type: ControlType.Color,
  //     },
  //     {
  //       name: "intensity",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "softness",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "resolution",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "blur",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "coneangle",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "penumbra",
  //       type: ControlType.Number,
  //     },
  //     // {
  //     //   name: "decay",
  //     //   type: ControlType.Number,
  //     // },
  //     {
  //       name: "visible",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "light",
  //       value: undefined,
  //       type: ControlType.SpotLight,
  //       IsDropdown: true,
  //       extras: "스포트 라이트",
  //     },
  //   ],
  // },
  // CameraSensor: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "position",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "rotation",
  //       type: ControlType.Vector3,
  //     },
  //     {
  //       name: "fov",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "near",
  //       type: ControlType.Number,
  //     },
  //     {
  //       name: "far",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   control: [],
  // },
  // ConstNumber: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "number",
  //       type: ControlType.Number,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "number",
  //       value: 0,
  //       type: ControlType.Number,
  //       tooltip: "출력하고자하는 값을 설정해주세요.",
  //     },
  //   ],
  // },
  // ConstColor: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "color",
  //       type: ControlType.Color,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "color",
  //       value: new Color(),
  //       type: ControlType.Color,
  //       tooltip: "출력하고자하는 값을 설정해주세요.",
  //     },
  //   ],
  // },
  // ConstBoolean: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "boolean",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "boolean",
  //       value: false,
  //       type: ControlType.Boolean,
  //       tooltip: "출력하고자하는 값을 설정해주세요.",
  //     },
  //   ],
  // },
  // ConstVector3: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "vector3",
  //       type: ControlType.Vector3,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "vector3",
  //       value: new Vector3(0, 0, 0),
  //       type: ControlType.Vector3,
  //       tooltip: "출력하고자하는 값을 설정해주세요.",
  //     },
  //   ],
  // },

  // VariableNumber: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "number",
  //       type: ControlType.Number,
  //       reference: {
  //         name: "NODE_DAT_NUMBER",
  //         defaultValue: 0,
  //         type: "Number",
  //         tooltipMessage: "출력하고자하는 숫자를 설정해주세요",
  //       },
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "uxSelector",
  //       value: "",
  //       type: ControlType.String,
  //       IsUxSelector: true,
  //     },
  //   ],
  // },

  // VariableBoolean: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "boolean",
  //       type: ControlType.Boolean,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "boolean",
  //       value: true,
  //       type: ControlType.Boolean,
  //       tooltip: "출력하고자하는 값을 설정해주세요.",
  //     },
  //   ],
  // },

  // VariableString: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "string",
  //       type: ControlType.String,
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "string",
  //       value: "",
  //       type: ControlType.String,
  //       tooltip: "출력하고자하는 값을 설정해주세요.",
  //     },
  //   ],
  // },

  // MeshPhysicalMaterial: {
  //   inputSocket: [],
  //   outputSocket: [
  //     {
  //       name: "material",
  //       type: ControlType.Material,
  //       reference: {
  //         name: "NODE_DAT_MATERIAL",
  //         defaultValue: 0,
  //         type: "Material",
  //         tooltipMessage: "출력하고자하는 머터리얼을 설정해주세요",
  //       },
  //     },
  //   ],
  //   control: [
  //     {
  //       name: "NODE_DAT_COMPOSE",
  //       value: undefined,
  //       type: ControlType.Compose,
  //     },
  //   ],
  // },
  MaterialTemplate: {
    inputSocket: [],
    outputSocket: [
      {
        name: "material template",
        type: ControlType.Number,
      },
    ],
    control: [
      {
        name: "NODE_DAT_MATERIAL_TEMPLATE",
        value: 0,
        type: ControlType.MaterialTemplate,
      },
    ],
  },
};
