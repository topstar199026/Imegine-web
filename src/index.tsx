import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { SettingsProvider } from 'src/contexts/SettingsContext';
import store from 'src/store';

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
