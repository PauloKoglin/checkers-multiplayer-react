import './style.css'
import React from 'react'

export default function (props) {
    return (
        <div className='player'>
            <h2 className='name'>{props.name}</h2>
            <h2 className='captures'>{"Captured pieces: ".concat(props.captures)}</h2>
        </div>

    )
}

