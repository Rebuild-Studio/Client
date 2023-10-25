import React, { useState } from "react";
import styled from "styled-components";
import { grayColors, basicColors } from "@/resources/colors/colors";

interface MenuProps {
  title: string;
  MenuItem: React.ReactNode;
  openMenu?: boolean;
  anchorButton?: React.ReactNode;
  anchorElement?: HTMLElement | null;
  handleClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const CustomMenu = ({
  title,
  MenuItem,
  openMenu = true,
  anchorButton = <></>,
  anchorElement = null,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(anchorElement);
  const [open, setOpen] = useState(openMenu);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    !open ? handleOpen(event) : handleClose();
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // 클릭한 버튼을 앵커로 설정
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null); // 메뉴 닫기
    setOpen(false);
  };

  return (
    <Wrapper>
      <AnchorButton onClick={handleToggle}>Open Menu</AnchorButton>
      {anchorButton}
      {anchorEl && (
        <StyledMenu
          anchorTop={anchorEl.offsetTop - anchorEl.clientHeight - 300}
          open={open}
          anchorLeft={anchorEl.offsetLeft - 368}
        >
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <ContentWrapper>{MenuItem}</ContentWrapper>
          <ButtonWrapper>
            <button onClick={handleClose}>Close Menu</button>
          </ButtonWrapper>
        </StyledMenu>
      )}
    </Wrapper>
  );
};
export default CustomMenu;

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.3vh;
`;

const Title = styled.span`
  width: calc(100% - 3.2vh);
  font-family: SourceHanSansKR;
  font-size: 1.3vh;
  font-weight: 500;
  color: ${basicColors.white};
`;

const StyledMenu = styled.div<{
  open: boolean;
  anchorLeft: number;
  anchorTop: number;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${({ anchorTop }) => `calc(${anchorTop}px - 2.4vh)`};
  left: ${({ anchorLeft }) => anchorLeft}px;
  width: 24.5vh;
  height: 66.9vh;
  border-radius: 3px;
  background-color: ${grayColors["3a3a3a"]};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 3;
  transition: opacity 0.5ms ease-in-out, transform 2s ease-in-out;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0.8)")};
`;

const ContentWrapper = styled.div`
  overflow: auto;
  height: 57vh;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
`;

const AnchorButton = styled.button`
  position: relative;
`;
