import { Meta, StoryObj } from "@storybook/react";
import MenuBar from "@/components/layout/MenuBar";
import MenuButton from "@/components/common/MenuButton";
import { styled } from "styled-components";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import BottomPopOver from "@/components/layout/popover/BottomPopOver";
import SubMenu from "@/components/common/SubMenu";
const meta = {
  component: MenuBar,
  title: "Component/Layout/MenuBar",
  tags: ["autodocs"],
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof MenuBar>;

const BasicMenuBar = {
  render: (args) => {
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

    const data1 = [
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
    ];
    const data2 = [
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
          { label: "Scene 저장", disabled: false },
          { label: "선택된 에셋 저장", disabled: false },
          { label: "선택된 에셋 저장2", disabled: false },
          { label: "선택된 에셋 저장3", disabled: false },
        ],
      },
      {
        label: "배포하기",
        disabled: false,
        children: [
          { label: "ffff", disabled: false },
          {
            label: "ddddd",
            disabled: false,
            children: [{ label: "ㅇㅇㅇㅇㅇ", disabled: false }],
          },
        ],
      },
    ];

    // 로그아웃 버튼
    const StyledButton = styled.img`
      margin-left: auto;
      margin-right: 10px;
    `;

    const StyledLogo = styled.img`
      margin-left: 10px;
    `;

    return (
      <>
        <>
          <MenuBar>
            <StyledLogo src="/Icons/Studio/MX로고.png" alt="logo" />
            <BottomPopOver triggerComponent={<ComponentBtn />}>
              <SubMenu data={data1} />
            </BottomPopOver>
            <BottomPopOver triggerComponent={<PlugInBtn />}>
              <SubMenu data={data2} />
            </BottomPopOver>
            <BottomPopOver triggerComponent={<ConfigureBtn />}>
              <SubMenu data={data2} />
            </BottomPopOver>
            <BottomPopOver triggerComponent={<HelpBtn />}>
              <SubMenu data={data2} />
            </BottomPopOver>
            <StyledButton src="/Icons/Studio/icon_logout.png" alt="logout" />
          </MenuBar>
        </>
      </>
    );
  },
} satisfies Story;

export { BasicMenuBar };
