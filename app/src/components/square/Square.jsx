import './Square.css'
// import Piece from '../piece/Piece.jsx'
import React, { Component } from 'react'

export default class Square extends Component {


    // addPiece(piece) {
    //     return piece ? <Piece {...this.props} color={piece} /> : null
    // }



    render() {
        return (
            <div
                key={this.props.config.index}
                className={(this.props.config.selected ? "selected " : "").concat(this.props.config.color)}
                onClick={() => this.props.onClick()}>
                <div className={this.props.config.piece}></div>
            </div>

        )
    }
}


