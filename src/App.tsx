import React, { useEffect } from 'react';
import { Brain } from 'lucide-react';
import TrackList from './components/TrackList';
import SoundMixer from './components/SoundMixer';
import Player from './components/Player';
import Timer from './components/Timer';
import useAudioStore from './store/audioStore';

function App() {
  const cleanup = useAudioStore((state) => state.cleanup);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mindwave
                </h1>
                <p className="text-sm text-gray-400">Focus & Meditation</p>
              </div>
            </div>
            <Timer />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">Binaural Beats</h2>
            <p className="text-gray-400 mb-6">Select a frequency to enhance your focus and meditation</p>
            <TrackList />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">Ambient Soundscapes</h2>
            <p className="text-gray-400 mb-6">Mix different sounds to create your perfect environment</p>
            <SoundMixer />
          </section>
        </div>
      </main>

      <Player />
    </div>
  );
}

export default App;