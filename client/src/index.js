import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { StateProvider } from './components/StateProvider';
import reducer, { initialState } from './components/reducer';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate, render } from "react-dom";

const APP = (
  <React.StrictMode>
    <HelmetProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </HelmetProvider>
  </React.StrictMode>
)

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(APP, rootElement);
} else {
  render(APP, rootElement);
}

// ReactDOM.render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <StateProvider initialState={initialState} reducer={reducer}>
//         <App />
//       </StateProvider>
//     </HelmetProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();