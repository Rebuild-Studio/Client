import { styled } from "styled-components";
import { StyledCardTextArea, StyledCard } from "../componentList.Styles";
export type ExampleCardProps = {
  name: string;
  thumbnail: string;
  isClicked: boolean;
  onClick?: () => void;
};

const StyledCardImg = styled.img`
  width: 90%;
  height: 90%;
`;

export const ExampleCard = ({
  name,
  thumbnail,
  isClicked,
  onClick,
}: ExampleCardProps) => {
  return (
    <StyledCard $isClicked={isClicked} onClick={onClick}>
      <StyledCardImg src={thumbnail} alt="library" />
      <StyledCardTextArea>{name}</StyledCardTextArea>
    </StyledCard>
  );
};
