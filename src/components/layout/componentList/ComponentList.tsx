import { useState } from "react";
import { styled } from "styled-components";
import MenuButton, { MenuButtonProps } from "@/components/common/MenuButton";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { ProjectCards } from "./ProjectCards";
import { ExampleCards } from "./ExampleCards";
import { Tabs } from "../Tabs";

const StyledComponentList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${bgColors[404040]};
`;

const StyledHeader = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTab = styled.div`
  background-color: ${bgColors[343434]};
  padding-left: 22px;
`;

const StyledTitle = styled.p`
  margin-left: 20px;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: ${basicColors.white};
  font-family: SourceHanSansKR;
  font-size: 14px;
  font-weight: 500;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
`;

const StyledFooter = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${bgColors[343434]};
  padding-right: 22px;
  gap: 20px;
`;

const confirmButtonStyle: Omit<
  MenuButtonProps,
  "label" | "onClick" | "disabled"
> = {
  width: "138px",
  height: "34px",
  minHeight: "32px",
  minWidth: "80px",
  borderRadius: "6px",
  backgroundColor: basicColors.lightLimeGreen,
  fontFamily: "SourceHanSansKR",
  fontSize: "small",
  fontWeight: 500,
  color: bgColors[101728],
  hoverBackgroundColor: basicColors.limeGreen,
};

const closeButtonStyle: Omit<
  MenuButtonProps,
  "label" | "onClick" | "disabled"
> = {
  width: "138px",
  height: "34px",
  minHeight: "32px",
  minWidth: "80px",
  borderRadius: "6px",
  backgroundColor: bgColors[282828],
  fontFamily: "SpoqaHanSansNeo",
  fontSize: "small",
  fontWeight: 500,
  color: basicColors.white,
  hoverBackgroundColor: grayColors[808080],
};

export const ComponentList = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <StyledComponentList>
      <StyledHeader>
        <StyledTitle>컴포넌트 목록</StyledTitle>
        {/* <input type="text" placeholder="에셋을 입력해주세요"></input> */}
      </StyledHeader>
      <StyledTab>
        <Tabs
          labelList={["내 컴포넌트", "컴포넌트 템플릿"]}
          selectedColor={basicColors.white}
          backgroundColor={bgColors[343434]}
          color={grayColors[535353]}
          underbarColor={basicColors.lightLimeGreen}
          width="400px"
          height="50px"
          onChange={(idx) => {
            setSelectedTabIndex(idx);
          }}
        />
      </StyledTab>
      <StyledContent>
        {selectedTabIndex == 0 ? (
          <ProjectCards
            componentData={[
              {
                id: "1",
                name: "Componenet name(1)",
                thumbnail: "/icons/project/projcetListCard_test.png",
                savedAt: "2023년-09월-07일 13:56",
                isClicked: false,
              },
              {
                id: "2",
                name: "Componenet name(2)",
                thumbnail: "/icons/project/projcetListCard_test.png",
                savedAt: "2022년-02월-07일 01:00",
                isClicked: false,
              },
            ]}
          />
        ) : (
          <ExampleCards
            componentData={[
              {
                name: "오피스 테마",
                thumbnail: "/example/StartScene_Office.png",
                isClicked: false,
              },
              {
                name: "플래피 캣 게임",
                thumbnail: "/example/game_end.png",
                isClicked: false,
              },
            ]}
          />
        )}
      </StyledContent>
      <StyledFooter>
        <MenuButton
          {...confirmButtonStyle}
          label="불러오기"
          onClick={() => {}}
          disabled={false}
        />
        <MenuButton
          {...closeButtonStyle}
          label="닫기"
          onClick={() => {}}
          disabled={false}
        />
      </StyledFooter>
    </StyledComponentList>
  );
};
