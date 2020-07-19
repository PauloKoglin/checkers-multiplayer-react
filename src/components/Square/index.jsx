import './index.css'
import React, { Component } from 'react'
import { motion } from "framer-motion";

// const styles = {
//     background: "blue",
//     borderRadius: 30,
//     width: 150,
//     height: 150,
//     margin: "auto"
//  };




export default class Square extends Component {
    buildPiece = () => {

        // const transition = {
        //     yoyo: Infinity,
        //     duration: 0.40
        // }

        // const variants = {
        //     up: {
        //         x: - 3,
        //         y: - 2
        //     },
        //     down: {
        //         x: 0
        //     }
        // }

        if (this.props.piece.isMovable) {
            return (
                <motion.div
                    // animate={{ opacity: 0.5 }}
                    // initial={{ opacity: 1 }}                    
                    // animate="up"
                    // initial={"down"}
                    // variants={variants}
                    // transition={transition}
                    whileTap={{ scale: 0.8 }}
                >
                    <div className={this.getSquareClasses()}>
                        <div className={this.getPieceClasses()}></div>
                    </div>
                </motion.div>
            )
        } else {
            return (
                <motion.div

                >
                    <div className={this.getSquareClasses()}>
                        <div className={this.getPieceClasses()}></div>
                    </div>
                </motion.div>
            )
        }
    }

    getSquareClasses() {
        return "square ".concat(this.props.isSelected ? "selected " : "")
            .concat(this.props.isPossibleMove ? "move " : "")
            .concat(this.props.piece.isMovable ? "move " : "")
        // .concat(this.props.color)
    }

    getPieceClasses() {
        return (this.props.piece.isChecker ? "checker " : "")
            .concat(this.props.piece.color)
    }

    render() {
        return (
            <motion.div
                key={this.props.index}
                id={this.props.index}
                className={"square ".concat(this.props.color)}
                onClick={() => this.props.onClick()}>
                {this.buildPiece()}
                {/* <motion.div
                    whileTap={{ scale: 0.8 }}
                >
                    <div className={this.getSquareClasses()}>
                        <div className={this.getPieceClasses()}></div>
                    </div>
                </motion.div> */}
            </motion.div>

        )
    }
}


