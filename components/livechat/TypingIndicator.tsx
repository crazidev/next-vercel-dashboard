import { motion } from "motion/react";
import { useEffect, useState } from "react";

const TypingIndicator = ({ isTyping }: {
    isTyping: boolean 
}) => {
    const [showDots, setShowDots] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTyping) {
            timer = setInterval(() => {
                setShowDots(prev => !prev);
            }, 500); // Toggle dots every 500ms
        } else {
            setShowDots(false); // Stop the animation if not typing
        }

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, [isTyping]);

    return (
        <motion.div className="flex items-center space-x-1"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
            {isTyping && (
                <>
                    <motion.div
                        animate={{ opacity: showDots ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                        animate={{ opacity: showDots ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                        animate={{ opacity: showDots ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                </>
            )}
        </motion.div>
    );
};

export default TypingIndicator;
