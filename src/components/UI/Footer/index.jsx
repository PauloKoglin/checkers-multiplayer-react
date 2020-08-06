import React from 'react'
import './styles.css'

function Footer() {
    const githubLogo = "github_logo.png";
    const linkedInLogo = "linkedin_logo.png";

    return (
        <footer className='footer'>
            <div>
                <span>Developed by Paulo A. Koglin Junior</span>
            </div>
            <div className='socialMedia'>
                <div>
                    <a href='https://github.com/PauloKoglin' rel='noopener noreferrer' target='_blank'>
                        <img src={githubLogo} alt='Github Paulo Koglin' height='32px' width='32px'></img>
                    </a>
                </div>
                <div>
                    <a href='https://www.linkedin.com/in/paulo-arnoldo-koglin-junior-49aa5a49/' rel='noopener noreferrer' target='_blank'>
                        <img src={linkedInLogo} alt='Linked Paulo Koglin' height='32px' width='32px'></img>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

