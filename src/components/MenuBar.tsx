import { basicColors, bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import BottomPopOver from "./layout/popover/BottomPopOver";
import { SubMenu } from "./common/subMenu/SubMenu";
import MenuButton from "./common/MenuButton";
import { MenuItemType } from "./common/subMenu/MenuItem.types";
import IconButton from "./buttons/IconButton";
import sceneControlStore from "@/store/sceneControlStore";
import projectStore from "@/store/projectStore";
import useExportMxJson from "@/three_components/hooks/useExportMxJson";

const Menu = ({ label }: { label: string }) => (
  <MenuButton
    backgroundColor={bgColors[101728]}
    hoverBackgroundColor={bgColors[101728]}
    width="50px"
    disabled={false}
    color={basicColors.white}
    fontSize="small"
    label={label}
    onClick={() => {}}
  />
);
const ComponentBtn = () => <Menu label="컴포넌트" />;
const PlugInBtn = () => <Menu label="플러그인" />;
const ConfigureBtn = () => <Menu label="설정" />;
const HelpBtn = () => <Menu label="도움말" />;

const MenuBar = () => {
  const [, , createProject, downloadProject] = useExportMxJson({
    projectStore,
  });

  const componentData: MenuItemType[] = [
    {
      label: "저장",
      disabled: false,
      onClick: () => {
        sceneControlStore.setExportScene(true);
        createProject("MX");
      },
    },
    {
      label: "목록",
      disabled: false,
      onClick: () => {
        alert("목록");
      },
    },
    {
      label: "MX-JSON으로 내보내기",
      disabled: false,
      onClick: () => {
        sceneControlStore.setExportScene(true);
        downloadProject();
      },
    },
    {
      label: "PMX 저장",
      disabled: false,

      onClick: () => {
        sceneControlStore.setExportScene(true);
        createProject("PMX");
      },
    },
    {
      label: "GLB로 내보내기(선택)",
      disabled: true,
      onClick: () => {},
    },
    {
      label: "GLB로 내보내기(전체)",
      disabled: true,
      onClick: () => {},
    },
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
      <StyledLogo src="/icons/studio/MX로고.png" alt="logo" />
      <BottomPopOver triggerComponent={<ComponentBtn />}>
        <SubMenu menuItems={componentData} />
      </BottomPopOver>
      <BottomPopOver triggerComponent={<PlugInBtn />}>
        <></>
      </BottomPopOver>
      <BottomPopOver triggerComponent={<ConfigureBtn />}>
        <SubMenu menuItems={configureData} />
      </BottomPopOver>
      <BottomPopOver triggerComponent={<HelpBtn />}>
        <SubMenu menuItems={helpData} />
      </BottomPopOver>
      <ButtonWrapper>
        <IconButton
          Icon={() => <img src={"/icons/studio/icon_logout.png"} />}
        />
      </ButtonWrapper>
    </StyledBar>
  );
};

export default MenuBar;

const StyledLogo = styled.img`
  margin-left: 10px;
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

const StyledBar = styled.div`
  height: 38px;
  width: 100%;
  background-color: ${bgColors[101728]};
  display: flex;
  align-items: center;
`;
