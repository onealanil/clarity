import { motion, Variants } from "framer-motion";
import React from "react";
import { dotVariants } from "../../pages/landing/helper/Vairants";

const Loader: React.FC = () => {
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex gap-2">
                <motion.span
                    className="w-4 h-4 bg-clarity-green rounded-full"
                    variants={dotVariants}
                    animate="animate"
                />
                <motion.span
                    className="w-4 h-4 bg-clarity-green rounded-full"
                    variants={dotVariants}
                    animate="animate"
                />
                <motion.span
                    className="w-4 h-4 bg-clarity-green rounded-full"
                    variants={dotVariants}
                    animate="animate"
                />
            </div>
        </div>
    );
};

export default Loader;
