import { motion } from "framer-motion";

/**
 * SectionDivider
 * Placed between ProjectsSection and AboutSection.
 * Creates a rich gradient blend + animated centre ornament.
 *
 * ProjectsSection accent: blue-600 / purple-600
 * AboutSection accent:    blue-900 (softer, more navy)
 */
export default function SectionDivider() {
    return (
        <div className="relative w-full overflow-hidden select-none pointer-events-none" style={{ height: "180px" }}>

            {/* ── TOP gradient fade (Projects colour → transparent) ── */}
            <div
                className="absolute inset-x-0 top-0 h-20"
                style={{
                    background: "linear-gradient(to bottom, rgba(37,99,235,0.12) 0%, transparent 100%)",
                }}
            />

            {/* ── BOTTOM gradient fade (transparent → About colour) ── */}
            <div
                className="absolute inset-x-0 bottom-0 h-20"
                style={{
                    background: "linear-gradient(to top, rgba(30,58,138,0.15) 0%, transparent 100%)",
                }}
            />

            {/* ── Left dashes ── */}
            <div className="absolute top-1/2 -translate-y-1/2 start-0 w-[calc(50%-60px)] flex items-center">
                <div className="h-[1px] w-full bg-gradient-to-r rtl:bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70 shrink-0" />
            </div>

            {/* ── Right dashes ── */}
            <div className="absolute top-1/2 -translate-y-1/2 end-0 w-[calc(50%-60px)] flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500/70 shrink-0" />
                <div className="h-[1px] w-full bg-gradient-to-l rtl:bg-gradient-to-r from-transparent via-purple-500/50 to-purple-500/70" />
            </div>

            {/* ── Centre ornament ── */}
            <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 flex flex-col items-center">

                {/* Outer pulse ring */}
                <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-14 h-14 rounded-full border border-blue-400/40"
                />

                {/* Middle ring */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.05, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute w-9 h-9 rounded-full border border-purple-400/50"
                />

                {/* Rotating diamond */}
                <motion.div
                    animate={{ rotate: [45, 135, 45], scale: [1, 1.12, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-5 rotate-45 shadow-[0_0_22px_rgba(99,102,241,0.9)]"
                    style={{
                        background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)",
                    }}
                />

                {/* Side dots */}
                <div className="absolute flex items-center gap-24">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3], x: [-6, 0, -6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-blue-400/80"
                    />
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3], x: [6, 0, 6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-purple-400/80"
                    />
                </div>

                {/* Ambient glow */}
                <div className="absolute w-48 h-10 rounded-full blur-[35px]"
                    style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)" }}
                />
            </div>

            {/* ── Full-width colour transition band (the "gradient" the user wants) ── */}
            <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px]"
                style={{
                    background: "linear-gradient(to right, transparent 0%, #3b82f6 30%, #8b5cf6 50%, #3b82f6 70%, transparent 100%)",
                    opacity: 0.45,
                    filter: "blur(1px)",
                }}
            />
        </div>
    );
}
