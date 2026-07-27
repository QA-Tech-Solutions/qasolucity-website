"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Bug,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";

// Helper: count-up animation
const useCountUp = (target: number, duration: number = 1200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
};

// Animated number component
const AnimatedNumber = ({ value, suffix = "", duration = 1200 }: { value: number; suffix?: string; duration?: number }) => {
  const count = useCountUp(value, duration);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// KPI Card with hover lift
const KPICard = ({
  icon: Icon,
  label,
  value,
  suffix = "",
  color = "indigo",
  delay = 0,
  dynamicValue,
}: {
  icon: any;
  label: string;
  value: number | string;
  suffix?: string;
  color?: "indigo" | "emerald" | "red" | "amber";
  delay?: number;
  dynamicValue?: number;
}) => {
  const colorMap = {
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/20",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
    red: "from-red-500/20 to-red-600/10 border-red-500/20",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
  };
  const iconColorMap = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    red: "text-red-400",
    amber: "text-amber-400",
  };

  const displayValue = dynamicValue !== undefined ? dynamicValue : value;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`rounded-2xl bg-gradient-to-br ${colorMap[color]} border backdrop-blur-sm p-4 transition-shadow hover:shadow-lg hover:shadow-${color}-500/10`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColorMap[color]}`} />
        <span className="text-xs font-medium text-slate-400">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-white">
        {typeof displayValue === "number" ? (
          <AnimatedNumber value={displayValue} suffix={suffix} duration={1000} />
        ) : (
          displayValue
        )}
      </p>
    </motion.div>
  );
};

export default function Dashboard() {
  // Base data
  const TOTAL_TESTS = 2710;

  // State for dynamic metrics
  const [passRate, setPassRate] = useState(94);
  const [passedTests, setPassedTests] = useState(2548);
  const [bugs, setBugs] = useState(3);
  const [coverage, setCoverage] = useState(92);
  const [apiHealth, setApiHealth] = useState("Healthy");
  const [lastUpdated, setLastUpdated] = useState("2 min ago");
  const [isLive, setIsLive] = useState(true);

  // Chart line animation control
  const chartControls = useAnimation();

  useEffect(() => {
    chartControls.start({
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    });
  }, [chartControls]);

  // Function to generate realistic data updates
  const generateDataUpdate = useCallback(() => {
    // Fluctuate pass rate between 92-97%
    const newPassRate = Math.min(97, Math.max(92, passRate + (Math.random() - 0.5) * 2));
    const newPassedTests = Math.floor((newPassRate / 100) * TOTAL_TESTS);
    
    // Fluctuate bugs between 1-5
    const newBugs = Math.max(1, Math.min(5, bugs + Math.floor(Math.random() * 3) - 1));
    
    // Fluctuate coverage between 90-95%
    const newCoverage = Math.min(95, Math.max(90, coverage + (Math.random() - 0.5) * 2));
    
    // API Health - 90% healthy, 10% degraded
    const healthStatus = Math.random() > 0.9 ? "Degraded" : "Healthy";
    
    // Update time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastUpdated(`${timeString}`);

    // Apply updates
    setPassRate(Math.round(newPassRate));
    setPassedTests(newPassedTests);
    setBugs(newBugs);
    setCoverage(Math.round(newCoverage));
    setApiHealth(healthStatus);
  }, [passRate, bugs, coverage]);

  // Auto-update every 5-10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      generateDataUpdate();
    }, 5000 + Math.random() * 5000); // Random interval 5-10 seconds

    return () => clearInterval(interval);
  }, [generateDataUpdate]);

  // Manual update on hover (optional)
  const handleManualUpdate = () => {
    generateDataUpdate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 shadow-2xl shadow-indigo-500/20 transition-all duration-300"
      onClick={handleManualUpdate}
    >
      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl"
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20"
            >
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
            </motion.div>
            <div>
              <h3 className="text-sm font-semibold text-white">QA Solucity</h3>
              <p className="text-xs text-slate-400">Quality Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-400">Live</span>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Test Pass Rate</p>
              <h4 className="text-3xl font-bold text-white">
                <AnimatedNumber value={passRate} suffix="%" duration={800} />
              </h4>
            </div>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp 
                className={`h-6 w-6 ${passRate >= 95 ? 'text-emerald-400' : passRate >= 92 ? 'text-amber-400' : 'text-red-400'}`}
              />
            </motion.div>
          </div>
          <div className="mt-4 h-28 w-full">
            <svg viewBox="0 0 400 120" className="h-full w-full">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area under line */}
              <motion.path
                d="M0 100 L40 80 L80 90 L120 60 L160 70 L200 40 L240 60 L280 30 L320 50 L360 20 L400 40 L400 120 L0 120 Z"
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              {/* Line with draw animation */}
              <motion.path
                d="M0 100 L40 80 L80 90 L120 60 L160 70 L200 40 L240 60 L280 30 L320 50 L360 20 L400 40"
                fill="none"
                stroke="#818CF8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* KPI Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <KPICard
            icon={CheckCircle2}
            label="Passed"
            value={passedTests}
            color="emerald"
            delay={0.1}
            dynamicValue={passedTests}
          />
          <KPICard
            icon={Bug}
            label="Bugs"
            value={bugs}
            color="red"
            delay={0.2}
            dynamicValue={bugs}
          />
          <KPICard
            icon={Zap}
            label="Coverage"
            value={coverage}
            suffix="%"
            color="amber"
            delay={0.3}
            dynamicValue={coverage}
          />
          <KPICard
            icon={Activity}
            label="API Health"
            value={apiHealth}
            color={apiHealth === "Healthy" ? "emerald" : "red"}
            delay={0.4}
            dynamicValue={apiHealth}
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500"
        >
          <span>
            Last updated: <span className="text-slate-400">{lastUpdated}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${apiHealth === "Healthy" ? "bg-green-400" : "bg-red-400 animate-pulse"}`} />
            {apiHealth === "Healthy" ? "All systems operational" : "API Degraded"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}