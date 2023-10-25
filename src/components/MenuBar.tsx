import { bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import BottomPopOver from "./layout/popover/BottomPopOver";
import { SubMenu } from "./common/subMenu/SubMenu";
import { MenuItemType } from "./common/subMenu/MenuItem.types";
import IconButton from "./buttons/IconButton";
import sceneControlStore from "@/store/sceneControlStore";
import projectStore from "@/store/projectStore";
import useExportMxJson from "@/three_components/hooks/useExportMxJson";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { ConfirmBox } from "./layout/modal/ConfirmBox";
import legacyStoreContainer from "../interaction(legacyJS)/src/Components/stores/storeContainer";
import ProjectList from "@/features/projectList";

const MenuBar = observer(() => {
  const { projectStateStore } = storeContainer;
  const { eventSystem_store } = legacyStoreContainer;
  const [, , createProject, downloadProject] = useExportMxJson({
    projectStore,
    interactionStore: eventSystem_store,
  });

  const createMX = () => {
    sceneControlStore.setExportScene(true);
    createProject("MX");
  };
  const downloadJSON = () => {
    sceneControlStore.setExportScene(true);
    downloadProject();
  };
  const createPMX = () => {
    sceneControlStore.setExportScene(true);
    createProject("PMX");
  };

  const componentData: MenuItemType[] = [
    {
      label: "저장",
      disabled: false,
      onClick: () => {
        projectStateStore.updateModalComponent(
          <ConfirmBox label={"컴포넌트 저장"} onClick={createMX} />
        );
        projectStateStore.updateModalState(true);
      },
    },
    {
      label: "목록",
      disabled: false,
      onClick: () => {
        projectStateStore.updateModalComponent(<ProjectList />);
        projectStateStore.updateModalState(true);
      },
    },
    {
      label: "MX-JSON으로 내보내기",
      disabled: false,
      onClick: () => {
        projectStateStore.updateModalComponent(
          <ConfirmBox label={"MX-JSON으로 내보내기"} onClick={downloadJSON} />
        );
        projectStateStore.updateModalState(true);
      },
    },
    {
      label: "PMX 저장",
      disabled: false,

      onClick: () => {
        projectStateStore.updateModalComponent(
          <ConfirmBox label={"PMX 저장"} onClick={createPMX} />
        );
        projectStateStore.updateModalState(true);
      },
    },

    // Todo: 추후 구현 시에 주석 해제
    // {
    //   label: "GLB로 내보내기(선택)",
    //   disabled: true,
    //   onClick: () => {},
    // },
    // {
    //   label: "GLB로 내보내기(전체)",
    //   disabled: true,
    //   onClick: () => {},
    // },
  ];
  const configureData: MenuItemType[] = [
    {
      label: "인터페이스",
      disabled: false,
      onClick: () => {},
    },
    {
      label: "단축키",
      disabled: false,
      onClick: () => {},
    },
    {
      label: "자동저장",
      disabled: true,
      onClick: () => {},
    },
  ];

  const helpData: MenuItemType[] = [
    {
      label: "사용 안내서",
      disabled: false,
      onClick: () => {},
    },
    {
      label: "새로운 기능",
      disabled: true,
      onClick: () => {},
    },
    {
      label: "오류 보고/개선 제안",
      disabled: false,
      onClick: () => {},
    },
    {
      label: "Copyright 2023 TmaxMetaverse",
      disabled: true,
      onClick: () => {},
    },
  ];

  return (
    <StyledBar>
      <Left>
        <img src="/icons/studio/MX로고.svg" alt="logo" />
        <BottomPopOver triggerComponent={<MenuButton>컴포넌트</MenuButton>}>
          <SubMenu menuItems={componentData} />
        </BottomPopOver>
        <BottomPopOver triggerComponent={<MenuButton>플러그인</MenuButton>}>
          <></>
        </BottomPopOver>
        <BottomPopOver triggerComponent={<MenuButton>설정</MenuButton>}>
          <SubMenu menuItems={configureData} />
        </BottomPopOver>
        <BottomPopOver triggerComponent={<MenuButton>도움말</MenuButton>}>
          <SubMenu menuItems={helpData} />
        </BottomPopOver>
      </Left>
      <Right>
        <IconButton
          Icon={() => (
            <img src={"/icons/studio/icon_logout.svg"} alt="로그아웃" />
          )}
        />
      </Right>
    </StyledBar>
  );
});

export default MenuBar;

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 38px;
  padding: 0 2px;
  background-color: ${bgColors[101728]};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  color: white;
  padding: 0 12px;
  height: 100%;
`;
