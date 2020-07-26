import './styles.css'
import React from 'react'
import { motion } from "framer-motion"

export default props => {
    return (
        <motion.button
            className='Button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={props.onClick}
        >
            {props.name}
        </motion.button>
    )
}