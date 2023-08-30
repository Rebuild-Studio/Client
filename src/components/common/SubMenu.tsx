import { useEffect, useRef, useState } from "react";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import { styled } from "styled-components";

/**
 * 일반 메뉴 아이템
 */
interface Item {
  label: string;
  disabled: boolean;
  onClick: () => void;
}
/**
 * 자식이 있는 메뉴 아이템
 */
interface ItemWithChildren {
  label: string;
  disabled: boolean;
  children: MenuItem[];
}

export type MenuItem = Item | ItemWithChildren;

type Props = {
  menuItems: MenuItem[];
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

type CSSItem = {
  $hoverBackgroundColor: CSSHexColor;
  $disabledColor: CSSHexColor;
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

const Item = styled.li<CSSItem>`
  padding: 2px;

  &.disabled {
    color: ${({ $disabledColor }) => $disabledColor};
  }

  &:not(.disabled):hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
  }
`;

const SubMenu = (props: Props) => {
  const {
    menuItems,
    color = basicColors.white,
    backgroundColor = bgColors[101728],
    hoverBackgroundColor = grayColors[535353],
    disabledColor = grayColors[535353],
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
        {menuItems.map((item: MenuItem, index: number) => {
          if ("children" in item) {
            // 자식이 있는 메뉴
            return (
              <Item
                key={item.label + index}
                $hoverBackgroundColor={hoverBackgroundColor}
                $disabledColor={disabledColor}
                className={item.disabled ? "disabled" : ""}
                onMouseEnter={() => {
                  setNewMenu(null);

                  if (item.disabled) return;

                  const height = ref
                    .current!.getElementsByTagName("li")
                    .item(0)!.clientHeight;

                  setNewMenu(
                    <SubMenu
                      {...props}
                      menuItems={item.children}
                      left={"calc(100% + 2px)"}
                      top={`${index * height}px`}
                    />
                  );
                }}
              >
                <span>{item.label}</span>
                <span style={{ float: "right" }}>{">"}</span>
              </Item>
            );
          } else {
            // 자식이 없는 일반 메뉴
            return (
              <Item
                key={item.label + index}
                $hoverBackgroundColor={hoverBackgroundColor}
                $disabledColor={disabledColor}
                className={item.disabled ? "disabled" : ""}
                onClick={() => {
                  if (!item.disabled) item.onClick();
                }}
              >
                <span>{item.label}</span>
              </Item>
            );
          }
        })}
        {newMenu}
      </MenuBox>
    </>
  );
};

export default SubMenu;
