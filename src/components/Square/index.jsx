import './styles.css'
import React, { Component } from 'react'
import { motion } from "framer-motion";

export default class Square extends Component {
    buildPiece() {
        if (this.props.piece.isMovable)
            return (
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    className={this.getPieceClasses()}
                />
            )
        else
            return (
                <div className={this.getPieceClasses()}></div>
            )
    }

    getSquareClasses() {
        return "square "
            .concat(this.props.isPossibleMove || this.props.piece.isMovable ? "move " : "")
            .concat(this.props.color)
    }

    getPieceClasses() {
        return (this.props.piece.isChecker ? "checker " : "")
            .concat(this.props.piece.color)
    }

    render() {
        return (
            <div
                key={this.props.index}
                id={this.props.index}
                className={this.getSquareClasses()}
                onClick={() => this.props.onClick()}>
                {this.buildPiece()}
            </div>
        )
    }
}