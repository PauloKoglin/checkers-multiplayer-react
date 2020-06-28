import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Header from '../components/template/Header'
import GameArea from '../components/template/GameArea'
import Footer from '../components/template/Footer'

export default props =>
  <BrowserRouter>
    <div className='app'>
      <Header />
      <GameArea />
      <Footer />
    </div>
  </BrowserRouter>
