import { useRef, useState } from "react";
import { basicColors, bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import { styled } from "styled-components";
import { ItemChildren } from "./ItemChildren";
import { MenuItemType } from "./MenuItem.types";
import { Item } from "./Item";

type Props = {
  menuItems: MenuItemType[];
  color?: CSSHexColor;
  backgroundColor?: CSSHexColor;
  hoverBackgroundColor?: CSSHexColor;
  disabledColor?: CSSHexColor;
  fontSize?: FontType;
  top?: string;
  left?: string;
};

type CSSMenuBox = {
  $left: string;
  $top: string;
  $color: CSSHexColor;
  $backgroundColor: CSSHexColor;
  $fontSize: FontType;
};

const MenuBox = styled.ul<CSSMenuBox>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  color: ${({ $color }) => $color};
  padding: 2px 4px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 4px;
  width: 200px;
  font-size: ${({ $fontSize }) => fonts[$fontSize]};
  z-index: 1;
  list-style-type: none;
  margin: 0;
`;

export const SubMenu = (props: Props) => {
  const {
    menuItems,
    color = basicColors.white,
    backgroundColor = bgColors[101728],
    left = "0",
    top = "0",
    fontSize = "medium",
  } = props;

  const [newMenu, setNewMenu] = useState<JSX.Element | null>(null);
  const ref = useRef<HTMLUListElement>(null);

  return (
    <>
      <MenuBox
        ref={ref}
        $color={color}
        $backgroundColor={backgroundColor}
        $top={top}
        $left={left}
        $fontSize={fontSize}
      >
        {menuItems.map((item: MenuItemType, index: number) => {
          const itemProps = {
            label: item.label,
            disabled: item.disabled,
            key: `${item.label}_${index}`,
          };
          if ("children" in item) {
            // 자식이 있는 메뉴
            return (
              <ItemChildren
                {...itemProps}
                onMouseEnter={() => {
                  setNewMenu(null);

                  if (item.disabled) return;

                  const height = ref
                    .current!.getElementsByTagName("li")
                    .item(0)!.clientHeight;

                  setNewMenu(
                    <SubMenu
                      {...props}
                      key={`` + index + item.label}
                      menuItems={item.children}
                      left={"calc(100% + 2px)"}
                      top={`${index * height}px`}
                    />
                  );
                }}
              />
            );
          } else {
            // 자식이 없는 일반 메뉴
            return (
              <Item
                {...itemProps}
                onClick={() => {
                  if (!item.disabled) item.onClick();
                }}
                onMouseEnter={() => {
                  setNewMenu(null);
                }}
              />
            );
          }
        })}
        {newMenu}
      </MenuBox>
    </>
  );
};
