import './styles.css'
import Button from '../../components/UI/Button'
import React from 'react'
import { useHistory } from 'react-router-dom';
import '../../shared/global.styles.css'

const Main = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/newGame');
    }

    return (
        <div className='container-cl'>
            <Button name='Start New Game'
                onClick={handleClick}
            >
            </Button>
        </div>
    )
}

export default Main;