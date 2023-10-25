import { useState } from "react";
import { styled } from "styled-components";
import MenuButton, { MenuButtonProps } from "@/components/common/MenuButton";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";

interface ConfirmBoxProps {
  label: string;
  onClick?: () => void;
  hasContent?: boolean;
}

export const ConfirmBox = observer(
  ({ label, onClick, hasContent = false }: ConfirmBoxProps) => {
    const { projectStateStore, projectStore } = storeContainer;
    const [value, setValue] = useState(projectStore.projectName);

    const onClickClose = () => {
      projectStateStore.clearModal();
    };

    return (
      <StyledComponentList>
        <StyledHeader>
          {hasContent ? (
            <StyledTitle>{label}</StyledTitle>
          ) : (
            <StyledTitle>{label} 확인</StyledTitle>
          )}
        </StyledHeader>

        {hasContent ? (
          // To do: 추후 ConfirmBox 확장 시, hasContent이 true이면 주입되도록 수정
          <StyledBody>
            <StyledInput
              type="text"
              placeholder="컴포넌트 이름을 입력해주세요"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
            />
          </StyledBody>
        ) : (
          <StyledBody>정말 실행하시겠습니까?</StyledBody>
        )}

        <StyledFooter>
          {hasContent ? (
            <MenuButton
              {...confirmButtonStyle}
              label={"저장"}
              onClick={() => {
                projectStore.setProjectName(value);
                onClickClose();
              }}
              disabled={false}
            />
          ) : (
            !!onClick && (
              <MenuButton
                {...confirmButtonStyle}
                label={"실행"}
                onClick={() => {
                  onClick();
                  onClickClose();
                }}
                disabled={false}
              />
            )
          )}
          <MenuButton
            {...closeButtonStyle}
            label="닫기"
            onClick={onClickClose}
            disabled={false}
          />
        </StyledFooter>
      </StyledComponentList>
    );
  }
);

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
  font-weight: 700;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${basicColors.white};
  font-weight: 1000;
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

const buttonStyle: Omit<MenuButtonProps, "label" | "onClick" | "disabled"> = {
  width: "138px",
  height: "34px",
  minHeight: "32px",
  minWidth: "80px",
  borderRadius: "6px",
  fontSize: "small",
  fontWeight: 700,
};

const confirmButtonStyle = {
  ...buttonStyle,
  backgroundColor: basicColors.lightLimeGreen,
  fontFamily: "SpoqaHanSansNeo",
  color: bgColors[101728],
  hoverBackgroundColor: basicColors.limeGreen,
};

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: bgColors[282828],
  fontFamily: "SpoqaHanSansNeo",
  color: basicColors.white,
  hoverBackgroundColor: grayColors[808080],
};
