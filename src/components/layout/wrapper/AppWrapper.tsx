import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { styled } from 'styled-components';
import { bgColors } from '@/resources/colors/colors';
import storeContainer from '@/store/storeContainer';
import { isCtrlEventTrigger } from '@/utils/platform/getPlatformKeyboardEvent';

interface AppProps {
  children: React.ReactNode;
}

const AppWrapper = (props: AppProps) => {
  const { keyboardEventStore, projectStateStore, editorModeStore } =
    storeContainer;

  const setOnKeydownListener = (e: KeyboardEvent) => {
    // F12, 모달이 열려있을 때는 키보드 이벤트를 무시한다.
    if (projectStateStore.isModalOpened) {
      return;
    }

    if (editorModeStore.editorMode === 'interaction') {
      return;
    }

    if (e.key === 'F12') {
      return;
    }

    e.preventDefault();

    keyboardEventStore.updateKeyEvent({
      key: e.key,
      isCtrlPressed: isCtrlEventTrigger(e),
      isShiftPressed: e.shiftKey,
      isAltPressed: e.altKey
    });
  };

  const setOnKeyUpListener = (e: KeyboardEvent) => {
    e.preventDefault();
    keyboardEventStore.clearKeyEvent();
  };

  useEffect(() => {
    window.addEventListener('keydown', setOnKeydownListener);
    window.addEventListener('keyup', setOnKeyUpListener);

    return () => {
      window.removeEventListener('keydown', setOnKeydownListener);
      window.removeEventListener('keyup', setOnKeyUpListener);
    };
  }, []);

  return <Wrapper>{props.children}</Wrapper>;
};

const Observer = observer(AppWrapper);
export default Observer;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${bgColors.sceneBackground};
`;
