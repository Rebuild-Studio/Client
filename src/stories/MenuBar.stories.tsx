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

    // 로그아웃 버튼
    const StyledButton = styled.button`
      margin-left: auto;
    `;
    const LogOutBtn = () => (
      <>
        <StyledButton>로그아웃</StyledButton>
      </>
    );

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

    return (
      <>
        <>
          <MenuBar>
            <PopOver triggerComponent={<ComponentBtn />}>
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
            </PopOver>
            <LogOutBtn />
          </MenuBar>
        </>
      </>
    );
  },
} satisfies Story;

export { BasicMenuBar };
