import { bgColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { styled } from "styled-components";

interface AppProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${bgColors.sceneBackground};
`;

const AppWrapper = observer((props: AppProps) => {
  const { keyboardEventStore } = storeContainer;
  const setOnKeydownListener = (e: KeyboardEvent) => {
    keyboardEventStore.updateKeyEvent({
      key: e.key,
      isCtrlPressed: e.ctrlKey,
      isShiftPressed: e.shiftKey,
      isAltPressed: e.altKey,
    });
  };

  const setOnKeyUpListener = (e: KeyboardEvent) => {
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
