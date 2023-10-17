import { useEffect } from "react";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import storeContainer from "@store/storeContainer";
import { bgColors } from "@resources/colors/colors";

interface AppProps {
  children: React.ReactNode;
}

const AppWrapper = observer((props: AppProps) => {
  const { keyboardEventStore } = storeContainer;
  const setOnKeydownListener = (e: KeyboardEvent) => {
    if (e.key === "F12") {
      return;
    }
    e.preventDefault();
    keyboardEventStore.updateKeyEvent({
      key: e.key,
      isCtrlPressed: e.ctrlKey,
      isShiftPressed: e.shiftKey,
      isAltPressed: e.altKey
    });
  };

  const setOnKeyUpListener = (e: KeyboardEvent) => {
    e.preventDefault();
    keyboardEventStore.clearKeyEvent();
  };

  useEffect(() => {
    window.addEventListener("keydown", setOnKeydownListener);
    window.addEventListener("keyup", setOnKeyUpListener);

    return () => {
      window.removeEventListener("keydown", setOnKeydownListener);
      window.removeEventListener("keyup", setOnKeyUpListener);
    };
  }, []);

  return <Wrapper>{props.children}</Wrapper>;
});

export default AppWrapper;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${bgColors.sceneBackground};
`;
