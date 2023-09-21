import React, { useState } from "react";
import styled from "styled-components";
import { grayColors, basicColors } from "@/resources/colors/colors";
import Grid from "../common/Grid";

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
  z-index: 1000;
  transition: opacity 2s ease-in-out, transform 2s ease-in-out;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0.8)")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const AnchorButton = styled.button`
  position: relative;
`;

interface MenuProps {
  title: string;
  MenuItem: React.ReactNode[];
}
const CustomMenu = ({ title, MenuItem }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // 클릭한 버튼을 앵커로 설정
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null); // 메뉴 닫기
    setOpen(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <AnchorButton onClick={handleClick}>Open Menu</AnchorButton>
      {anchorEl && (
        <StyledMenu
          anchorTop={anchorEl.offsetTop - anchorEl.clientHeight - 300}
          open={open}
          anchorLeft={anchorEl.offsetLeft - 368}
        >
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <Grid items={MenuItem} columns={2}></Grid>
          <div style={{ flexGrow: "1" }} />
          <ButtonWrapper>
            <button onClick={handleClose}>Close Menu</button>
          </ButtonWrapper>
        </StyledMenu>
      )}
    </div>
  );
};
export default CustomMenu;
