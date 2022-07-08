import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// import Reducer from './_reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { store } from './redux/store'

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={createStoreWithMiddleware(Reducer,
      //redux extension 사용하기 위한 설정
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>


);

reportWebVitals();
