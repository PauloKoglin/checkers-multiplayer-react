import './styles.css'
import React from 'react'
import { motion } from "framer-motion"

export default props => {
    return (
        <motion.input
            className='Input'
            placeholder={props.placeholder}
            required={props.required}
            value={props.value}
            onChange={props.onChange}
        />
    )
}