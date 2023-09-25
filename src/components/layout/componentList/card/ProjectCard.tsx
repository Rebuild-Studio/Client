import styled from "styled-components";
import { StyledCardTextArea, StyledCard } from "../componentList.Styles";
export type ProjectCardProps = {
  id: string;
  name: string;
  thumbnail: string;
  savedAt: string;
  isClicked: boolean;
  onClick?: () => void;
};

const StyledCardImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SytledMenuBtn = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  height: 30px;
`;

export const ProjectCard = ({
  name,
  thumbnail,
  savedAt,
  isClicked,
  onClick,
}: ProjectCardProps) => {
  return (
    <StyledCard $isClicked={isClicked} onClick={onClick}>
      <SytledMenuBtn>
        <img src="/icons/project/icon_edit_30px.png" alt="edit" />
      </SytledMenuBtn>
      <StyledCardImg src={thumbnail} alt="library" />
      <StyledCardTextArea>{name}</StyledCardTextArea>
      <StyledCardTextArea>{savedAt}</StyledCardTextArea>
    </StyledCard>
  );
};
