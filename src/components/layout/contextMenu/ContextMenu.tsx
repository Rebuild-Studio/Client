import { basicColors, bgColors } from "@/resources/colors/colors";
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
  left: ${(props) => props.xPos};
  top: ${(props) => props.yPos};
  background-color: ${bgColors["222222"]};
  border-radius: 10px;
  z-index: 99;
  cursor: pointer;
`;

const ContextMenuItemWrapper = styled.div`
  display: flex;
  min-width: 200px;
  box-sizing: border-box;
`;

const ContextMenuItemTitle = styled.div`
  flex: 1;
  color: ${basicColors.white};
  font-weight: 700;
  text-align: left;
  box-sizing: border-box;
  padding: 4px 8px;
`;

const ContextMenuItemHotKey = styled.div`
  color: ${bgColors["282828"]};
  padding: 4px 8px;
  box-sizing: border-box;
`;

const ContextMenuItemDivider = styled.div`
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid ${bgColors["282828"]};
`;

const ContextMenu = observer((props: ContextMenuProps) => {
  const renderContextMenuItem = (value: ContextMenuItemType) => {
    switch (value[0]) {
      case "DIVIDER":
        return <ContextMenuItemDivider />;
      default:
        return (
          <>
            <ContextMenuItemTitle>{value[0]}</ContextMenuItemTitle>
            <ContextMenuItemHotKey>{value[1]}</ContextMenuItemHotKey>
          </>
        );
    }
  };

  return (
    <ContextMenuWrapper xPos={props.xPos} yPos={props.yPos}>
      {props.items.map((value) => {
        return (
          <ContextMenuItemWrapper onClick={value[2]}>
            {renderContextMenuItem(value)}
          </ContextMenuItemWrapper>
        );
      })}
    </ContextMenuWrapper>
  );
});

export default ContextMenu;
