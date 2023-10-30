import { styled } from 'styled-components';
import { StyledCard, StyledCardTextArea } from '../projectList.styles';

export type ExampleCardProps = {
  name: string;
  thumbnail: string;
  isClicked: boolean;
  onClick?: () => void;
};

export const ExampleCard = ({
  name,
  thumbnail,
  isClicked,
  onClick
}: ExampleCardProps) => {
  return (
    <StyledCard $isClicked={isClicked} onClick={onClick}>
      <StyledCardImg src={thumbnail} alt="library" />
      <StyledCardTextArea>{name}</StyledCardTextArea>
    </StyledCard>
  );
};

const StyledCardImg = styled.img`
  width: 90%;
  height: 90%;
`;
