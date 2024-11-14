import React from 'react';
import { Volume2, Power } from 'lucide-react';
import YouTube from 'react-youtube';
import { sounds } from '../data/sounds';
import useAudioStore from '../store/audioStore';

export default function SoundMixer() {
  const { 
    activeScenes, 
    sceneVolumes,
    setYouTubePlayer,
    toggleScene,
    setSceneVolume 
  } = useAudioStore();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {sounds.map((sound) => {
        const isActive = activeScenes.has(sound.id);
        const volume = sceneVolumes.get(sound.id) || 50;

        return (
          <div
            key={sound.id}
            className={`p-6 rounded-lg transition-all ${
              isActive
                ? 'bg-purple-600/20 border-purple-500'
                : 'bg-black/20 hover:bg-black/30'
            } border border-transparent`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{sound.icon}</span>
                <div>
                  <h3 className="font-medium">{sound.title}</h3>
                  <p className="text-sm text-gray-400">{sound.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleScene(sound.id)}
                className={`p-2 rounded-full transition-colors ${
                  isActive 
                    ? 'bg-purple-500 text-white hover:bg-purple-600' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Power className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden bg-black/30">
              <YouTube
                videoId={sound.videoId}
                className="absolute inset-0"
                opts={{
                  height: '100%',
                  width: '100%',
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    loop: 1,
                    playlist: sound.videoId,
                    modestbranding: 1,
                  },
                }}
                onReady={(event) => {
                  setYouTubePlayer(sound.id, event.target);
                  event.target.setVolume(volume);
                  if (!isActive) {
                    event.target.mute();
                  } else {
                    event.target.unMute();
                  }
                }}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setSceneVolume(sound.id, parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}