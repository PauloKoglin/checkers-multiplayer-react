import React from 'react'

import './style.css'

function Player(props) {
    return (
        <div id='player-container'>
            <h2 className='name'>{props.name}</h2>
            <h2 className='captures'>{"Captured pieces: ".concat(props.captures)}</h2>
        </div>

    )
}

export default Player;