import * as Utils from "../../../../class/event-system/utils";

export const ComponentEnum = Object.freeze({
  // 현규 - 노드
  SOUND: "Sound",

  // 준만 - 에셋
  ASSET: "Asset",

  //중선 - API리스너
  ANIMATION: "Animation",

  // 입력
  MOUSE: "Mouse",
  KEYBOARD: "Keyboard",
  MOUSESPOT: "MouseSpot",
  MOUSEHOLD: "MouseHold",
  MOUSEPOSITION: "MousePosition",
  MOUSERAYCAST: "MouseRaycast",

  // 처리
  // // 연산
  MATHSYMBOL: "MathSymbol",
  VECTOR3_CALCULATION: "Vector3Calculation",
  CALCULATION: "Calculation",
  PLUS: "Plus",
  MINUS: "Minus",
  MULTIPLE: "Multiple",
  DIVIDE: "Divide",
  // // 비교
  VECTOR3_COMPARE: "Vector3Compare",
  COMPARE: "Compare",
  GREATER: "Greater",
  LESS: "Less",
  EQUAL: "Equal",
  // // 논리
  LOGICGATE: "LogicGate",
  AND: "And",
  OR: "Or",
  NOT: "Not",
  XOR: "Xor",
  // // 변환
  CONVERT: "Convert",
  NUMtoVECTOR3: "NumToVector3",
  NUMtoBOOL: "NumToBool",
  BOOLtoNUM: "BoolToNum",
  VECTOR3toNUM: "Vector3ToNum",

  // 시간
  TIMER: "Timer",
  START: "Start",

  // 오브젝트
  CAMERA: "Camera",
  LIGHT: "Light",
  POINT_LIGHT: "PointLight",
  SPOT_LIGHT: "SpotLight",
  OBJECT: "Object",

  // 네트워크
  ONJOIN: "OnJoin",
  ONLEAVE: "OnLeave",
  SENDBOOLMSG: "SendBoolMsg",
  SENDNUMMSG: "SendNumMsg",
  SENDVECTOR3MSG: "SendVec3Msg",
  RECEIVEBOOLMSG: "ReceiveBoolMsg",
  RECEIVENUMMSG: "ReceiveNumMsg",
  RECEIVEVECTOR3MSG: "ReceiveVec3Msg",

  // 센서
  SENSORPOS: "PositionSensor",
  SENSORROT: "RotationSensor",
  SENSORSCALE: "ScaleSensor",
  CAMERASENSOR: "CameraSensor",
  POINT_LIGHTSENSOR: "PointLightSensor",
  SPOT_LIGHTSENSOR: "SpotLightSensor",
  OBJECTSENSOR: "ObjectSensor",

  // 상수
  CONSTNUM: "ConstNumber",
  CONSTBOOL: "ConstBoolean",
  CONSTVEC3: "ConstVector3",
  CONSTCOLOR: "ConstColor",
  PHYSICALMATERIAL: "MeshPhysicalMaterial",
  MATERIALTEMPLATE: "MaterialTemplate",

  // 변수 - 준만
  VARIABLE_NUM: "VariableNumber",
  VARIABLE_BOOL: "VariableBoolean",
  VARIABLE_STRING: "VariableString",

  // 기타
  COUNTER: "Counter",
  FLAG: "Flag",
  RANDOM: "Random",
  FUNCTION: "Function",
});

export const debugJson = Utils.stringify({
  //commands
  InitialState: "초기 상태",

  CreateSheetCommand: "시트 생성",
  DeleteSheetCommand: "시트 삭제",
  SelectSheetCommand: "시트 선택",
  SetSheetOrderCommand: "시트 순서 변경",
  HideSheetCommand: "시트 숨김",
  SetSheetNameCommand: "시트 이름 변경",

  CreateGroupCommand: "그룹 생성",
  UngroupCommand: "그룹 해체",
  SelectGroupCommand: "그룹 선택",
  UnselectGroupCommand: "그룹 선택 해제",
  CloneGroupCommand: "그룹 복제",
  DeleteGroupCommand: "그룹 삭제",
  AddSelectedGroupsPositionCommand: "그룹 이동",
  EditGroupNameCommand: "그룹 이름 변경",
  MergeGroupCommand: "그룹 병합",

  CreateNodeCommand: "노드 생성",
  DeleteSelectedNodeCommand: "노드 삭제",
  SelectNodeCommand: "노드 선택",
  UnselectNodeCommand: "노드 선택 해제",
  CloneNodeCommand: "노드 복제",
  AddSelectedNodesPositionCommand: "노드 이동",
  SetNodeDataCommand: "노드 설정 변경",
  ExcludeFromGroupCommand: "노드 추출",

  ClearSelectionCommand: "선택 해제",
  ClearSelectionInGroupCommand: "선택 해제",
  CloneNodeAndGroupCommand: "노드와 그룹 복제",
  DeleteNodeAndGroupCommand: "노드와 그룹 삭제",
  AddSelectedPositionCommand: "노드와 그룹 이동",
  MergeNodeAndGroupCommand: "노드와 그룹 병합",

  CreateWireCommand: "노드 연결",
  DeleteWireCommand: "노드 연결 해제",

  //commmand details
  InitialStateDetail: "작업을 시작했던 상태",

  CreateSheetCommandDetail: "__ARG__0 시트를 생성함",
  DeleteSheetCommandDetail: "__ARG__0 시트를 삭제함",
  SelectSheetCommandDetail: "__ARG__0 시트를 선택함",
  SetSheetOrderCommandDetail: "__ARG__0 시트의 순서를 __ARG__1번째로 바꿈",
  HideSheetCommandDetail: "__ARG__0 시트를 숨김",
  SetSheetNameCommandDetail: "__ARG__0 시트의 이름을 __ARG__1 시트로 바꿈",

  CreateGroupCommandDetail: "__ARG__0 시트에 __ARG__1 그룹을 생성함",
  UngroupCommandDetail: "__ARG__0에서 __ARG__1 그룹을 해체",
  SelectGroupCommandDetail: "__ARG__0 시트에서 __ARG__1 그룹을 선택함",
  UnselectGroupCommandDetail: "__ARG__0 시트에서 __ARG__1 그룹 선택을 해제함",
  CloneGroupCommandDetail: "__ARG__0 시트에서 __ARG__1 그룹을 복제함",
  DeleteGroupCommandDetail: "__ARG__0 시트에서 __ARG__1 그룹을 삭제함",
  AddSelectedGroupsPositionCommandDetail:
    "__ARG__0 시트에서 선택한 그룹을 x축으로 __ARG__1, y축으로 __ARG__2 이동함",
  EditGroupNameCommandDetail:
    "__ARG__0 시트에서 __ARG__1 그룹의 이름을 __ARG__2 그룹으로 바꿈",
  MergeGroupCommandDetail: "__ARG__0 시트에서 __ARG__1 그룹을 병합함",

  CreateNodeCommandDetail: "__ARG__0 시트에 __ARG__1 노드를 생성함",
  DeleteSelectedNodeCommandDetail: "__ARG__0 시트에서 __ARG__1 노드를 삭제함",
  SelectNodeCommandDetail: "__ARG__0 시트에서 __ARG__1 노드를 선택함",
  UnselectNodeCommandDetail: "__ARG__0 시트에서 __ARG__1 노드 선택을 해제함",
  CloneNodeCommandDetail: "__ARG__0 시트에 __ARG__1 노드를 복제함",
  AddSelectedNodesPositionCommandDetail:
    "__ARG__0 시트에서 선택한 노드를 x축으로 __ARG__1, y축으로 __ARG__2 이동함",
  SetNodeDataCommandDetail: "__ARG__0 시트의 __ARG__1 노드의 설정을 바꿈",
  SetNodeReferenceDataCommandDetail:
    "__ARG__0 시트의 __ARG__1 노드의 설정을 바꿈",
  ExcludeFromGroupCommandDetail: "__ARG__0 시트의 __ARG__1 노드를 추출함",

  ClearSelectionCommandDetail: "__ARG__0 시트에서 모든 선택을 해제함",
  ClearSelectionInGroupCommandDetail:
    "__ARG__0 시트에서 __ARG__1 그룹 외 선택을 해제함",
  CloneNodeAndGroupCommandDetail:
    "__ARG__0 시트에서 __ARG__1 노드와 __ARG__2 그룹을 복제함",
  DeleteNodeAndGroupCommandDetail:
    "__ARG__0 시트에서 __ARG__1 노드와 __ARG__2 그룹을 삭제함",
  AddSelectedPositionCommandDetail:
    "__ARG__0 시트에서 선택된 그룹과 노드를 x축으로 __ARG__1, y축으로 __ARG__2 이동함",
  MergeNodeAndGroupCommandDetail:
    "__ARG__0 시트에서 __ARG__1 노드와 __ARG__2 그룹을 병합함",

  CreateWireCommandDetail:
    "__ARG__0 시트에서 __ARG__1 노드의 __ARG__3 소켓과 __ARG__2 노드의 __ARG__4 소켓을 연결함",
  DeleteWireCommandDetail:
    "__ARG__0 시트에서 __ARG__1 노드의 __ARG__3 소켓과 __ARG__2 노드의 __ARG__4 소켓 연결을 해제함",

  // ui
  undo: "되돌리기",
  redo: "다시하기",
  Copy: "복사",
  Paste: "붙여넣기",
  Unselect: "선택 해제",
  Group: "그룹 생성",
  Ungroup: "그룹 해제",
  Delete: "삭제",
  Merge: "그룹 병합",
  Exclude: "그룹에서 분리",
  EditGroupName: "그룹 이름 수정",
  MultipleSelectWithDragBoxCommand: "드래그를 통한 선택",

  // hotkey
  CopyHotkey: "Ctrl + C",
  PasteHotkey: "Ctrl + V",
  UnselectHotkey: "Esc",
  GroupHotkey: "Ctrl + G",
  UngroupHotkey: "Ctrl + G",
  DeleteHotkey: "Del",
  MergeHotkey: " ",
  ExcludeHotkey: " ",
  EditGroupNameHotkey: " ",

  // sheet
  DefaultSheetName: "시트",

  // Group
  DefaultGroupName: "그룹",
  CopiedGroupName: "_복사본",
  MergedGroupName: "병합된 그룹",

  // Node
  DefaultSoundNodeName: "사운드",
  DefaultAssetNodeName: "에셋",

  DefaultMouseNodeName: "마우스",
  DefaultMousePositionNodeName: "마우스 좌표",
  DefaultMouseRaycastNodeName: "마우스 레이캐스트",
  DefaultKeyboardNodeName: "키보드",
  DefaultStartNodeName: "시작",
  DefaultTimerNodeName: "타이머",

  DefaultCameraNodeName: "카메라",
  DefaultPointLightNodeName: "포인트 라이트",
  DefaultSpotLightNodeName: "스포트 라이트",
  DefaultObjectNodeName: "오브젝트",

  DefaultVector3CalculationNodeName: "벡터 사칙 연산",
  DefaultVector3CompareNodeName: "벡터 비교",
  DefaultCalculationNodeName: "넘버 사칙 연산",
  DefaultCompareNodeName: "넘버 비교",
  DefaultMathSymbolNodeName: "넘버 절대값/제곱근",
  DefaultLogicGateNodeName: "불리언 논리 연산",

  DefaultRandomNodeName: "랜덤",
  DefaultFlagNodeName: "플래그",
  DefaultCounterNodeName: "카운터",

  DefaultCameraSensorNodeName: "카메라 센서",
  DefaultPointLightSensorNodeName: "포인트 라이트 센서",
  DefaultSpotLightSensorNodeName: "스포트 라이트 센서",
  DefaultObjectSensorNodeName: "오브젝트 센서",

  DefaultConstBooleanNodeName: "불리언 상수",
  DefaultConstNumberNodeName: "넘버 상수",
  DefaultConstVector3NodeName: "벡터3 상수",
  DefaultConstColorNodeName: "컬러 상수",

  DefaultVariableBooleanNodeName: "불리언 변수",
  DefaultVariableNumberNodeName: "넘버 변수",
  DefaultVariableStringNodeName: "문자열 변수",

  DefaultConvertNodeName: "변환 상수",
  DefaultMeshPhysicalMaterialNodeName: "머터리얼 요소",

  DefaultFunctionNodeName: "함수",
  DefaultAnimationNodeName: "애니메이션",

  // sheet-menu
  RenameSheet: "이름 수정",
  HideSheet: "시트 숨기기",
  MoveSheetRight: "오른쪽으로 이동",
  MoveSheetLeft: "왼쪽으로 이동",
  DeleteSheet: "삭제",
  ConvertToFunction: "함수로 변경",

  // sheet-dialog
  DeleteSheetTitle: "시트를 삭제하시겠습니까?",

  // dialog
  Accept: "확인",
  Cancel: "취소",

  // category name
  Vector3CalculationCategory: "벡터 연산",
  NumberCalculationCategory: "넘버 연산",
  BooleanCalculationCategory: "불리언 연산",

  // node menu
  CalculationMenu: "사칙 연산",
  CompareMenu: "비교",

  // node class name
  Convert: "변환",
  BoolToNum: "불리언 → 넘버",
  NumToBool: "넘버 → 불리언",
  NumToVector3: "넘버 → 벡터3",
  Vector3ToNum: "벡터3 → 넘버",
  Keyboard: "키보드",
  Mouse: "마우스",
  MousePosition: "마우스 좌표",
  MouseRaycast: "마우스 레이캐스트",
  MouseHold: "마우스 Hold",
  MouseSpot: "마우스 Spot",
  Start: "시작",
  Timer: "타이머",
  Changed: "Changed",
  LogicGate: "논리 연산",
  Compare: "넘버 비교",
  Vector3Compare: "벡터 비교",
  NumberCompare: "넘버 비교",
  MathSymbol: "절대값/제곱근",
  Calculation: "넘버 사칙 연산",
  Vector3Calculation: "벡터 사칙 연산",
  Divide: "나누기",
  Minus: "빼기",
  Multiple: "곱하기",
  Plus: "더하기",
  Digitize: "Digitize",
  SquareRoot: "제곱근",
  Absolute: "절댓값",
  Inverse: "반대",
  PositionToAngle: "포지션 → 앵글",
  AngleToPosition: "앵글 → 포지션",
  AngleDifference: "각도 차이",
  OnJoin: "참가",
  OnLeave: "퇴장",
  ReceiveBoolMsg: "불리언 메시지 받기",
  ReceiveNumMsg: "넘버 메시지 받기",
  ReceiveVec3Msg: "벡터3 메시지 받기",
  SendBoolMsg: "불리언 메시지 보내기",
  SendNumMsg: "넘버 메시지 보내기",
  SendVec3Msg: "벡터3 메시지 보내기",
  Object: "오브젝트",
  Light: "광원",
  PointLight: "포인트 라이트",
  SpotLight: "스포트 라이트",
  Camera: "카메라",
  RotationSensor: "각도 센서",
  PositionSensor: "위치 센서",
  ScaleSensor: "스케일 센서",
  CameraSensor: "카메라 센서",
  PointLightSensor: "포인트 라이트 센서",
  SpotLightSensor: "스포트 라이트 센서",
  ObjectSensor: "오브젝트 센서",
  ConstNumber: "넘버",
  ConstBoolean: "참/거짓 (불리언)",
  ConstColor: "컬러",
  ConstVector3: "벡터3",
  VariableNumber: "넘버",
  VariableBoolean: "참/거짓 (불리언)",
  VariableString: "문자열",
  Material: "머터리얼",
  MaterialTemplate: "머터리얼 요소",
  Counter: "카운터",
  Flag: "플래그",
  Random: "랜덤",
  Function: "함수",

  // socket name
  boolean: "참/거짓 (불리언)",
  color: "컬러",
  number: "넘버",
  vector3: "벡터3",
  object: "오브젝트",
  light: "광원",
  camera: "카메라",
  material: "머터리얼",
  calculation: "연산",
  convert: "변환",
  Boolean: "참/거짓 (불리언)",
  Color: "컬러",
  Number: "넘버",
  Vector3: "벡터3",
  x: "X",
  y: "Y",
  z: "Z",
  r: "R",
  g: "G",
  b: "B",
  MeshPhysicalMaterial: "메쉬 피직스 머터리얼",

  vector3First: "벡터1",
  vector3Second: "벡터2",
  booleanFirst: "불리언1",
  booleanSecond: "불리언2",
  numberFirst: "넘버1",
  numberSecond: "넘버2",

  position: "포지션",
  rotation: "로테이션",
  scale: "사이즈",
  visible: "가시성",
  animation: "애니메이션",

  fov: "화각",
  near: "최소 촬영 거리",
  far: "최대 촬영 거리",

  intensity: "광도",
  softness: "부드러움",
  resolution: "해상도",
  blur: "흐림",
  decay: "그라데이션",
  angle: "각도",
  coneangle: "원뿔각도",
  penumbra: "반영",

  "material template": "머터리얼 요소",
  opacity: "불투명도",
  metalness: "금속성",
  roughness: "거칠기",
  ior: "굴절",

  compose: "구성",
  decompose: "분해",

  count_up: "카운트 업",
  count_down: "카운트 다운",
  reset: "리셋",
  result: "결과",

  on: "ON",
  off: "OFF",

  key: "키",
  signal: "시그널",
  random: "랜덤",
  symbol: "수치",
  NODE_DAT_RANDOM_RANGE_MAX: "랜덤 최댓값",
  NODE_DAT_HOLD: "액션",
  NODE_DAT_KEY: "키",
  NODE_DAT_TIMER_DELAY: "타이머 딜레이",
  NODE_DAT_TIMER_DURATION: "타이머 기간",
  NODE_DAT_DEFAULT_VALUE: "기본값",
  NODE_DAT_COUNTER_MODE: "모드",
  NODE_DAT_COUNTER_RANGE: "범위",
  NODE_DAT_COUNTER_TIMING: "카운트 타이밍",
  NODE_DAT_COMPARE_OPERATOR: "비교 연산자",
  NODE_DAT_COMPOSE: "구성 / 분해",
  NODE_DAT_MATERIAL_TEMPLATE: "머터리얼 요소",
  NODE_DAT_MOUSE_BUTTON_TYPE: "마우스 버튼 설정",
  STR_VECTOR3_X: "X",
  STR_VECTOR3_Y: "Y",
  STR_VECTOR3_Z: "Z",

  // value
  true: "참",
  false: "거짓",
  And: "AND",
  Not: "NOT",
  Or: "OR",
  Xor: "XOR",
  "=": "=",
  "==": "=",
  ">": ">",
  "<": "<",
  "≠": "≠",
  Spot: "스팟",
  Hold: "홀드",
  LeftButton: "좌 버튼",
  RightButton: "우 버튼",
  WheelButton: "휠 버튼",
  WheelUp: "휠 업",
  WheelDown: "휠 다운",
  in: "입력 타입",
  out: "출력 타입",
});
