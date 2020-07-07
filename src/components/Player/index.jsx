import './index.css'
// import Piece from '../piece/Piece'
import React from 'react'

export default function (props) {
    return (
        <div className='player'>
            <h2 className='name'>{props.name}</h2>
            <h2 className='captures'>{"Captured pieces: ".concat(props.captures ? props.captures : 0)}</h2>
        </div>

    )
}

