import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { ContextMenuItemType } from "@/store/contextMenuStore";
import { observer } from "mobx-react-lite";
import { styled } from "styled-components";

interface ContextMenuPositionProps {
  xPos: number;
  yPos: number;
}

interface ContextMenuProps extends ContextMenuPositionProps {
  items: ContextMenuItemType[];
}

const ContextMenuWrapper = styled.div<ContextMenuPositionProps>`
  position: fixed;
  left: ${(props) => `${props.xPos}px`};
  top: ${(props) => `${props.yPos}px`};
  background-color: ${bgColors["222222"]};
  border-radius: 10px;
  z-index: 9;
`;

const ContextMenuItemWrapper = styled.div<{ isEnabled: boolean }>`
  display: flex;
  min-width: 200px;
  box-sizing: border-box;
  font-size: 12px;
  cursor: ${({ isEnabled }) => (isEnabled ? "pointer" : "default")};
`;

const ContextMenuItemTitle = styled.div<{ isEnabled: boolean }>`
  flex: 1;
  color: ${({ isEnabled }) =>
    isEnabled ? basicColors.white : grayColors["3a3a3a"]};
  font-weight: 700;
  text-align: left;
  box-sizing: border-box;
  padding: 8px 12px;
`;

const ContextMenuItemHotKey = styled.div`
  color: ${grayColors[535353]};
  padding: 8px 12px;
  font-weight: 700;
  box-sizing: border-box;
`;

const ContextMenuItemDivider = styled.div`
  flex: 1;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid ${grayColors[535353]};
`;

const ContextMenu = observer((props: ContextMenuProps) => {
  const renderContextMenuItem = (value: ContextMenuItemType) => {
    switch (value[0]) {
      case "DIVIDER":
        return <ContextMenuItemDivider />;
      default:
        return (
          <>
            <ContextMenuItemTitle isEnabled={value[3]}>
              {value[0]}
            </ContextMenuItemTitle>
            <ContextMenuItemHotKey>{value[1]}</ContextMenuItemHotKey>
          </>
        );
    }
  };

  return (
    <ContextMenuWrapper xPos={props.xPos} yPos={props.yPos}>
      {props.items.map((value) => {
        return (
          <ContextMenuItemWrapper
            onClick={() => {
              console.log(value);
              if (value[3]) {
                value[2]();
              }
            }}
            isEnabled={value[3]}
          >
            {renderContextMenuItem(value)}
          </ContextMenuItemWrapper>
        );
      })}
    </ContextMenuWrapper>
  );
});

export default ContextMenu;
