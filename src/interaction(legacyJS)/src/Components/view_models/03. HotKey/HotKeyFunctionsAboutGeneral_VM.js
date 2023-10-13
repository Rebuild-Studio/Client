import { common_store } from "../../stores/Common_Store";

const HotKeyFunctionsAboutGeneralViewModel = {

  ctrlModeOn: () => {
    common_store.setIsCtrl(true);
  },

  ctrlModeOff: () => {
    common_store.setIsCtrl(false);
  },
};

export { HotKeyFunctionsAboutGeneralViewModel };
