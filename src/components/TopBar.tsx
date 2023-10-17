import { styled } from "styled-components";
import App from "@/interaction(legacyJS)/src/App";
import storeContainer from "@store/storeContainer";
import { basicColors } from "@resources/colors/colors";
import CanvasBar from "./CanvasBar";
import IconButton from "./buttons/IconButton";
import Button from "./common/Button";

interface TopBarProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar = ({ isOpen, setOpen }: TopBarProps) => {
  const { sceneSettingStore } = storeContainer;

  const sceneSettingToggle = () => {
    if (sceneSettingStore.type !== "scene") {
      sceneSettingStore.setType("scene");
    } else {
      sceneSettingStore.setType("none");
    }
  };

  return (
    <Wrapper>
      <Container>
        <AppBarWrapper>
          <AppBarItem>
            <Button
              label="캔버스"
              shadow="none"
              onClick={() => {
                setOpen(!isOpen);
              }}
            />
          </AppBarItem>
          <AppBarItem>
            <Button
              label="인터렉션 에디터"
              shadow="none"
              onClick={() => {
                setOpen(!isOpen);
              }}
              disabled={true}
            />
          </AppBarItem>
        </AppBarWrapper>
        <FlexBox />
        <ComponentName>컴포넌트 네임</ComponentName>
        <FlexBox />
        <IconButton
          Icon={() => <img src={"/icons/studio/icon_씬설정.svg"} />}
          onClick={sceneSettingToggle}
        />
        <IconButton
          Icon={() => <img src={"/icons/studio/icon_미리보기.svg"} />}
        />
      </Container>
      {isOpen && <CanvasBar />}
      {!isOpen && <App />}
      {/* [TBD] should not use isOpen, open state should be used repectively */}
    </Wrapper>
  );
};

export default TopBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  height: 54px;
  width: 100%;
  z-index: 1;
  background-color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const AppBarWrapper = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;

const AppBarItem = styled.div`
  margin-right: 20px;
  margin-left: 16px;
`;

const FlexBox = styled.div`
  flex-grow: 1;
`;

const ComponentName = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-weight: 400;
  color: ${basicColors.white};
  text-transform: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
