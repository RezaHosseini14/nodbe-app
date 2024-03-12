import React, { useEffect, useRef, useState } from "react";
import { IoPlayCircle } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";

import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle } from "react-icons/fa";

const Waveform = ({ audio }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      waveSurferRef.current.pause();
    } else {
      waveSurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 4,
      barHeight: 1,
      barGap: 2,
      barRadius: 2,
      height: 45,
      width: 220,
      duration: 50,
      fillParent: true,
      waveColor: "rgb(80, 0, 0)",
      autoCenter: true,
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    waveSurfer.on("audioprocess", () => {
      const currentTime = waveSurfer.getCurrentTime();
      const formattedTime = formatTime(currentTime);
      document.getElementById("time-indicator").innerText = formattedTime;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = audio;
    anchor.download = "audio.wav";
    anchor.click();
  };

  return (
    <div className="flex flex-col gap-2 w-[250px]">
      <div className="backdrop-blur-2xl bg-white/40 rounded-xl px-4 " ref={containerRef} />
      <div className="flex items-center justify-between">
        <button
          className="text-xl hover:bg-gray-400 rounded-full bg-transparent transition w-8 h-8 flex items-center justify-center"
          onClick={() => waveSurferRef.current.playPause()}
          type="button"
        >
          {isPlaying ? <BsPlayFill /> : <FaPlayCircle />}
        </button>
        <button className="text-xl" onClick={handleDownload} type="button">
          <FiDownload />
        </button>
      </div>
    </div>
  );
};

export default Waveform;
