import React from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import useAudioStore from '../store/audioStore';

export default function Player() {
  const { isPlaying, currentTrack, volume, setPlaying, setVolume } = useAudioStore();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400">{currentTrack.description}</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Volume2 className="text-gray-400 w-5 h-5" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-purple-500"
              />
            </div>

            <button
              onClick={() => setPlaying(!isPlaying)}
              className={`p-3 rounded-full transition-colors ${
                isPlaying 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}