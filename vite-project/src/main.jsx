import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { persistor, store } from "./core/store";
import { PersistGate } from 'redux-persist/integration/react'

import './index.scss'
import './core/i18n/index.js'
import './common.scss'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
