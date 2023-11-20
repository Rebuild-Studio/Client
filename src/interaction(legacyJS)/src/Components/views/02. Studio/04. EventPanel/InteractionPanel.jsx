import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactFlowProvider } from 'reactflow';
import InteractionCanvas from '@/features/interaction/components/InteractionCanvas';
import InteractionHierarchy from './history-tab/interactionHierarchy';
import InteractionHistory from './history-tab/interactionHistory';
import InteractionPanelEvents from './view-events/InteractionPanelEvents';
import RootVKeyboardEvent from './view-events/RootVKeyboardEvent';
import DataTypeGuideV from './views/DataTypeGuideV';
import SheetPanel from '../../00. Common/TopBarSheet_V';
import useIcon from '../../../hooks/useIcon';
import storeContainer from '../../../stores/storeContainer';

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
        width: '100%',
        height: '100%',
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
          position: 'absolute',
          bottom: 0,
          zIndex: 10,
          display: 'flex'
        }}
      >
        <History />
        <SheetPanel />
      </Box>
      <ReactFlowProvider>
        <InteractionCanvas />
      </ReactFlowProvider>
      <DataTypeGuideV />
      <RootVKeyboardEvent domElement={_ref?.current?.parentElement} />
    </Box>
  );
});

export default InteractionPanel;

const History = observer(() => {
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
