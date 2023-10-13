import { observable } from "mobx";

const data_store = observable({
  project_list: [1, 2, 3, 4, 5, 6],
  // server_url: "http://220.90.208.121:8000",

  light_list: [
    ["포인트 라이트", "point_light"],
    ["스포트 라이트", "spot_light"],
  ],
  mat_tex_list: [
    ["기본", "MX_mat_defalt_white_01"],
    ["투명한 플라스틱", "MX_mat_plastic_clear_01"],
    ["불투명한 플라스틱", "MX_mat_plastic_base_01"],
    ["금", "MX_mat_metal_gold_01"],
    ["은", "MX_mat_metal_silver_01"],
    ["니켈", "MX_mat_metal_nickel_01"],
    ["스틸", "MX_mat_metal_steel_01"],
    ["물", "MX_mat_glass_water_01"],
    ["다이아몬드", "MX_mat_glass_dia_01"],
    ["김서린 유리_01", "MX_mat_glass_frosty_01"],
    ["김서린 유리_02", "MX_mat_glass_frosty_02"],
    ["비내린 유리_01", "MX_mat_glass_rainDrop_01"],
    ["더러운 유리", "MX_mat_glass_dirty_01"],
    ["유리벽돌_01", "MX_mat_glass_brick_01"],
    ["유리벽돌_02", "MX_mat_glass_brick_02"],
    ["유리벽돌_03", "MX_mat_glass_brick_03"],
    ["유리벽돌_04", "MX_mat_glass_brick_04"],
    ["깨진유리_01", "MX_mat_glass_shattered_01"],
    ["깨진유리_02", "MX_mat_glass_shattered_02"],
    ["나무바닥", "MX_mat_wood_floor_01"],
    ["나무시트", "MX_mat_wood_sheet_01"],
    ["오크나무", "MX_mat_wood_oak_01"],
    ["나무껍질", "MX_mat_wood_bark_01"],
    ["악어가죽", "MX_mat_leather_crocodile_01"],
    ["소가죽", "MX_mat_leather_cow_01"],
    ["스웨이드", "MX_mat_leather_suede_01"],
    ["니트", "MX_mat_fabric_knit_01"],
    ["캔버스", "MX_mat_fabric_canvas_01"],
    ["면", "MX_mat_fabric_cotton_01"],
    ["실크", "MX_mat_fabric_silk_01"],
    ["돌", "MX_mat_street_rock_01"],
    ["흙_01", "MX_mat_street_soil_01"],
    ["흙_02", "MX_mat_street_soil_02"],
    ["빌딩", "MX_mat_street_building_01"],
    ["아스팔트", "MX_mat_street_aspalt_01"],
    ["콘크리트", "MX_mat_street_concrate_01"],
    ["벽돌", "MX_mat_street_brick_01"],
    ["잔디", "MX_mat_street_grass_01"],
    ["대리석_01", "MX_mat_marble_type_01"],
    ["대리석_02", "MX_mat_marble_type_02"],
    ["대리석_03", "MX_mat_marble_type_03"],
    ["진주", "MX_mat_marble_peal_01"],
    ["옥", "MX_mat_sub_jade_01"],
    ["카페인트", "MX_mat_metal_carPaint_01"],
  ],

  sound_list: [
    ["오리 효과음", "duck-quack.mp3"],
    ["첨벙", "splash.mp3"],
    ["드럼 루프", "street-drumloop-85bpm.mp3"],
  ],

  /*
    primitive form
     gui가 slider일 경우
     "primitive type":['parameter',한글명', 'slider',value,mminValue, maxValue,Unit]
    gui가 toggle
    "primitive type":['parameter', '한글명', 'toggle',value]
  */
  //primitives
  cube: [],
  cone: [
    ["radius", "반지름", "slider", 0.5, 0, 30, 0.1],
    ["radialSegments", "옆면 개수", "slider", 32, 3, 64, 1],
    ["openEnded", "밑면 보이기", "toggle", false],
    ["thetaLength", "호 길이", "slider", 2 * Math.PI, 0, 2 * Math.PI, 0.06],
  ],

  cylinder: [
    ["radiusTop", "위 반지름", "slider", 0.5, 0, 30, 0.1],
    ["radiusBottom", "아래 반지름", "slider", 0.5, 0, 30, 0.1],
    ["radialSegments", "옆면 개수", "slider", 32, 3, 64, 1],
    ["openEnded", "밑면 보이기", "toggle", false],
    ["thetaLength", "호 길이", "slider", 2 * Math.PI, 0, 2 * Math.PI, 0.06],
  ],

  sphere: [
    ["widthSegments", "가로 면 개수", "slider", 32, 3, 64, 1],
    ["heightSegments", "세로 면 개수", "slider", 16, 2, 32, 1],
    ["phiLength", "가로 호 길이", "slider", 2 * Math.PI, 0, 2 * Math.PI, 0.06],
    ["thetaStart", "세타 시작점", "slider", 0, 0, 2 * Math.PI, 0.06],
    ["thetaLength", "세로 호 길이", "slider", Math.PI, 0, 2 * Math.PI, 0.06],
  ],

  capsule: [
    ["radius", "반지름", "slider", 0.25, 0, 30, 0.01],
    ["height", "길이", "slider", 1, 0, 30, 0.1],
    ["capSegments", "캡슐 면 개수", "slider", 10, 1, 32, 1],
    ["radialSegments", "기둥 면 개수", "slider", 20, 1, 64, 1],
  ],

  torus: [
    ["radius", "반지름", "slider", 0.5, 0, 20, 0.02],
    ["tube", "두께", "slider", 0.2, 0.1, 10, 0.01],
    ["radialSegments", "세로 면 개수", "slider", 16, 2, 30, 1],
    ["tubularSegments", "가로 면 개수", "slider", 100, 3, 200, 2],
    ["arc", "호 길이", "slider", 2 * Math.PI, 0, 2 * Math.PI, 0.06],
  ],

  plane: [
    ["width", "slider", 1, 0, 30, 0.001],
    ["height", "slider", 1, 0, 30, 0.001],
  ],

  //objectCommon?GroupProps
  props: {
    castShadow: "Boolean",
    simple: "Boolean",
    frustumCulled: "Boolean",
    position: "Vector3",
    receiveShadow: "Boolean",
    rotation: "Vector3",
    scale: "Vector3",
    visible: "Boolean",
  },
  //materialProps
  materialProps: {
    color: ["Color", "기본 컬러"],
    metalness: ["slider", "금속성"],
    roughness: ["slider", "거칠기"],
    side: ["toggle", "더블사이드"],
  },

  lightProps: {
    common: [
      ["color", "LightColor", "color"],
      ["intensity", "Intensity", "slider", 0, 50, 0.1],
      // ["castShadow", "Boolean", "그림자생성"],
    ],
    SpotLight: [
      ["angle", "Angle", "slider", 0, 1.571, 0.001],
      ["penumbra", "Penumbra", "slider", 0, 1, 0.01],
    ],
  },

  //cameraPros: {[속성,ui명, 'slider',최소,최대,단위]}
  cameraProps: [
    ["fov", "Fov", "slider", 0.1, 180, 0.001],
    ["near", "Near", "slider", 0.1, 100, 0.001],
    ["far", "Far", "slider", 100, 100000, 0.01],
  ],
  soundProps: [
    ["detune", "Detune", "slider", 0, 500, 1],
    ["volume", "Volume", "slider", 0, 1, 0.01],
  ],
  apart: ["Modular_Door", "Modular_Window"],
  apartTexture: [
    "floorBase",
    "floorNormal",
    "floorRoughness",
    "Wall",
    "WallNormal",
    "WallRoughness",
    "wood_BaseColor",
    "wood_Roughness",
  ],
  exampleProjects: [
    ["오피스 테마", "StartScene_Office"],
    ["플래피 캣 게임", "game_end"],
  ],
});

export { data_store };
