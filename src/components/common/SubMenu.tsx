import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { CSSHexColor } from "@/types/style/CssUnits";
import { FontType } from "@/types/style/Font";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type MenuItem = {
  label: string;
  disabled: boolean;
  children?: MenuItem[];
  onClick?: () => void;
};

type Props = {
  data: MenuItem[];
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
    data,
    color = basicColors.white,
    backgroundColor = bgColors[101728],
    hoverBackgroundColor = grayColors[535353],
    disabledColor = grayColors[535353],
    left = "0",
    top = "0",
    fontSize = "medium",
  } = props;
  const [newMenu, setNewMenu] = useState<JSX.Element | null>(null);

  useEffect(() => {
    return () => {
      setNewMenu(null);
    };
  }, [data]);
  return (
    <>
      <MenuBox
        $color={color}
        $backgroundColor={backgroundColor}
        $top={top}
        $left={left}
        $fontSize={fontSize}
      >
        {data.map((v, i) => (
          <Item
            $hoverBackgroundColor={hoverBackgroundColor}
            $disabledColor={disabledColor}
            onClick={() => {
              if (v.onClick && !v.disabled) v.onClick();
            }}
            className={v.disabled ? "disabled" : ""}
            onMouseEnter={(e) => {
              setNewMenu(null);

              if (!v.children || v.disabled) return;
              const element = e.target as HTMLElement;

              setNewMenu(
                <SubMenu
                  {...props}
                  data={v.children}
                  left={"calc(100% + 2px)"}
                  top={`${i * element.clientHeight}px`}
                />
              );
            }}
            key={i}
          >
            <span>{v.label}</span>
            {v.children && <span style={{ float: "right" }}>{">"}</span>}
          </Item>
        ))}
        {newMenu}
      </MenuBox>
    </>
  );
};

export default SubMenu;
