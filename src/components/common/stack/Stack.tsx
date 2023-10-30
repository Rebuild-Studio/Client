import { styled } from 'styled-components';
import { grayColors } from '@/resources/colors/colors';
import { CSSColor, CSSSize } from '@/types/style/cssUnits';

interface Props {
  className?: string;
  role?: string;
  hoverBackgroundColor?: CSSColor;
  height?: CSSSize;
  width?: CSSSize;
  border?: string;
  children?: React.ReactNode;
}

const Stack = ({
  className,
  role = 'stack',
  children,
  width = 'fit-content',
  height = 'fit-content',
  border
}: Props) => {
  return (
    <Container
      className={className}
      role={role}
      $width={width}
      $height={height}
      $border={border}
    >
      {children}
    </Container>
  );
};

export default Stack;

interface ContainerProps {
  $width: Props['width'];
  $height: Props['height'];
  $border: Props['border'];
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  border: ${({ $border }) => $border || `1px solid ${grayColors.E2E2E2}`};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;
