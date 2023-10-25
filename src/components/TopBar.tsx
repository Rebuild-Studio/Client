import IconButton from "./buttons/IconButton";
import Button from "./common/Button";
import { styled } from "styled-components";
import { basicColors } from "@/resources/colors/colors";
import storeContainer from "@/store/storeContainer";
import { fonts } from "@resources/fonts/font";
import editorModeStore from "@store/editorModeStore";
import { ConfirmBox } from "./layout/modal/ConfirmBox";
import { observer } from "mobx-react-lite";

const TopBar = observer(() => {
  const { sceneSettingStore, primitiveStore, projectStore, projectStateStore } =
    storeContainer;
  const { editorMode, setEditorMode, toggleCanvasBar, toggleInteractionBar } =
    editorModeStore;

  return (
    <Wrapper>
      <Left>
        <Button
          label="캔버스"
          shadow="none"
          onClick={() => {
            if (editorMode === "canvas") {
              toggleCanvasBar();
            } else {
              setEditorMode("canvas");
            }
          }}
          color={editorMode === "canvas" ? basicColors.white : basicColors.grey}
        />
        <Button
          label="인터렉션 에디터"
          shadow="none"
          onClick={() => {
            if (editorMode === "interaction") {
              toggleInteractionBar();
            } else {
              setEditorMode("interaction");
            }
          }}
          color={
            editorMode === "interaction" ? basicColors.white : basicColors.grey
          }
        />
      </Left>
      <Center>
        <ComponentName
          onClick={() => {
            projectStateStore.updateModalComponent(
              <ConfirmBox label={"컴포넌트 이름 변경"} hasContent={true} />
            );
            projectStateStore.updateModalState(true);
          }}
        >
          {projectStore.projectName}
        </ComponentName>
      </Center>
      <Right>
        <IconButton
          Icon={() => (
            <img src={"/icons/studio/icon_씬설정.svg"} alt="씬설정" />
          )}
          onClick={() => {
            sceneSettingStore.toggleVisibility();
            primitiveStore.clearSelectedPrimitives();
          }}
        />
        <IconButton
          Icon={() => (
            <img src={"/icons/studio/icon_미리보기.svg"} alt="미리보기" />
          )}
        />
      </Right>
    </Wrapper>
  );
});

export default TopBar;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 18px;
  background-color: #222222;

  img {
    margin: 0;
  }
`;

const ComponentName = styled.span`
  font-family: SpoqaHanSansNeo;
  font-size: ${fonts.default};
  font-weight: 550;
  color: ${basicColors.white};
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  gap: 32px;
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Right = styled.div`
  display: flex;
`;
