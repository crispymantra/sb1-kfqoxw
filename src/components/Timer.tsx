import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import useAudioStore from '../store/audioStore';

export default function Timer() {
  const [showTimer, setShowTimer] = useState(false);
  const { timer, setTimer, setPlaying } = useAudioStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (timer === null) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(timer * 60);
    const interval = setInterval(() => {
      setTimeLeft((current) => {
        if (current === null) return null;
        if (current <= 1) {
          setTimer(null);
          setPlaying(false);
          return null;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowTimer(!showTimer)}
        className="p-2 rounded-full hover:bg-white/5 transition-colors relative"
      >
        <TimerIcon className="w-6 h-6 text-gray-300" />
        {timeLeft && (
          <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[40px] text-center">
            {formatTime(timeLeft)}
          </div>
        )}
      </button>

      {showTimer && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/5 p-2">
          <div className="space-y-1">
            {[15, 30, 45, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => {
                  setTimer(minutes);
                  setShowTimer(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition-colors"
              >
                {minutes} minutes
              </button>
            ))}
            {timer && (
              <button
                onClick={() => setTimer(null)}
                className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition-colors text-red-400"
              >
                Cancel Timer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}