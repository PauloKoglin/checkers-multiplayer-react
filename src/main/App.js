import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import './App.css';
import store from '../store'
import Header from '../components/template/Header'
import GameArea from '../components/template/GameArea'
import Footer from '../components/template/Footer'


export default props =>
  <Provider store={store}>
    <BrowserRouter>
      <div className='app'>
        <Header />
        <GameArea />
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
