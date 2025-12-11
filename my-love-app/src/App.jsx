import { useState, useRef } from "react";

export default function App() {
  const [stage, setStage] = useState("letter"); // letter → ring → avoid → final
  const [msg, setMsg] = useState("");
  const audioRef = useRef(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const openLetter = () => {
    playMusic();
    setMsg("");
    setStage("ring");

    const text = "there is something inside that "

    typeWriter(text);
  };

  const showRing = () => {
    const text = `
💍 Muthee…  
This ring is not just a ring…

It’s my small way of telling you…

You mean so much to me.
`;
    setMsg("");
    typeWriter(text);
    setStage("avoid");
  };

  const typeWriter = async (text) => {
    for (let i = 0; i < text.length; i++) {
      await new Promise((res) => setTimeout(res, 30));
      setMsg((prev) => prev + text[i]);
    }
  };

  // Button that runs away
  const moveButton = (e) => {
    if (stage !== "avoid") return;

    const btn = e.target;
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;

    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const finalConfession = () => {
    setStage("final");
    setMsg("I LOVE YOU MUTHHHHEEEEEEEE ❤️🔥💍,“Your presence is my favorite form of peace.”");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-rose-400 to-purple-700 p-6 text-center text-white">

      {/* MUSIC */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2023/02/28/audio_2fe08a1f8b.mp3?filename=romantic-piano-140000.mp3" />
      </audio>

      {/* LETTER */}
      {stage === "letter" && (
        <div
          onClick={openLetter}
          className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-xl cursor-pointer transition hover:scale-105"
        >
          <h1 className="text-3xl font-bold mb-4">💌 Open the Love Letter</h1>
          <p className="opacity-80">Tap to open…surpise  ❤️</p>
        </div>
      )}

      {/* RING */}
      {stage === "ring" && (
        <div onClick={showRing} className="cursor-pointer">
          <div className="text-7xl animate-bounce mb-4">💍</div>
          <p className="text-xl opacity-90">Tap the ring love…</p>
        </div>
      )}

      {/* MESSAGE */}
      <pre className="whitespace-pre-wrap text-lg mt-6 min-h-40">
        {msg}
      </pre>

      {/* BUTTON THAT RUNS AWAY */}
      {stage === "avoid" && (
        <button
          onMouseEnter={moveButton}
          onClick={finalConfession}
          className="px-6 py-3 bg-pink-600 rounded-xl text-white font-semibold text-xl transition-all relative"
        >
          Click Me  if you love me  ❤️
        </button>
      )}

      {/* FINAL MESSAGE */}
      {stage === "final" && (
        <div className="text-4xl font-bold animate-pulse mt-8">
          💖 I LOVE YOU my shundariiii💖  
        </div>
      )}
    </div>
  );
}
