import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  stage: number;
  setStage: (stage: number) => void;
  view: string;
  setView: (view: string) => void;
}

const steps = [
  { num: "02", title: "FOUNDATION", desc: "EVERY LANDMARK BEGINS BELOW THE SURFACE." },
  { num: "03", title: "STRUCTURE", desc: "STRUCTURE TURNS A DRAWING INTO A DESTINATION." },
  { num: "04", title: "FACADE", desc: "FORM FOLLOWS THE VIEW." }
];

export default function Overlay({ stage, setStage, view, setView }: OverlayProps) {
  const currentStep = steps[stage];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 text-white">
      {/* Top Nav */}
      <header className="flex justify-between items-center pointer-events-auto">
        <div className="text-2xl tracking-widest font-serif uppercase">Auren</div>
        <nav className="flex gap-8 text-xs tracking-widest uppercase">
          <button className="hover:opacity-70">Residences</button>
          <button className="hover:opacity-70">Architecture</button>
          <button className="hover:opacity-70">Masterplan</button>
          <button className="hover:opacity-70">Login</button>
          <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">Enquire</button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-md"
          >
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
              {currentStep.desc}
            </h1>
            <div className="flex items-center gap-4 text-sm tracking-widest">
              <span className="text-2xl">{currentStep.num}</span>
              <span className="uppercase">{currentStep.title}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <footer className="flex justify-between items-end pointer-events-auto">
        <div className="flex gap-4">
          <button 
            onClick={() => setStage(Math.max(0, stage - 1))}
            className="p-2 border border-white/30 rounded-full hover:bg-white/10"
            disabled={stage === 0}
          >
            &larr;
          </button>
          <button 
            onClick={() => setStage(Math.min(2, stage + 1))}
            className="p-2 border border-white/30 rounded-full hover:bg-white/10"
            disabled={stage === 2}
          >
            &rarr;
          </button>
        </div>

        {stage === 2 && (
          <div className="flex gap-4">
            <button 
              onClick={() => setView("city")}
              className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors ${view === "city" ? "bg-white text-black" : "border border-white/30 hover:bg-white/10"}`}
            >
              City Side
            </button>
            <button 
              onClick={() => setView("waterfront")}
              className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors ${view === "waterfront" ? "bg-white text-black" : "border border-white/30 hover:bg-white/10"}`}
            >
              Waterfront Side
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
