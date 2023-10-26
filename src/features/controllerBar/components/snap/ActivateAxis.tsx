import { observer } from 'mobx-react';
import { css, styled } from 'styled-components';
import controllerBarStore from '@/features/controllerBar/store/controllerBar.store.ts';
import { basicColors, bgColors, grayColors } from '@resources/colors/colors';
import { fonts } from '@resources/fonts/font';

interface Props {
  enabled: boolean;
}
const ActivateAxis = ({ enabled }: Props) => {
  const { surfaceSnapAxisEnabled, setSurfaceSnapAxis } = controllerBarStore;

  return (
    <Wrapper $disabled={!enabled}>
      <Button
        $highlight={surfaceSnapAxisEnabled}
        onClick={() => setSurfaceSnapAxis(true)}
      >
        축 활성화
        <Shortcut $highlight={surfaceSnapAxisEnabled}>S</Shortcut>
      </Button>
      <Button
        $highlight={!surfaceSnapAxisEnabled}
        onClick={() => setSurfaceSnapAxis(false)}
      >
        축 비활성화
        <Shortcut $highlight={!surfaceSnapAxisEnabled}>N</Shortcut>
      </Button>
    </Wrapper>
  );
};

const Observer = observer(ActivateAxis);
export default Observer;

const Wrapper = styled.div<{ $disabled: boolean }>`
  display: flex;
  color: ${basicColors.grey};

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      opacity: 40%;
    `}
`;

const Button = styled.button<{ $highlight: boolean }>`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 4px 6px;
  border: 1px solid ${bgColors['404040']};
  font-size: ${fonts.xs};
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
  
  & > span {
    margin-left: 4px;
  }
  
  ${({ $highlight }) =>
    $highlight &&
    css`
      color: ${basicColors.limeGreen};
      background-color: #464b28;
      border-color: #464b28;
    `}
    }
`;

const Shortcut = styled.span<{ $highlight: boolean }>`
  color: ${({ $highlight }) => ($highlight ? '#8b9643' : grayColors['535353'])};
`;
