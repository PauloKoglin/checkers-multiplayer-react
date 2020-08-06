import React from 'react';
import { Provider } from 'react-redux';

import './assets/styles/global.css';

import store from './store'
import Routes from './routes'

import Header from './components/UI/Header'
import Footer from './components/UI/Footer'

import socket from './webSocket'

socket.connect();

function App() {
  return (
    <Provider store={store}>
      <div id='app-container'>
        <Header />
        {/* <div className='main'> */}
        <div id='app-main-area'>
          <Routes />
        </div>
        {/* </div> */}
        <Footer />
      </div>
    </Provider>)
}

export default App;