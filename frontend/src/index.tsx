import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import * as ServiceWorkerRegistration from "./serviceWorkerRegistration";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "primeicons/primeicons.css";

import { PrimeReactProvider } from "primereact/api";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);

ServiceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
