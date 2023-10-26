import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme/theme';
import i18n from '../src/locale/i18n';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
