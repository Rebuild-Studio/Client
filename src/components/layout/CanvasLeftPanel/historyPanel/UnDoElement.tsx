import { useRef } from 'react';
import { observer } from 'mobx-react';
import { styled } from 'styled-components';
import { grayColors } from '@/resources/colors/colors';
import { fonts } from '@/resources/fonts/font';
import canvasHistoryStore from '@store/canvasHistory.store.ts';

type Props = {
  label: string;
  index: number;
};

const UndoElement = ({ label, index }: Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <HistoryElement
      onClick={() => {
        canvasHistoryStore.undoListElementClick(index);
      }}
    >
      <img src="/icons/studio/icon_비표시.png" alt="non-label" />
      <HistoryText ref={textRef}>{label}</HistoryText>
    </HistoryElement>
  );
};

const Observer = observer(UndoElement);
export default Observer;

const HistoryElement = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  gap: 4px;
  cursor: pointer;
  color: ${grayColors.panelGray};
`;

const HistoryText = styled.span`
  font-size: ${fonts.default};
  margin-bottom: 3px;
`;
