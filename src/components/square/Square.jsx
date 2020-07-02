import './Square.css'
// import Piece from '../piece/Piece.jsx'
import React, { Component } from 'react'

export default class Square extends Component {
    buildClasses() {
        return (this.props.config.selected ? "selected " : "")
            .concat(this.props.config.move ? "move " : "")
            .concat(this.props.config.color)
    }

    render() {
        return (
            <div
                key={this.props.config.index}
                id={this.props.config.index}
                className={this.buildClasses()}
                onClick={() => this.props.onClick()}
                onMouseOver={() => this.props.onMouseOver()}
                onMouseLeave={() => this.props.onMouseLeave()}
            >
                <div className={this.props.config.piece}></div>
            </div>

        )
    }
}


