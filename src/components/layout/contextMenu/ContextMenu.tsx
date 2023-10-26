import { basicColors, bgColors, grayColors } from '@/resources/colors/colors';
import { ContextMenuItemType } from '@/store/contextMenuStore';
import storeContainer from '@/store/storeContainer';
import { observer } from 'mobx-react';
import { styled } from 'styled-components';

interface ContextMenuProps extends ContextMenuPositionProps {
  items: ContextMenuItemType[];
}
const ContextMenu = (props: ContextMenuProps) => {
  const { contextMenuStore } = storeContainer;
  const renderContextMenuItem = (
    title: string,
    hotKey: string,
    isEnabled: boolean
  ) => {
    switch (title) {
      case 'DIVIDER':
        return <ContextMenuItemDivider />;
      default:
        return (
          <>
            <ContextMenuItemTitle $isEnabled={isEnabled}>
              {title}
            </ContextMenuItemTitle>
            <ContextMenuItemHotKey>{hotKey}</ContextMenuItemHotKey>
          </>
        );
    }
  };

  return (
    <ContextMenuWrapper $xPos={props.$xPos} $yPos={props.$yPos}>
      {props.items.map(([title, hotKey, isEnabled], i) => {
        return (
          <ContextMenuItemWrapper
            key={i}
            onClick={() => {
              if (isEnabled) {
                contextMenuStore.updateSelectedContextMenu(title);
              }
            }}
            $isEnabled={isEnabled}
          >
            {renderContextMenuItem(title, hotKey, isEnabled)}
          </ContextMenuItemWrapper>
        );
      })}
    </ContextMenuWrapper>
  );
};

const Observer = observer(ContextMenu);
export default Observer;

interface ContextMenuPositionProps {
  $xPos: number;
  $yPos: number;
}

const ContextMenuWrapper = styled.div<ContextMenuPositionProps>`
  position: fixed;
  left: ${(props) => `${props.$xPos}px`};
  top: ${(props) => `${props.$yPos}px`};
  background-color: ${bgColors['222222']};
  border-radius: 10px;
  z-index: 9;
`;

const ContextMenuItemWrapper = styled.div<{ $isEnabled: boolean }>`
  display: flex;
  min-width: 200px;
  box-sizing: border-box;
  font-size: 12px;
  cursor: ${({ $isEnabled }) => ($isEnabled ? 'pointer' : 'default')};
`;

const ContextMenuItemTitle = styled.div<{ $isEnabled: boolean }>`
  flex: 1;
  color: ${({ $isEnabled }) =>
    $isEnabled ? basicColors.white : grayColors['3a3a3a']};
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
