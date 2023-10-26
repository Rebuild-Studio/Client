import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Preview from '@/components/Preview';
import InteractionEditor from '@components/InteractionEditor.tsx';
import TopBar from '@components/TopBar';
import ToastContainer from '@components/common/ToastContainer';
import Tools from '@components/layout/Tools';
import editorModeStore from '@store/editorMode.store.ts';
import MenuBar from './components/MenuBar';
import ContextMenu from './components/layout/contextMenu/ContextMenu';
import Modal from './components/layout/modal/Modal';
import AppWrapper from './components/layout/wrapper/AppWrapper';
import storeContainer from './store/storeContainer';
import Scene from './three_components/common/Scene';

const App = () => {
  const { projectStateStore, contextMenuStore } = storeContainer;
  const { editorMode } = editorModeStore;

  return (
    <>
      <AppWrapper>
        <Header>
          <MenuBar />
          <TopBar />
        </Header>
        <Main>
          <EditorWrapper $visible={editorMode === 'canvas'}>
            <Scene />
            <Tools />
          </EditorWrapper>
          <EditorWrapper $visible={editorMode === 'interaction'}>
            <InteractionEditor />
          </EditorWrapper>
          <EditorWrapper $visible={editorMode === 'preview'}>
            {editorMode === 'preview' && <Preview />}
          </EditorWrapper>
        </Main>
      </AppWrapper>
      {projectStateStore.isModalOpened &&
        ReactDOM.createPortal(
          <Modal />,
          document.getElementById('modal-root')!
        )}
      {contextMenuStore.isContextMenuOpened && (
        <ContextMenu
          items={contextMenuStore.currentContextMenuType!.items}
          $xPos={contextMenuStore.currentContextMenuType!.xPos}
          $yPos={contextMenuStore.currentContextMenuType!.yPos}
        />
      )}
      <ToastContainer />
    </>
  );
};

const Observer = observer(App);
export default Observer;

const Header = styled.header``;

const Main = styled.main`
  position: relative;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

const EditorWrapper = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  height: 100%;
  position: relative;
`;
