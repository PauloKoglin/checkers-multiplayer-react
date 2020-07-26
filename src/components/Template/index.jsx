import React from 'react'
import './styles.css'
import Header from '../UI/Header'
import Footer from '../UI/Footer'

export default props =>
    (
        <div className='app'>
            <Header />
            <div className='main'>
                {props.appRoutes}
            </div>
            <Footer />
        </div>
    )

