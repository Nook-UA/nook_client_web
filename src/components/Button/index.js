"use client";
import { motion } from "framer-motion";

function Button({children, className}) {
    return (
        <motion.button className={`${className} flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    )
}

export default Button;