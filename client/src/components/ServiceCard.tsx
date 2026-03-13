import type { Service } from "@/data/services";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ServiceCardProps {
  service: Service;
  index: number;
}

// 1. NEURAL ROUTING (Workflow)
const WorkflowMock = () => {
  return (
    <div className="relative h-64 w-full bg-[#0a0a0a] rounded-xl border border-white/5 p-4 overflow-hidden flex justify-center items-center group-hover:border-indigo-500/30 transition-all duration-700 shadow-inner">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Central Glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px]"
      />

      <div className="relative w-full h-full flex items-center justify-between px-6">
        {/* Left Node */}
        <div className="flex flex-col gap-4 z-10">
          <Node color="bg-cyan-400" border="border-cyan-400/30" shadow="shadow-[0_0_15px_rgba(34,211,238,0.2)]" delay={0} />
          <Node color="bg-cyan-400" border="border-cyan-400/30" shadow="shadow-[0_0_15px_rgba(34,211,238,0.2)]" delay={1} />
        </div>

        {/* Center Main Node */}
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative w-20 h-20 rounded-2xl border border-indigo-500/50 bg-[#111] shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center justify-center z-20"
        >
          <motion.div animate={{ rotate: -180 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center blur-[2px]">
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]" />
          </motion.div>
          {/* Orbiting particles inside the center node */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-1 border border-dashed border-indigo-400/30 rounded-full" />
        </motion.div>

        {/* Right Node */}
        <div className="z-10">
          <Node color="bg-rose-400" border="border-rose-400/30" shadow="shadow-[0_0_15px_rgba(251,113,133,0.2)]" delay={0.5} />
        </div>

        {/* Connecting Lines with SVG Data Packets */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
          {/* Path 1: Top Left to Center */}
          <path d="M 50 60 C 100 60, 150 120, 200 120" fill="none" className="stroke-white/10" strokeWidth="2" strokeDasharray="4 4" />
          <Packet path="M 50 60 C 100 60, 150 120, 200 120" color="#22d3ee" duration={2} delay={0} />

          {/* Path 2: Bottom Left to Center */}
          <path d="M 50 180 C 100 180, 150 120, 200 120" fill="none" className="stroke-white/10" strokeWidth="2" strokeDasharray="4 4" />
          <Packet path="M 50 180 C 100 180, 150 120, 200 120" color="#22d3ee" duration={2} delay={1} />

          {/* Path 3: Center to Right */}
          <path d="M 280 120 C 330 120, 360 120, 420 120" fill="none" className="stroke-white/10" strokeWidth="2" strokeDasharray="4 4" />
          <Packet path="M 280 120 C 330 120, 360 120, 420 120" color="#fb7185" duration={1.5} delay={1.5} />
        </svg>
      </div>
    </div>
  );
};

const Node = ({ color, border, shadow, delay }: any) => (
  <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
    className={`w-12 h-12 bg-[#171717] border ${border} ${shadow} rounded-xl flex flex-col items-center justify-center gap-1 backdrop-blur-md relative overflow-hidden`}
  >
    <div className={`w-2 h-2 ${color} rounded-full animate-pulse`} />
    <div className="w-6 h-1 bg-white/10 rounded-full" />
    <motion.div
      animate={{ translateY: ['100%', '-100%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none"
    />
  </motion.div>
);

const Packet = ({ path, color, duration, delay }: any) => {
  return (
    <motion.circle
      r="3"
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    >
      <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
    </motion.circle>
  );
};

// 2. EXTREME TERMINAL CODE EDITOR (Animation inside Animation)
const rawCode = `async function compileEngine() {
  const kernel = await Sys.core();
  kernel.allocateMemory(2048);
  
  if (kernel.status === "READY") {
    // Inject dependencies
    const modules = await Sys.inject([
      'neural-net',
      'physics-sim',
      'auth-matrix'
    ]);
    
    return modules.compile();
  }
}

compileEngine().then(res => {
  console.log("Deployed successfully.");
});
`;

const CodeTypingMock = () => {
  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < rawCode.length) {
      const timeout = setTimeout(() => {
        // Fast burst typing
        const chars = Math.floor(Math.random() * 8) + 3;
        setTyped(prev => prev + rawCode.slice(index, index + chars));
        setIndex(prev => prev + chars);
      }, Math.random() * 20 + 10);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setTyped("");
        setIndex(0);
      }, 4000);
      return () => clearTimeout(reset);
    }
  }, [index]);

  const syntaxHighlight = (str: string) => {
    let s = str;
    s = s.replace(/("READY"|"Deployed successfully."|'neural-net'|'physics-sim'|'auth-matrix')/g, '<span class="text-emerald-400">$1</span>');
    s = s.replace(/\b(async|function|await|if|return|const|let)\b/g, '<span class="text-pink-500 font-semibold">$1</span>');
    s = s.replace(/\b(Sys|kernel|modules|res|console)\b/g, '<span class="text-amber-300">$1</span>');
    s = s.replace(/\b(compileEngine|core|allocateMemory|inject|compile|log|then)\b/g, '<span class="text-blue-400">$1</span>');
    return s;
  };

  // The nested animation: A dynamic progress ring resolving as the code types
  const progress = Math.min(100, Math.round((index / rawCode.length) * 100));

  return (
    <div className="relative h-64 w-full bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden flex flex-col group-hover:border-cyan-500/30 transition-all duration-700 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      {/* Mac-like Header */}
      <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 justify-between relative z-10 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[inset_0_1px_rgba(255,255,255,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[inset_0_1px_rgba(255,255,255,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[inset_0_1px_rgba(255,255,255,0.2)]" />
        </div>
        <div className="text-[10px] text-gray-500 font-mono font-medium flex gap-2">
          engine.ts <span className="text-cyan-500 animate-pulse">●</span>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Code Area */}
        <div className="flex-1 p-4 font-mono text-xs text-gray-300 leading-relaxed max-w-[70%] overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(typed) + '<span class="inline-block w-2 h-3.5 bg-white/80 align-middle ms-1 animate-pulse" />' }}
            className="break-words whitespace-pre-wrap"
          />
        </div>

        {/* Nested Animation Area: Live Graph Building Itself */}
        <div className="absolute end-0 top-0 bottom-0 w-[30%] bg-[#111]/80 backdrop-blur-sm border-s border-white/5 flex flex-col items-center justify-center p-4">

          <div className="relative w-16 h-16 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
              <motion.circle
                cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                className="text-cyan-400 transition-all duration-100 ease-out"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[10px] text-cyan-400 font-bold">{progress}%</span>
            </div>
          </div>

          <div className="w-full space-y-2">
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${progress}%` }} className="h-full bg-blue-500 rounded-full" />
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${Math.min(100, progress * 1.5)}%` }} className="h-full bg-purple-500 rounded-full" />
            </div>
            <div className="flex justify-between text-[8px] text-gray-500 font-mono mt-1 w-full">
              <span>MEM</span>
              <span>CPU</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. SECURE DATA GRID (Table)
const GridMock = () => {
  const [data, setData] = useState([
    { id: 'usr_89x', action: 'AUTH', region: 'us-east-1', success: true },
    { id: 'usr_42y', action: 'QUERY', region: 'eu-west-3', success: true },
    { id: 'sys_01a', action: 'MUTATE', region: 'ap-south-1', success: false },
  ]);

  useEffect(() => {
    const actions = ['AUTH', 'QUERY', 'MUTATE', 'UPLOAD', 'SYNC', 'PULL'];
    const regions = ['us-east-1', 'eu-west-3', 'ap-south-1', 'us-west-2', 'sa-east-1'];

    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        // Shift out the oldest and push a new random event
        newData.pop();
        newData.unshift({
          id: `${Math.random() > 0.8 ? 'sys' : 'usr'}_${Math.random().toString(36).substring(2, 5)}`,
          action: actions[Math.floor(Math.random() * actions.length)],
          region: regions[Math.floor(Math.random() * regions.length)],
          success: Math.random() > 0.2 // 80% success rate
        });
        return newData;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden flex flex-col group-hover:border-emerald-500/30 transition-all duration-700 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      {/* Radar Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-24 -end-24 w-64 h-64 border border-emerald-500/10 rounded-full opacity-50 pointer-events-none" />
      <div className="absolute -top-12 -end-12 w-40 h-40 border border-emerald-500/10 rounded-full opacity-50 pointer-events-none" />

      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#111]/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2">
          <i className="fas fa-shield-alt text-emerald-500 text-sm"></i>
          <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Live Log Stream</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
          <span className="text-[10px] text-gray-500 font-mono">24ms</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-2 relative z-10 flex flex-col">
        <div className="grid grid-cols-4 px-2 pb-2 mb-2 text-[9px] text-gray-500 font-bold tracking-widest uppercase border-b border-white/5 shrink-0">
          <span className="col-span-1">Actor ID</span>
          <span className="col-span-1 text-center">Action</span>
          <span className="col-span-1 text-center">Region</span>
          <span className="col-span-1 text-end">Status</span>
        </div>

        <div className="flex flex-col gap-1.5 relative flex-1 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {data.map((row) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                key={row.id + Math.random()} // Force re-render for animation effect
                className="grid grid-cols-4 px-2 py-2 text-[10px] font-mono items-center bg-white/[0.02] border border-white/[0.03] rounded-md hover:bg-white/[0.04] transition-colors"
              >
                <div className="col-span-1 text-gray-300 font-semibold">{row.id}</div>
                <div className="col-span-1 text-center pt-0.5">
                  <span className="px-1.5 py-0.5 rounded text-[8px] tracking-wider bg-white/5 text-gray-400 border border-white/5">{row.action}</span>
                </div>
                <div className="col-span-1 text-center text-gray-500">{row.region}</div>
                <div className="col-span-1 flex justify-end">
                  {row.success ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      <i className="fas fa-check text-[8px]" /> <span className="text-[9px] font-bold">200</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">
                      <i className="fas fa-times text-[8px]" /> <span className="text-[9px] font-bold">403</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Animated Scanline moving across the table */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        className="absolute start-0 end-0 h-[1px] bg-emerald-500/30 shadow-[0_0_15px_#10b981] pointer-events-none z-20"
      />
    </div>
  );
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { t } = useTranslation();

  const getMockup = () => {
    switch (service.animationType) {
      case 'workflow': return <WorkflowMock />;
      case 'terminal': return <CodeTypingMock />;
      case 'calendar': return <GridMock />;
      default: return null;
    }
  };

  const colors = [
    "from-blue-500/20 to-indigo-500/20 group-hover:from-blue-500/30 group-hover:to-indigo-500/30",
    "from-cyan-500/20 to-teal-500/20 group-hover:from-cyan-500/30 group-hover:to-teal-500/30",
    "from-emerald-500/20 to-green-500/20 group-hover:from-emerald-500/30 group-hover:to-green-500/30",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        bounce: 0.3
      }}
      className="group relative flex flex-col pt-8 px-6 pb-6 md:pt-10 md:px-8 md:pb-8 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] transition-all duration-500 hover:border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      data-testid={`service-card-${service.id}`}
    >
      {/* Dynamic Top Gradient Glow Inside Card */}
      <div className={`absolute top-0 start-0 end-0 h-40 bg-gradient-to-b ${colors[index % 3]} opacity-40 blur-[50px] transition-all duration-700 pointer-events-none`} />

      <div className="relative z-10 mb-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-inner flex items-center justify-center mb-6 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
          <i className={`fas ${index === 0 ? 'fa-project-diagram text-indigo-400' : index === 1 ? 'fa-code text-cyan-400' : 'fa-database text-emerald-400'} text-2xl`}></i>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
          {t(`services.${service.id}`)}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[90%] mx-auto">
          {t(`services.${service.id}_desc`)}
        </p>
      </div>

      <div className="mt-auto w-full relative z-20">
        {getMockup()}
      </div>

      {/* Subtle bottom border line */}
      <div className="absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r rtl:bg-gradient-to-l from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
    </motion.div>
  );
}
