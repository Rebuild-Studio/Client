import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { styled } from "styled-components";
import BottomPopOver from "./layout/popover/BottomPopOver";
import { SubMenu } from "./common/subMenu/SubMenu";
import MenuButton from "./common/MenuButton";
import { MenuItemType } from "./common/subMenu/MenuItem.types";
import IconButton from "./buttons/IconButton";

const StyledBar = styled.div`
  height: 38px;
  width: 100%;
  background-color: ${bgColors[101728]};
  display: flex;
  align-items: center;
`;

const MenuBar = () => {
  const ComponentBtn = () => (
    <MenuButton
      backgroundColor={bgColors[101728]}
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
      disabled={false}
      color={basicColors.white}
      fontSize="small"
      label="도움말"
      onClick={() => {}}
    />
  );

  const data1: MenuItemType[] = [
    {
      label: "저장",
      disabled: false,
      onClick: () => {
        alert("목록");
      },
    },
    {
      label: "목록",
      disabled: false,
      onClick: () => {
        alert("저장");
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
  const data2: MenuItemType[] = [
    {
      label: "목록",
      disabled: false,
      onClick: () => {
        alert("목록");
      },
    },
    {
      label: "저장",
      disabled: true,
      onClick: () => {
        alert("저장");
      },
    },
    {
      label: "로컬 파일로 저장",
      disabled: false,
      children: [
        { label: "Scene 저장", disabled: false, onClick: () => {} },
        { label: "선택된 에셋 저장", disabled: false, onClick: () => {} },
        { label: "선택된 에셋 저장2", disabled: false, onClick: () => {} },
        { label: "선택된 에셋 저장3", disabled: false, onClick: () => {} },
      ],
    },
    {
      label: "배포하기",
      disabled: false,
      children: [
        { label: "ffff", disabled: false, onClick: () => {} },
        {
          label: "ddddd",
          disabled: false,
          children: [
            { label: "ㅇㅇㅇㅇㅇ", disabled: false, onClick: () => {} },
          ],
        },
      ],
    },
  ];

  const StyledLogo = styled.img`
    margin-left: 10px;
  `;
  const ButtonWrapper = styled.div`
    margin-left: auto;
    margin-right: 10px;
  `;
  return (
    <StyledBar>
      <StyledLogo src="/Icons/Studio/MX로고.png" alt="logo" />
      <BottomPopOver triggerComponent={<ComponentBtn />}>
        <SubMenu menuItems={data1} />
      </BottomPopOver>
      <BottomPopOver triggerComponent={<PlugInBtn />}>
        <SubMenu menuItems={data2} />
      </BottomPopOver>
      <BottomPopOver triggerComponent={<ConfigureBtn />}>
        <SubMenu menuItems={data2} />
      </BottomPopOver>
      <BottomPopOver triggerComponent={<HelpBtn />}>
        <SubMenu menuItems={data2} />
      </BottomPopOver>
      <ButtonWrapper>
        <IconButton
          Icon={() => <img src={"/Icons/Studio/icon_logout.png"} />}
        />
      </ButtonWrapper>
    </StyledBar>
  );
};

export default MenuBar;
