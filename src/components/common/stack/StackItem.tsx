import { basicColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSColor } from "@/types/style/CssUnits";
import { styled } from "styled-components";

interface ContainerProps {
  $hoverBackgroundColor: Props["hoverBackgroundColor"];
  $cursor: Props["cursor"];
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${grayColors.E2E2E2};
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  cursor: ${({ $cursor }) => $cursor};
  font-size: ${fonts.default};

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    color: ${basicColors.white};
  }
`;

interface Props {
  className?: string;
  onClick?: () => void;
  label?: string;
  hoverBackgroundColor?: CSSColor;
  cursor?: "pointer" | "default";
  children?: React.ReactNode;
}

const StackItem = ({
  className,
  onClick,
  label,
  hoverBackgroundColor = grayColors.lightGray,
  children,
  cursor = "pointer",
}: Props) => {
  return (
    <Container
      className={className}
      onClick={onClick}
      $hoverBackgroundColor={hoverBackgroundColor}
      $cursor={cursor}
    >
      <span>{label}</span>
      {children}
    </Container>
  );
};

export default StackItem;
