import React from 'react'
import './styles.css'

export default props =>
    <footer className='footer'>
        <div>
            <span>Developed by Paulo A. Koglin Junior</span>
        </div>
        <div className='socialMedia'>
            <div>
                <a href='https://github.com/PauloKoglin' rel='noopener noreferrer' target='_blank'>
                    <img src="github_logo.png" alt='Github Paulo Koglin' height='32px' width='32px'></img>
                </a>
            </div>
            <div>
                <a href='https://www.linkedin.com/in/paulo-arnoldo-koglin-junior-49aa5a49/' rel='noopener noreferrer' target='_blank'>
                    <img src="linkedin_logo.png" alt='Linked Paulo Koglin' height='32px' width='32px'></img>
                </a>
            </div>
        </div>
    </footer>
