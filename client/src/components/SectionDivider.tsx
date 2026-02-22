import { motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <div className="relative w-full flex flex-col items-center justify-center py-10 overflow-hidden pointer-events-none select-none">

            {/* Wide horizontal glow beams */}
            <div className="absolute w-full h-[1px] opacity-40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute w-full h-[1px] translate-y-[3px] opacity-15">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent blur-[2px]" />
            </div>

            {/* Center diamond + rings */}
            <div className="relative z-10 flex flex-col items-center gap-0">
                {/* Outer pulse ring */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-12 h-12 rounded-full border border-blue-500/40"
                />

                {/* Middle ring */}
                <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="absolute w-8 h-8 rounded-full border border-blue-400/50"
                />

                {/* Diamond */}
                <motion.div
                    animate={{ rotate: [45, 90, 45], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-4 rotate-45 bg-gradient-to-br from-blue-400 to-purple-500 shadow-[0_0_18px_rgba(99,102,241,0.8)]"
                />

                {/* Tiny side dots */}
                <div className="absolute flex items-center gap-20">
                    <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3], x: [-4, 0, -4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400/70"
                    />
                    <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3], x: [4, 0, 4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-purple-400/70"
                    />
                </div>
            </div>

            {/* Soft ambient glow behind the diamond */}
            <div className="absolute w-40 h-10 bg-blue-600/15 blur-[30px] rounded-full" />
        </div>
    );
}
