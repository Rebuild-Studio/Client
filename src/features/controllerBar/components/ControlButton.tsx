import { styled } from 'styled-components';

import { basicColors } from '@resources/colors/colors';

interface Props {
  icon: JSX.Element;
  onClick?: () => void;
  activated?: boolean;
}

const ControlButton = ({ icon, onClick, activated }: Props) => {
  return (
    <Button onClick={onClick} $highlight={activated}>
      {icon}
    </Button>
  );
};

export default ControlButton;

const Button = styled.button<{ $highlight?: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ $highlight }) => ($highlight ? basicColors.limeGreen : 'white')};

  &:hover {
    color: ${basicColors.limeGreen};
  }
`;
