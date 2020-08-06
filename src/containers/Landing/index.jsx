import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/UI/Button';

import './styles.css'

function LandingPage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/newGame');
    }

    return (
        <Button name='Start New Game'
            onClick={handleClick}
        >
        </Button>
    )
}

export default LandingPage;