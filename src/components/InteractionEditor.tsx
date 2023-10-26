import InteractionTopBar from '@/interaction(legacyJS)/src/Components/views/00. Common/TopBar_V';
import InteractionPanel from '@/interaction(legacyJS)/src/Components/views/02. Studio/04. EventPanel/InteractionPanel.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/interaction(legacyJS)/src/locale/i18n.js';
import editorModeStore from '@store/editorModeStore.ts';
import { observer } from 'mobx-react';

const InteractionEditor = () => {
  const { interactionBarOpen, editorMode } = editorModeStore;

  return (
    <I18nextProvider i18n={i18n}>
      {interactionBarOpen && <InteractionTopBar />}
      {editorMode === 'interaction' && <InteractionPanel />}
    </I18nextProvider>
  );
};

const Observer = observer(InteractionEditor);
export default Observer;
