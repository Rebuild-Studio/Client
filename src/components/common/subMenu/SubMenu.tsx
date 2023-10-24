import { fonts } from "@/resources/fonts/font";
import { styled, css } from "styled-components";
import { MenuItemType } from "./MenuItem.types";

type Props = {
  menuItems: MenuItemType[];
  isChild: boolean;
};

export const SubMenu = ({ menuItems, isChild }: Props) => {
  return (
    <Wrapper $isChild={isChild}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          onClick={item.onClick}
          $disabled={!!item.disabled}
        >
          <span>{item.label}</span>
          {item.children && (
            <img src="/icons/common/menu-arrow.svg" alt="right-arrow" />
          )}
          {item.children && (
            <SubMenu isChild={true} menuItems={item.children} />
          )}
        </MenuItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul<{ $isChild: boolean }>`
  border-radius: 8px;
  list-style-type: none;
  background-color: #393939;
  color: white;
  width: fit-content;
  padding: 6px;

  ${({ $isChild }) =>
    $isChild &&
    css`
      position: absolute;
      top: 0;
      left: 100%;
      display: none;
    `}
`;

const MenuItem = styled.li<{ $disabled: boolean }>`
  height: 32px;
  padding: 0 9px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${fonts.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:hover {
    background-color: #535353;
    & > ${Wrapper} {
      display: block;
    }
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      color: grey;
    `}

  & > img {
    transform: translate(32%, -6%);
    scale: 110%;
  }
`;
