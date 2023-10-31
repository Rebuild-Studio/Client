import React from 'react';
import styled from 'styled-components';
import { basicColors, grayColors } from '@/resources/colors/colors';

interface MenuProps {
  title: string;
  MenuItem?: React.ReactNode;
  openMenu?: boolean;
  anchorButton?: React.ReactNode;
  anchorElement?: HTMLElement | null;
  handleClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

const CustomMenu = ({
  openMenu = true,
  title = '',
  anchorElement = null,
  MenuItem = <></>,
  handleClose
}: MenuProps) => {
  return (
    <Wrapper>
      {anchorElement && (
        <StyledMenu
          $anchorBottom={
            anchorElement.offsetTop + anchorElement.clientHeight - 200
          }
          $open={openMenu}
          $anchorRight={anchorElement.offsetLeft}
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
  $open: boolean;
  $anchorRight: number;
  $anchorBottom: number;
}>`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: ${({ $anchorBottom }) => $anchorBottom}px;
  right: ${({ $anchorRight }) => $anchorRight}px;
  transform: translate(-50%, -50%);
  width: 24.5vh;
  height: fit-content;
  max-height: 66.9vh;
  border-radius: 3px;
  background-color: ${grayColors['3a3a3a']};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 3;
  transition:
    opacity 0.5ms ease-in-out,
    transform 2s ease-in-out;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
`;

const ContentWrapper = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
`;
