import styled from "styled-components";
import { StyledCardTextArea, StyledCard } from "../projectList.styles";

export type ProjectCardProps = {
  id: string;
  name: string;
  thumbnail: string;
  savedAt: string;
  isClicked: boolean;
  onClick?: () => void;
};

export const ProjectCard = ({
  name,
  thumbnail,
  savedAt,
  isClicked,
  onClick,
}: ProjectCardProps) => {
  return (
    <StyledCard $isClicked={isClicked} onClick={onClick}>
      <StyledMenuBtn>
        <img src="/icons/project/icon_edit_30px.png" alt="edit" />
      </StyledMenuBtn>
      <StyledCardImg src={thumbnail} alt="library" />
      <StyledCardTextArea>{name}</StyledCardTextArea>
      <StyledCardTextArea>{savedAt}</StyledCardTextArea>
    </StyledCard>
  );
};

const StyledCardImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledMenuBtn = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  height: 30px;
`;
