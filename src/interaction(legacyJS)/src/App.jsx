import Root from "./Components/views/00. Common/Root_V";
import { observer } from "mobx-react-lite";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/locale/i18n";

const App = observer(() => {
  return (
    <I18nextProvider i18n={i18n}>
      <Root />
    </I18nextProvider>
  );
});

export default App;
