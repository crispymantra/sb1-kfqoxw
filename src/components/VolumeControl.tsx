import React from 'react';
import { Volume2 } from 'lucide-react';
import useAudioStore from '../store/audioStore';

export default function VolumeControl() {
  const { masterVolume, setMasterVolume } = useAudioStore();

  return (
    <div className="flex items-center space-x-3">
      <Volume2 className="w-5 h-5 text-gray-400" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={masterVolume}
        onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
        className="w-24 accent-purple-500"
      />
    </div>
  );
}</content>