import React from 'react'
import { motion } from "framer-motion";

import './styles.css'

function Square(props) {
    function buildPiece() {
        if (!props.piece.color)
            return;

        if (props.piece.isMovable)
            return (
                <motion.div
                    id='square-piece'
                    whileTap={{ scale: 0.8 }}
                    className={getPieceClasses()}
                />
            )
        else
            return (
                <div
                    id='square-piece'
                    className={getPieceClasses()}
                />
            )
    }

    function getSquareClasses() {
        return ""
            .concat(props.isPossibleMove || props.piece.isMovable ? "move " : "")
            .concat(props.color)
    }

    function getPieceClasses() {
        return (props.piece.isChecker ? "checker " : "")
            .concat(props.piece.color)
    }

    return (
        <div
            id='square-container'
            key={props.index}
            className={getSquareClasses()}
            onClick={() => props.onClick()}>
            {buildPiece()}
        </div>
    )
}

export default Square;