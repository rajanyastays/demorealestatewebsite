"use client";
import { useState } from "react";
import Experience from "@/components/Experience";
import Overlay from "@/components/Overlay";

export default function Home() {
  const [stage, setStage] = useState(0); // 0: Foundation, 1: Structure, 2: Facade
  const [view, setView] = useState("city"); // "city" or "waterfront"

  return (
    <main className="w-screen h-screen">
      <Experience stage={stage} view={view} />
      <Overlay stage={stage} setStage={setStage} view={view} setView={setView} />
    </main>
  );
}
