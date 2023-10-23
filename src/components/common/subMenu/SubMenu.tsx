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
          $disabled={!!item.disabled}
        >
          <span>{item.label}</span>
          {item.children && (
            <img src="/icons/common/menu-arrow.svg" alt="right-arrow" />
          )}
          {item.children && (
            <ChildrenWrapper>
              {item.children.map((child) => (
                <MenuItem
                  key={child.label}
                  onClick={child.onClick}
                  $disabled={!!child.disabled}
                >
                  <span>{child.label}</span>
                </MenuItem>
              ))}
            </ChildrenWrapper>
          )}
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

const ChildrenWrapper = styled(Wrapper)`
  position: absolute;
  top: 0;
  transform: translate(calc(100% + 2px), 0);
  display: none;
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
    ${ChildrenWrapper} {
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
    transform: translate(20%, -6%);
    scale: 110%;
  }
`;
