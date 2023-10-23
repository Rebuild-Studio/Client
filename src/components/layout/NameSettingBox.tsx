import { useState } from "react";
import { styled } from "styled-components";
import MenuButton, { MenuButtonProps } from "@/components/common/MenuButton";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";

export const NameSettingBox = observer(() => {
  const { projectStateStore, projectStore } = storeContainer;
  const [value, setValue] = useState(projectStore.projectName);

  const onClickSave = () => {
    projectStore.setProjectName(value);
    projectStateStore.clearModal();
  };

  const onClickClose = () => {
    projectStateStore.clearModal();
  };
  return (
    <StyledComponentList>
      <StyledHeader>
        <StyledTitle>컴포넌트 저장</StyledTitle>
      </StyledHeader>
      <StyledBody>
        <StyledInput
          type="text"
          placeholder="컴포넌트 이름을 입력해주세요"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        ></StyledInput>
      </StyledBody>
      <StyledFooter>
        <MenuButton
          {...confirmButtonStyle}
          label="저장"
          onClick={onClickSave}
          disabled={false}
        />
        <MenuButton
          {...closeButtonStyle}
          label="닫기"
          onClick={onClickClose}
          disabled={false}
        />
      </StyledFooter>
    </StyledComponentList>
  );
});

const StyledComponentList = styled.div`
  width: 70px;
  min-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${bgColors[404040]};
  border-radius: 10px;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.p`
  margin-left: 20px;
  //   line-height: 1.5;
  letter-spacing: 0.00938em;
  color: ${basicColors.white};
  font-family: SourceHanSansKR;
  font-size: 14px;
  font-weight: 1000;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid ${bgColors[282828]};
  background-color: ${bgColors[404040]};
  color: ${basicColors.white};
  font-family: SourceHanSansKR;
  font-size: 14px;
  font-weight: 1000;
  padding-left: 10px;
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
  fontWeight: 1000,
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
  fontWeight: 1000,
  color: basicColors.white,
  hoverBackgroundColor: grayColors[808080],
};
