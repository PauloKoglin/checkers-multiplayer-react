import './index.css'
import React, { Component } from 'react'
import { motion } from "framer-motion";

export default class Square extends Component {
    getSquareClasses() {
        return "square ".concat(this.props.config.selected ? "selected " : "")
            .concat(this.props.config.move ? "move " : "")
        // .concat(this.props.config.color)
    }

    getPieceClasses() {
        return (this.props.config.checker ? "checker " : "")
            .concat(this.props.config.piece)
    }

    render() {
        return (
            <motion.div
                key={this.props.config.index}
                id={this.props.config.index}
                className={"square ".concat(this.props.config.color)}
                onClick={() => this.props.onClick()}>
                <motion.div
                    whileTap={{ scale: 0.8 }}>
                    <div className={this.getSquareClasses()}>
                        <div className={this.getPieceClasses()}></div>
                    </div>
                </motion.div>
            </motion.div>

        )
    }
}


