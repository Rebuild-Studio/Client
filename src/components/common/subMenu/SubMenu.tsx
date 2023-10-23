import { fonts } from "@/resources/fonts/font";
import { styled, css } from "styled-components";
import { MenuItemType } from "./MenuItem.types";

type Props = {
  menuItems: MenuItemType[];
};

export const SubMenu = ({ menuItems }: Props) => {
  return (
    <Wrapper>
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          onClick={item.onClick}
          $disabled={item.disabled}
        >
          {item.label}
        </MenuItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  border-radius: 8px;
  list-style-type: none;
  background-color: #393939;
  color: white;
  width: fit-content;
  padding: 6px;
`;

const MenuItem = styled.li<{ $disabled: boolean }>`
  padding: 9px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${fonts.default};

  &:hover {
    background-color: #535353;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      color: grey;
    `}
`;
