
import React, { useCallback, useState, useEffect } from "react";
import UploadCard from "./components/UploadCard";
import { Particles } from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;
  return (
  <div
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cover bg-center px-4"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/bloodcellimage.jpg')",
    }}
  >
    {/* 🌸 Floating Particles */}
    <Particles
      id="tsparticles"
      className="absolute inset-0"
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: { value: 20 },
          color: { value: "#ef4444" },
          size: { value: 3 },
          move: { enable: true, speed: 1, direction: "none", outModes: "out" },
          opacity: { value: 0.4 },
          links: { enable: false },
        },
      }}
    />

    {/* 🌈 Animated Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-300 to-rose-400 animate-gradient-x opacity-40 blur-3xl"></div>

    {/* 💡 Main content */}
    <div className="relative z-10 flex flex-col items-center space-y-8">
      <UploadCard />
    </div>

    {/* 🖋️ Footer */}
    <footer className="relative z-10 mt-10 mb-4 text-gray-600 text-sm text-center">
      {/* <p>
        💉 Built with <span className="text-red-600 font-semibold">AI</span> & ❤️ by{" "}
        <span className="font-semibold text-gray-700">Your Name</span>
      </p> */}
    </footer>
  </div>
);

}

export default App;
