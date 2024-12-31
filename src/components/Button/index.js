"use client";
import { motion } from "framer-motion";

function Button({children, className,onClick}) {
    return (
        <motion.button className={`${className} flex justify-center items-center gap-2`} onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    )
}

export default Button;