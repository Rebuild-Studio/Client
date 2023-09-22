import styled from "styled-components";
import {
  StyledCardTextArea,
  StyledCard,
  StyledCardTextAreaBox,
} from "../componentList.Styles";
type Props = {
  isClicked: boolean;
  onClick?: () => void;
};

const StyledAddCard = styled(StyledCard)`
  border: 1px dotted #fff;
`;

const StyledCardImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledImgBox = styled.div`
  position: absolute;
  top: 68.2px;
  width: 61.6px;
  height: 61.6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const AddCard = ({ isClicked, onClick }: Props) => {
  return (
    <StyledAddCard $isClicked={isClicked} onClick={onClick}>
      <StyledImgBox>
        <StyledCardImg
          src={"/icons/Studio/icon_plus-solid.svg"}
          alt="icon_plus-solid"
        />
      </StyledImgBox>
      <StyledCardTextAreaBox>
        <StyledCardTextArea>{"새 컴포넌트 만들기"}</StyledCardTextArea>
      </StyledCardTextAreaBox>
    </StyledAddCard>
  );
};
