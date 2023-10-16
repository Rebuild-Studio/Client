import { action } from "mobx";
import { props_store } from "../stores/Props_store";
import lodash from "lodash";

// 역할: Props_store에서 관리하고 있는 propsData를 변경하는 함수들을 정의
// 목적: MX에서 UX/GX에 어떤 props를 전달할 지 결정하기 위함.
export default function PropsCheckboxVM() {
  // PropsCheckboxVM.get/setCheckedState(A, B) 함수에서 A, B 인자를 통해
  // JSON의 위치를 찾아가기 위한 정보를 담은 객체 정의

  // 씬 Props
  const scenePropsInfo = {  // A 인자를 통해 scenePropsInfo, objectPropsInfo... 중 하나를 선택
    // 환경광
    image: ["hdri", "hdriTemplate", "image"],   // B 인자를 통해 key값인 image, intensity... 중 하나를 선택
    intensity: ["hdri", "hdriTemplate", "intensity"],   // value값은 JSON 객체를 찾아가기 위한 경로 정보
    rotation: ["hdri", "hdriTemplate", "rotation"],
    ambientLightIntensity: ["hdri", "ambientLight", "intensity"],
    ambientLightColor: ["hdri", "ambientLight", "color"],
    directionalLightIntensity: ["hdri", "directionalLight", "intensity"],
    directionalLightColor: ["hdri", "directionalLight", "color"],
    // 디스플레이
    color: ["display", "backgroundColor", "color"],
    axis: ["display", "grid", "axis"],
    wireframe: ["display", "grid", "wireframe"],
    // 포스트 효과
    ssao: ["post", "effect", "ssao"],
    bloom: ["post", "effect", "bloom"],
  };

  // 오브젝트 Props
  const objectPropsInfo = {
    // 트랜스포메이션
    position: ["transform", "position"],
    rotation: ["transform", "rotation"],
    scale: ["transform", "scale"],
    // 머터리얼
    // materialSelect: ["material", "materialSelect"],
    materialType: ["material", "materialType"],
    color: ["material", "color"],
    metalness: ["material", "metalness"],
    roughness: ["material", "roughness"],
    doubleSide: ["material", "doubleSide"],
    // shape 속성
    // cone
    coneRadius: ["shape", "cone", "radius"],
    coneRadialSegments: ["shape", "cone", "radialSegments"],
    coneOpenEnded: ["shape", "cone", "openEnded"],
    coneThetaLength: ["shape", "cone", "thetaLength"],

    // cylinder
    cylinderRadiusTop: ["shape", "cylinder", "radiusTop"],
    cylinderRadiusBottom: ["shape", "cylinder", "radiusBottom"],
    cylinderRadialSegments: ["shape", "cylinder", "radialSegments"],
    cylinderOpenEnded: ["shape", "cylinder", "openEnded"],
    cylinderThetaLength: ["shape", "cylinder", "thetaLength"],

    // sphere
    sphereWidthSegments: ["shape", "sphere", "widthSegments"],
    sphereHeightSegments: ["shape", "sphere", "heightSegments"],
    spherePhiLength: ["shape", "sphere", "phiLength"],
    sphereThetaStart: ["shape", "sphere", "thetaStart"],
    sphereThetaLength: ["shape", "sphere", "thetaLength"],

    // capsule
    capsuleRadius: ["shape", "capsule", "radius"],
    capsuleHeight: ["shape", "capsule", "height"],
    capsuleCapSegments: ["shape", "capsule", "capSegments"],
    capsuleRadialSegments: ["shape", "capsule", "radialSegments"],

    // torus
    torusRadius: ["shape", "torus", "radius"],
    torusTube: ["shape", "torus", "tube"],
    torusRadialSegments: ["shape", "torus", "radialSegments"],
    torusTubularSegments: ["shape", "torus", "tubularSegments"],
    torusArc: ["shape", "torus", "arc"],

    // plane
    planeWidth: ["shape", "plane", "width"],
    planeHeight: ["shape", "plane", "height"],
  };

  // 라이트 Props
  const lightPropsInfo = {
    // 트랜스포메이션
    position: ["transform", "position"],
    rotation: ["transform", "rotation"],
    scale: ["transform", "scale"],
    //  빛 속성
    color: ["light", "color"],
    intensity: ["light", "intensity"],
    angle: ["light", "angle"],
    penumbra: ["light", "penumbra"],
  };

  // 카메라 Props
  const cameraPropsInfo = {
    // 트랜스포메이션
    position: ["transform", "position"],
    rotation: ["transform", "rotation"],
    scale: ["transform", "scale"],
    // 카메라
    fov: ["camera", "fov"],
    near: ["camera", "near"],
    far: ["camera", "far"],
  };

  // #1 해당되는 props를 찾아서 checked 상태를 변경하는 함수
  // propsType: "sceneProps", "objectProps", "lightProps", "cameraProps", prop: "image", "intensity", ...
  const setCheckedState = action((propsType, prop) => {
    console.log(props_store.propsData);
    // propsType에 따라서 변경할 propsInfo를 다르게 설정함.
    const propsInfo =
      propsType === "sceneProps"
        ? scenePropsInfo
        : propsType === "objectProps"
        ? objectPropsInfo
        : propsType === "lightProps"
        ? lightPropsInfo
        : propsType === "cameraProps"
        ? cameraPropsInfo
        : {};

    // props_store.propsData를 바로 변경하지 않고 임시 data에 propsData를 복사함.
    const data = lodash.cloneDeep(props_store.propsData[propsType]);

    // propsInfo에 해당하는 객체의 깊이를 파악하여 해당 객체의 프로퍼티를 변경함.
    if (Object.prototype.hasOwnProperty.call(propsInfo, prop)) {
      const propertyPath = propsInfo[prop];
      let currentData = data;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        currentData = currentData[propertyPath[i]];
      }

      const lastProperty = propertyPath[propertyPath.length - 1];
      currentData[lastProperty] = !currentData[lastProperty];

      props_store.propsData[propsType] = data;
    } else if (Object.keys(propsInfo).length === 0) {
      // Error Handling
      console.error(
        `JSON으로 전달하기 위한 propsType에 "${propsType}" Type이 없습니다! 😦`
      );
    } else {
      console.error(
        `JSON으로 전달하기 위한 "${propsType}" 객체 내부에 "${prop}" 프로퍼티가 없습니다! 🙁`
      );
    }

    return;
  });

  // 데이터 객체의 지정된 속성 경로에서 값을 가져오는 도우미 기능
  function getPropertyDepth(data, propertyPath) {
    let currentData = data;

    // propertyPath 배열을 사용하여 데이터 개체 이동
    for (let i = 0; i < propertyPath.length; i++) {
      currentData = currentData[propertyPath[i]];
    }

    // true 또는 false를 반환
    return currentData;
  }

  // #2 해당되는 props를 찾아서 checked 상태를 반환하는 함수
  const getCheckedState = (propsType, prop) => {
    const propsInfo =
      propsType === "sceneProps"
        ? scenePropsInfo
        : propsType === "objectProps"
        ? objectPropsInfo
        : propsType === "lightProps"
        ? lightPropsInfo
        : propsType === "cameraProps"
        ? cameraPropsInfo
        : {};

    const data = lodash.cloneDeep(props_store.propsData[propsType]);

    if (Object.prototype.hasOwnProperty.call(propsInfo, prop)) {
      const propertyPath = propsInfo[prop];
      return getPropertyDepth(data, propertyPath);
    }
  };

  return { setCheckedState, getCheckedState };
}
