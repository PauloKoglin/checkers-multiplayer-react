import './Square.css'
import React, { Component } from 'react'

export default class Square extends Component {
    getSquareClasses() {
        return (this.props.config.selected ? "selected " : "")
            .concat(this.props.config.move ? "move " : "")
            .concat(this.props.config.color)
    }

    getPieceClasses() {
        return (this.props.config.checker ? "checker " : "")
            .concat(this.props.config.piece)
    }

    render() {
        return (
            <div
                key={this.props.config.index}
                id={this.props.config.index}
                className={this.getSquareClasses()}
                onClick={() => this.props.onClick()}>
                <div className={this.getPieceClasses()}></div>
            </div>

        )
    }
}


