import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Stack from "../stack/Stack";
import { basicColors, grayColors } from "@/resources/colors/colors";
import { CSSColor, CSSSize } from "@/types/style/CssUnits";
import StackItem from "../stack/StackItem";

interface ContainerProps {
  size: Props["size"];
  hoverBackgroundColor: Props["hoverBackgroundColor"];
}
const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${({ size }) => size};
  border: 1.5px solid ${grayColors[808080]};
  border-radius: 5px;
`;

const CustomStack = styled(Stack)<{ $open: boolean }>`
  max-height: 240px;
  position: absolute;
  top: 100%;
  border: ${({ $open }) =>
    $open ? `1.5px solid ${grayColors[808080]}` : "none"};
  border-radius: 5px;
  overflow-y: auto;
  box-sizing: border-box;

  & > *:hover {
    color: ${basicColors.black};
  }
`;

const OpenButton = styled.button`
  width: 100%;
  min-width: 150px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border: none;
  border-radius: 0;
  box-shadow: none;
  object-fit: fill;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${grayColors.panelGray};
    color: ${basicColors.white};
    border-radius: 0;
  }
`;

export interface Option {
  label: string;
  value: string;
}

interface Props {
  placeholder?: string;
  options: Option[];
  hoverBackgroundColor?: CSSColor;
  size?: CSSSize;
}

const Dropdown = ({
  options,
  placeholder = "선택된 옵션",
  hoverBackgroundColor,
  size = "fit-content",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [openList, setOpenList] = useState(false);

  const CaretDown = () => (
    <img src="/icons/common/CaretDown.svg" alt="CaretDown" />
  );
  const CaretUp = () => <img src="/icons/common/CaretUp.svg" alt="CaretUp" />;

  //컴포넌트 외부 클릭시 리스트 닫기
  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setOpenList(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container
      ref={ref}
      role="dropdown"
      size={size}
      hoverBackgroundColor={hoverBackgroundColor}
    >
      <Stack width="100%" border="none">
        <OpenButton
          onClick={() => {
            setOpenList(!openList);
          }}
        >
          <span>{selectedOption?.label || placeholder}</span>
          {openList ? <CaretUp /> : <CaretDown />}
        </OpenButton>
        <CustomStack
          role="option-container"
          width="100%"
          border="none"
          $open={openList}
        >
          {openList &&
            options.map((option) => (
              <StackItem
                key={option.value}
                label={option.label}
                onClick={() => {
                  setSelectedOption(option);
                  setOpenList(false);
                }}
              />
            ))}
          {openList && options.length === 0 && (
            <StackItem
              label="옵션이 없습니다."
              hoverBackgroundColor={grayColors.panelGray}
              cursor="default"
            />
          )}
        </CustomStack>
      </Stack>
    </Container>
  );
};

export default Dropdown;
