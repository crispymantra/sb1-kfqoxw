import React from 'react';
import { BookOpen, Briefcase, Flower2 } from 'lucide-react';
import { tracks } from '../data/tracks';
import useAudioStore from '../store/audioStore';

const categoryIcons = {
  study: BookOpen,
  work: Briefcase,
  meditation: Flower2,
};

export default function TrackList() {
  const { currentTrack, setTrack } = useAudioStore();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => {
        const Icon = categoryIcons[track.category];
        const isSelected = currentTrack?.id === track.id;

        return (
          <button
            key={track.id}
            onClick={() => setTrack(track)}
            className={`group p-6 rounded-lg border transition-all ${
              isSelected
                ? 'bg-purple-600/20 border-purple-500 hover:bg-purple-600/30'
                : 'bg-black/20 border-transparent hover:bg-black/30 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-500' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-medium mb-1">{track.title}</h3>
                <p className={`text-sm ${isSelected ? 'text-purple-200' : 'text-gray-400'}`}>
                  {track.description}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {track.baseFrequency}Hz + {track.beatFrequency}Hz
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}