"use client";

import Link from "next/link";
import { motion } from "framer-motion"

function NavButton({children, props} ) {
    return (
        <Link href={props.href} className="flex items-center gap-2">
        <motion.div className="flex items-center gap-1"
            whileHover={{ scale: 1.1,x: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {children}
          </motion.div>
        </Link>
    )
}

export default NavButton;