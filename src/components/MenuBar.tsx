import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import BottomPopOver from "./layout/popover/BottomPopOver";
import { SubMenu } from "./common/subMenu/SubMenu";
import MenuButton from "./common/MenuButton";
import { MenuItemType } from "./common/subMenu/MenuItem.types";
import IconButton from "./buttons/IconButton";

const MenuBar = () => {
  const ComponentBtn = () => (
    <MenuButton
      backgroundColor={bgColors[101728]}
      hoverBackgroundColor={bgColors[101728]}
      width="50px"
      disabled={false}
      color={basicColors.white}
      fontSize="small"
      label="컴포넌트"
      onClick={() => {}}
    />
  );
  const PlugInBtn = () => (
    <MenuButton
      backgroundColor={bgColors[101728]}
      hoverBackgroundColor={bgColors[101728]}
      width="50px"
      disabled={true}
      color={grayColors[535353]}
      fontSize="small"
      label="플러그인"
      onClick={() => {}}
    />
  );
  const ConfigureBtn = () => (
    <MenuButton
      backgroundColor={bgColors[101728]}
      hoverBackgroundColor={bgColors[101728]}
      width="50px"
      disabled={false}
      color={basicColors.white}
      fontSize="small"
      label="설정"
      onClick={() => {}}
    />
  );
  const HelpBtn = () => (
    <MenuButton
      backgroundColor={bgColors[101728]}
      hoverBackgroundColor={bgColors[101728]}
      width="50px"
      disabled={false}
      color={basicColors.white}
      fontSize="small"
      label="도움말"
      onClick={() => {}}
    />
  );

  const componentData: MenuItemType[] = [
    {
      label: "저장",
      disabled: false,
      onClick: () => {
        alert("저장");
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
      label: "GLB로 내보내기(선택)",
      disabled: false,
      onClick: () => {},
    },
    {
      label: "GLB로 내보내기(전체)",
      disabled: false,
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
      <Left>
        <img src="/icons/studio/MX로고.png" alt="logo" />
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
      </Left>
      <Right>
        <IconButton
          Icon={() => (
            <img src={"/icons/studio/icon_logout.png"} alt="로그아웃" />
          )}
        />
      </Right>
    </StyledBar>
  );
};

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
