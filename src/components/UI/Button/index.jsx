import React from 'react'
import { motion } from "framer-motion"

import './styles.css'

function Button(props) {
    return (
        <motion.button
            className='motion-button'
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            onClick={props.onClick}
        >
            {props.name}
        </motion.button>
    );
};

export default Button;