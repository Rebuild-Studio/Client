import { observable } from "mobx";

const props_store = observable({
  shapeIndex: 0,
  setShape(shape) {
    props_store.shapeIndex = shape;
    props_store.refreshShapeName(shape);
    // console.log("shapeIndex: ", props_store.shapeIndex);
    // console.log("shapeName: ", props_store.shapeName);
  },

  shapeName: "cone",
  // 현재 ShapeIndex 따라 다른 ShapeName을 반환하는 함수
  refreshShapeName(index) {
    return index === 0
      ? (props_store.shapeName = "cone")
      : index === 1
      ? (props_store.shapeName = "cylinder")
      : index === 2
      ? (props_store.shapeName = "sphere")
      : index === 3
      ? (props_store.shapeName = "capsule")
      : index === 4
      ? (props_store.shapeName = "torus")
      : index === 5
      ? (props_store.shapeName = "plane")
      : (props_store.shapeName = "");
  },

  sceneTabPageIndex: 0,
  setSceneTabPageIndex(index) {
    props_store.sceneTabPageIndex = index;
  },

  propsTypePageIndex: 0,
  setPropsTypePageIndex(index) {
    props_store.propsTypePageIndex = index;
    props_store.refreshPropsTypePageName(index);
  },

  propsTypePageName: "",
  // 현재 propsTypePageIndex에 따라 다른 propsType을 반환하는 함수
  refreshPropsTypePageName(index) {
    return index === 0
      ? (props_store.propsTypePageName = "sceneProps")
      : index === 1
      ? (props_store.propsTypePageName = "objectProps")
      : index === 2
      ? (props_store.propsTypePageName = "lightProps")
      : index === 3
      ? (props_store.propsTypePageName = "cameraProps")
      : (props_store.propsTypePageName = "");
  },

  openDialog: false,

  getDialogState() {
    return props_store.openDialog;
  },

  ToggleDialog() {
    props_store.openDialog = !props_store.openDialog;
  },

  itemsList: ["씬 Props", "오브젝트 Props", "라이트 Props", "카메라 Props"],

  // 변수명은 모두 camelCase로 작성
  propsData: {
    sceneProps: {
      // 환경광
      hdri: {
        // 환경이미지
        hdriTemplate: {
          // 환경이미지
          image: true,
          // 환경강도
          intensity: true,
          // 회전
          rotation: true,
        },
        // 주변광
        ambientLight: {
          // 강도
          intensity: true,
          // 컬러
          color: true,
        },
        // 직사광
        directionalLight: {
          // 강도
          intensity: true,
          // 컬러
          color: true,
        },
      },

      // 디스플레이
      display: {
        // 배경 컬러
        backgroundColor: {
          // 배경 컬러
          color: true,
        },
        // 그리드
        grid: {
          // 사각형 그리드
          axis: true,
          // 중심선 그리드
          wireframe: true,
        },
      },

      // 포스트 효과
      post: {
        //효과
        effect: {
          // 명암 고급 효과
          ssao: true,
          // 반짝임 효과
          bloom: true,
        },
      },
    },

    // 오브젝트 Props
    objectProps: {
      // 트랜스포메이션
      transform: {
        // 위치
        position: true,
        // 회전
        rotation: true,
        // 크기
        scale: true,
      },

      // 머터리얼
      material: {
        // // 머터리얼 선택 Input
        // materialSelect: true,
        // 머터리얼 요소 편집
        materialType: true,
        // 기본 컬러
        color: true,
        // 금속성
        metalness: true,
        // 거칠기
        roughness: true,
        // 더블 사이드
        doubleSide: true,
      },

      shape: {
        // cube: {
        // },

        cone: {
          //반지름
          radius: true,
          //옆면 개수
          radialSegments: true,
          //밑면 보이기
          openEnded: true,
          //호 길이
          thetaLength: true,
        },

        cylinder: {
          //위 반지름
          radiusTop: true,
          //아래 반지름
          radiusBottom: true,
          //옆면 개수
          radialSegments: true,
          //밑면 보이기
          openEnded: true,
          //호 길이
          thetaLength: true,
        },

        sphere: {
          //가로 면 개수
          widthSegments: true,
          //세로 면 개수
          heightSegments: true,
          //가로 호 길이
          phiLength: true,
          //세타 시작점
          thetaStart: true,
          //세로 호 길이
          thetaLength: true,
        },

        capsule: {
          //반지름
          radius: true,
          //길이
          height: true,
          //캡슐 면 개수
          capSegments: true,
          //기둥 면 개수
          radialSegments: true,
        },

        torus: {
          //반지름
          radius: true,
          //두께
          tube: true,
          //세로 면 개수
          radialSegments: true,
          //가로 면 개수
          tubularSegments: true,
          //호 길이
          arc: true,
        },

        plane: {
          //가로 길이
          width: true,
          //세로 길이
          height: true,
        },
      },
    },

    // 라이트 Props
    lightProps: {
      // 트랜스포메이션
      transform: {
        // 위치
        position: true,
        // 회전
        rotation: true,
        // 크기
        scale: true,
      },
      //  빛 속성
      light: {
        // 빛 색상
        color: true,
        // 빛 강도
        intensity: true,
        // 빛 각도(스포트라이트)
        angle: true,
        // 빛 범위(스포트라이트)
        penumbra: true,
      },
    },

    // 카메라 Props
    cameraProps: {
      // 트랜스포메이션
      transform: {
        // 위치
        position: true,
        // 회전
        rotation: true,
        // 크기
        scale: true,
      },
      // 카메라
      camera: {
        // Fov
        fov: true,
        // near
        near: true,
        // Far
        far: true,
      },
    },
  },

  //props_store.propsData["환경광"] = true

  getPropsData() {
    return props_store.propsData;
  },
});

export { props_store };
