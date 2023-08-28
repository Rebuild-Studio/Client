import { Meta, StoryObj } from "@storybook/react";
import MenuBar from "@/components/layout/MenuBar";
import MenuButton from "@/components/common/MenuButton";
import PopOver from "@/components/layout/popover/PopOver";
import { styled } from "styled-components";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";

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
        backgroundcolor={bgColors[101728]}
        disabled={false}
        color={basicColors.white}
        fontSize="small"
        label="컴포넌트"
        onClick={() => {}}
      />
    );
    const PlugInBtn = () => (
      <MenuButton
        backgroundcolor={bgColors[101728]}
        disabled={true}
        color={grayColors[535353]}
        fontSize="small"
        label="플러그인"
        onClick={() => {}}
      />
    );
    const ConfigureBtn = () => (
      <MenuButton
        backgroundcolor={bgColors[101728]}
        disabled={false}
        color={basicColors.white}
        fontSize="small"
        label="설정"
        onClick={() => {}}
      />
    );
    const HelpBtn = () => (
      <MenuButton
        backgroundcolor={bgColors[101728]}
        disabled={false}
        color={basicColors.white}
        fontSize="small"
        label="도움말"
        onClick={() => {}}
      />
    );

    // 로그아웃 버튼
    const StyledButton = styled.img`
      margin-left: auto;
      margin-right: 10px;
    `;

    // 안에 들어갈 내용 컴포넌트
    const Content = styled.div`
      color: ${grayColors[535353]};
      font-size: 24px;
      background-color: ${basicColors.black};
    `;
    const ContentComponent = () => {
      return (
        <div>
          <Content
            onClick={() => {
              console.log("1번");
            }}
          >
            1번
          </Content>
          <Content>2번</Content>
          <Content>3번</Content>
          <Content>4번</Content>
        </div>
      );
    };

    const StyledLogo = styled.img`
      margin-left: 10px;
    `;

    return (
      <>
        <>
          <MenuBar>
            <StyledLogo src="/Icons/Studio/MX로고.png" alt="logo" />
            {/* <PopOver triggerComponent={<ComponentBtn />}>
              <ContentComponent />
            </PopOver>
            <PopOver triggerComponent={<PlugInBtn />}>
              <ContentComponent />
            </PopOver>
            <PopOver triggerComponent={<ConfigureBtn />}>
              <ContentComponent />
            </PopOver>
            <PopOver triggerComponent={<HelpBtn />}>
              <ContentComponent />
            </PopOver> */}
            <ComponentBtn />
            <PlugInBtn />
            <ConfigureBtn />
            <HelpBtn />
            <StyledButton src="/Icons/Studio/icon_logout.png" alt="logout" />
          </MenuBar>
        </>
      </>
    );
  },
} satisfies Story;

export { BasicMenuBar };
