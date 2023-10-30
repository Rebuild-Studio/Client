import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { basicColors, grayColors } from '@/resources/colors/colors';
import { CSSColor, CSSSize } from '@/types/style/cssUnits';
import Stack from '../stack/Stack';
import StackItem from '../stack/StackItem';

export interface Option {
  label: string;
  value: string;
}

interface Props {
  onClick?: (option: Option) => void;
  placeholder?: string;
  options: Option[];
  backgroundColor?: CSSColor;
  hoverBackgroundColor?: CSSColor;
  size?: CSSSize;
}

const Dropdown = ({
  onClick = () => {},
  options,
  placeholder = '선택된 옵션',
  backgroundColor = basicColors.white,
  hoverBackgroundColor = grayColors.panelGray,
  size = 'fit-content'
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [openList, setOpenList] = useState(false);

  //컴포넌트 외부 클릭시 리스트 닫기
  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setOpenList(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={ref} role="dropdown" size={size}>
      <Stack width="100%" border="none">
        <OpenButton
          role="dropdown-button"
          onClick={() => {
            setOpenList(!openList);
          }}
          $backgroundColor={backgroundColor}
          $hoverBackgroundColor={hoverBackgroundColor}
        >
          <span>{selectedOption?.label || placeholder}</span>
          {openList ? <CaretUp /> : <CaretDown />}
        </OpenButton>
        <CustomStack
          role="option-container"
          width="100%"
          border="none"
          $open={openList}
          $backgroundColor={backgroundColor}
          $hoverBackgroundColor={hoverBackgroundColor}
        >
          {openList &&
            options.map((option) => (
              <StackItem
                key={option.value}
                label={option.label}
                onClick={() => {
                  setSelectedOption(option);
                  setOpenList(false);
                  onClick(option);
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

interface ContainerProps {
  size: Props['size'];
}
const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${({ size }) => size};
  border: 1.5px solid ${grayColors.lightGray};
  border-radius: 5px;
`;

interface CustomStackProps {
  $open: boolean;
  $backgroundColor?: Props['backgroundColor'];
  $hoverBackgroundColor?: Props['hoverBackgroundColor'];
}

const CustomStack = styled(Stack)<CustomStackProps>`
  max-height: 240px;
  position: absolute;
  top: 100%;
  border: ${({ $open }) =>
    $open ? `1.5px solid ${grayColors.E2E2E2}` : 'none'};
  border-radius: 5px;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  z-index: 1;

  & > *:hover {
    color: ${basicColors.black};
  }
`;

interface OpenButtonProps {
  $backgroundColor?: Props['backgroundColor'];
  $hoverBackgroundColor?: Props['hoverBackgroundColor'];
}

const OpenButton = styled.button<OpenButtonProps>`
  width: 100%;
  min-width: 150px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  object-fit: fill;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  cursor: pointer;
  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    color: ${basicColors.white};
    border-radius: 0;
  }
`;

const CaretDown = () => (
  <img src="/icons/common/CaretDown.svg" alt="CaretDown" />
);
const CaretUp = () => <img src="/icons/common/CaretUp.svg" alt="CaretUp" />;
