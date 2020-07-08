import './style.css'
import React from 'react'

export default function (props) {
    return (
        <div className='player'>
            <h2 className='name'>{props.name || "What's your name?"}</h2>
            <h2 className='captures'>{"Captured pieces: ".concat(props.captures ? props.captures : 0)}</h2>
        </div>

    )
}

