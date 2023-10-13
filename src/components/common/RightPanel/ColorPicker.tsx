import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { grayColors } from "@/resources/colors/colors";
import { RgbaColor, hsvaToRgba, HsvaColor } from "@uiw/color-convert";
import ColorContent from "./ColorContent";

interface ColorPickerProps {
  label: string;
  color: any;
  onChangeHsv: (hsva: HsvaColor) => void;
  onChangeA: (alpha: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1;
`;
const Container = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Header = styled.div`
  font-family: Inter;
  font-size: 11px;
  color: ${grayColors.E2E2E2};
`;

const StyledMenu = styled.div<{
  open: boolean;
  anchorLeft: number;
  anchorTop: number;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  top: ${({ anchorTop }) => `calc(${anchorTop}px - 2.4vh)`};
  left: ${({ anchorLeft }) => anchorLeft}px;
  width: 245px;
  height: 412.7px;
  border-radius: 3px;
  background-color: ${grayColors["3a3a3a"]};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 3;
  // transition: opacity 0.5ms ease-in-out, transform 2s ease-in-out;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0.8)")};
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;
const ColorButton = styled.button<{
  color: HsvaColor;
  rgbColor: RgbaColor;
}>`
  width: 24px;
  min-width: 0;
  min-height: 0;
  height: 24px;
  background-color: ${(props) =>
    typeof props.color !== "undefined" &&
    `rgba(${props.rgbColor.r},${props.rgbColor.g},${props.rgbColor.b},${props.rgbColor.a})`};
`;

const ColorPicker = observer(
  ({ label, color, onChangeHsv, onChangeA }: ColorPickerProps) => {
    const [anchorMenu, setAnchorMenu] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(true);
    const rgbColor = hsvaToRgba(color);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      !open ? handleOpen(event) : handleClose();
    };

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorMenu(event.currentTarget); // 클릭한 버튼을 앵커로 설정
      setOpen(true);
    };
    const handleClose = () => {
      setAnchorMenu(null);
      setOpen(false);
    };

    // useRef를 사용하여 ColorPicker 컴포넌트의 루트 엘리먼트를 추적
    const rootRef = useRef<HTMLDivElement>(null);

    // 클릭 이벤트가 발생했을 때 다른 컴포넌트 닫기
    const handleGlobalClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      // 컴포넌트가 마운트될 때 전역 클릭 이벤트 핸들러를 등록
      window.addEventListener("click", handleGlobalClick);
      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 해제
        window.removeEventListener("click", handleGlobalClick);
      };
    }, []);

    return (
      <Wrapper ref={rootRef}>
        <ColorButton color={color} rgbColor={rgbColor} onClick={handleToggle} />
        {anchorMenu && (
          <StyledMenu
            anchorTop={anchorMenu.offsetTop - anchorMenu.clientHeight - 200}
            open={open}
            anchorLeft={anchorMenu.offsetLeft - 468}
          >
            <Container>
              <Header>{label}</Header>
              <ColorContent
                rgbColor={rgbColor}
                color={color}
                onChangeHsv={onChangeHsv}
                onChangeA={onChangeA}
              />
              <ButtonWrapper>
                <button onClick={handleClose}>Close Menu</button>
              </ButtonWrapper>
            </Container>
          </StyledMenu>
        )}
      </Wrapper>
    );
  }
);
export default ColorPicker;
