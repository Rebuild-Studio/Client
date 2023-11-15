import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Flow from '@/react-flow/Flow.tsx';
import DragAreaSelectionBox from './DragAreaSelectionBox_V';
import GroupContextMenu from './context-menu/GroupContextMenu';
import NodeContextMenu from './context-menu/NodeContextMenu';
import PanelContextMenu from './context-menu/PanelContextMenu';
import SheetContextMenu from './context-menu/SheetContextMenu';
import InteractionHierarchy from './history-tab/interactionHierarchy';
import InteractionHistory from './history-tab/interactionHistory';
import NodeGroupV from './node/Group/NodeGroupV';
import NodeV from './node/NodeV';
import PreviewWire from './node/Wire/PreviewWire';
import WireV from './node/Wire/WireV';
import InteractionPanelEvents from './view-events/InteractionPanelEvents';
import RootVKeyboardEvent from './view-events/RootVKeyboardEvent';
import DataTypeGuideV from './views/DataTypeGuideV';
import SheetPanel from '../../00. Common/TopBarSheet_V';
import useIcon from '../../../hooks/useIcon';
import storeContainer from '../../../stores/storeContainer';

//Nodes: 스토어에 저장된 노드 배열에 따라 노드를 그림
const Nodes = observer(() => {
  const { eventSystem_store } = storeContainer;
  return eventSystem_store.nodes.map((node) => (
    <NodeV key={'nodeV' + node.uuid} node={node} />
  ));
});

//Wires: 스토어에 저장된 와이어 배열에 따라 와이어를 그림
const Wires = observer(() => {
  const { eventSystem_store } = storeContainer;
  return eventSystem_store.wires.map((wire) => {
    return <WireV key={'wireV' + wire.uuid} wire={wire} />;
  });
});

const Groups = observer(() => {
  const { eventSystem_store } = storeContainer;
  return eventSystem_store.groups.map((group) => (
    <NodeGroupV key={'groupV' + group.uuid} group={group} />
  ));
});
// btn_마우스;
const History = observer((props) => {
  const { common_store } = storeContainer;
  const historyIcon = useIcon('icon_history', {
    path: '/legacyJS/Icons/Studio/'
  });
  const hierarchyIcon = useIcon('icon_hierarchy', {
    path: '/legacyJS/Icons/Studio/'
  });
  const style = {
    historyIconWrapper: {
      width: '80px',
      height: '40px',
      display: 'flex',
      flexDirection: 'row'
    },
    IconButton: {
      width: '40px',
      height: '40px',
      backgroundColor: '#222222',
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer'
    }
  };
  return (
    <>
      <Box id="left" sx={style.historyIconWrapper}>
        <IconButton
          onClick={() => {
            common_store.optionLeftTab === 'history'
              ? common_store.changeLeftOption('')
              : common_store.changeLeftOption('history');
          }}
          sx={style.IconButton}
          style={{
            backgroundImage:
              common_store.optionLeftTab === 'history'
                ? historyIcon.root
                : historyIcon.active
          }}
        />
        <IconButton
          onClick={() => {
            common_store.optionLeftTab === 'hierarchy'
              ? common_store.changeLeftOption('')
              : common_store.changeLeftOption('hierarchy');
          }}
          sx={style.IconButton}
          style={{
            backgroundImage:
              common_store.optionLeftTab === 'hierarchy'
                ? hierarchyIcon.root
                : hierarchyIcon.active
          }}
        />
      </Box>
      {/* History & hierarchy List Pannel */}
      <Box
        id="left"
        sx={{
          height: common_store.topSlide
            ? `calc(100vh - ${204}px)`
            : `calc(100vh - ${114}px)`,
          display: 'flex',
          flexDirection: 'row',
          left: '0%',
          bottom: '40px',
          position: 'absolute',
          alignItems: 'flex-start'
        }}
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {common_store.optionLeftTab === 'history' && <InteractionHistory />}
        {common_store.optionLeftTab === 'hierarchy' && <InteractionHierarchy />}
      </Box>
    </>
  );
});

//Canvas : Interaction Canvas
//- 노드 그래프를 향하는 카메라의 위치, 줌에 따라 노드, 와이어의 포지셔닝을 수행
const Canvas = observer(() => {
  const { eventSystem_store } = storeContainer;
  if (!eventSystem_store.getSelectedSheet()) {
    return null;
  }
  const scale = eventSystem_store.cameraZoom;
  const translation = eventSystem_store.canvasSize.map((s, i) => {
    return s / 2 - scale * eventSystem_store.cameraPosition[i];
  });
  return (
    <Box
      style={{
        transform: `translate(${translation[0]}px, ${translation[1]}px)`
      }}
      id="interactionCanvas"
    >
      <Groups />
      <Nodes />
      <Wires />
      <PreviewWire />
      <NodeContextMenu />
      <GroupContextMenu />
      <SheetContextMenu />
      <PanelContextMenu />
    </Box>
  );
});

//InteractionPanel : 인터렉션 에디터 탭에 해당하는 탭패널
//- Presentation Logic 수행
//- Root 뷰에 키보드 이벤트를 할당
const InteractionPanel = observer(() => {
  const { eventSystem_store, interactionhistory_store } = storeContainer;
  const Event = new InteractionPanelEvents(
    eventSystem_store,
    interactionhistory_store
  );
  const legacyNodesInformation = eventSystem_store.getSelectedSheet().nodes;
  const _ref = useRef();
  useEffect(() => {
    if (!_ref.current) {
      return;
    }
    eventSystem_store.setCanvasSize([
      _ref.current.offsetWidth,
      _ref.current.offsetHeight
    ]);

    return () => {
      eventSystem_store.setCanvasSize(null);
    };
  }, [_ref, eventSystem_store]);

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'clip',
        backgroundColor: '#000',
        userSelect: 'none'
      }}
      data-name="panel"
      onContextMenu={Event.onContextMenu}
      onPointerDown={Event.onPointerDown}
      onPointerMove={Event.onPointerMove}
      onPointerUp={Event.onPointerUp}
      onWheel={Event.onWheel}
      ref={_ref}
    >
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          display: 'flex'
        }}
      >
        <History />
        <SheetPanel />
      </Box>
      <Flow />
      <DataTypeGuideV />
      <DragAreaSelectionBox />
      <RootVKeyboardEvent domElement={_ref?.current?.parentElement} />
    </Box>
  );
});

export default InteractionPanel;
