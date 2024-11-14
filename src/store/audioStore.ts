import { create } from 'zustand';
import { tracks } from '../data/tracks';
import { AudioEngine } from '../lib/audioEngine';

interface YouTubePlayer {
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
}

interface AudioState {
  // Binaural beats state
  isPlaying: boolean;
  currentTrack: typeof tracks[number] | null;
  volume: number;
  audioEngine: AudioEngine;
  
  // Ambient sounds state
  activeScenes: Set<string>;
  sceneVolumes: Map<string, number>;
  youtubePlayers: Map<string, YouTubePlayer>;
  
  // Timer state
  timer: number | null;
  
  // Actions
  setPlaying: (playing: boolean) => void;
  setTrack: (track: typeof tracks[number]) => void;
  setVolume: (volume: number) => void;
  setYouTubePlayer: (sceneId: string, player: YouTubePlayer) => void;
  toggleScene: (sceneId: string) => void;
  setSceneVolume: (sceneId: string, volume: number) => void;
  setTimer: (minutes: number | null) => void;
  cleanup: () => void;
}

const audioEngine = new AudioEngine();

const useAudioStore = create<AudioState>((set, get) => ({
  // Binaural beats state
  isPlaying: false,
  currentTrack: null,
  volume: 0.5,
  audioEngine,
  
  // Ambient sounds state
  activeScenes: new Set(),
  sceneVolumes: new Map(),
  youtubePlayers: new Map(),
  
  // Timer state
  timer: null,

  setPlaying: (playing) => {
    const { currentTrack } = get();
    if (currentTrack) {
      if (playing) {
        audioEngine.play(currentTrack);
      } else {
        audioEngine.stop();
      }
      set({ isPlaying: playing });
    }
  },

  setTrack: (track) => {
    const { isPlaying } = get();
    audioEngine.stop();
    set({ currentTrack: track });
    if (isPlaying) {
      audioEngine.play(track);
    }
  },

  setVolume: (volume) => {
    audioEngine.setVolume(volume);
    set({ volume });
  },

  setYouTubePlayer: (sceneId, player) => {
    const { youtubePlayers } = get();
    youtubePlayers.set(sceneId, player);
    set({ youtubePlayers: new Map(youtubePlayers) });
  },

  toggleScene: (sceneId) => {
    const { activeScenes, youtubePlayers, sceneVolumes } = get();
    const newScenes = new Set(activeScenes);
    const player = youtubePlayers.get(sceneId);
    
    if (!player) return;

    if (activeScenes.has(sceneId)) {
      player.mute();
      newScenes.delete(sceneId);
    } else {
      player.unMute();
      player.setVolume(sceneVolumes.get(sceneId) || 50);
      newScenes.add(sceneId);
    }

    set({ activeScenes: newScenes });
  },

  setSceneVolume: (sceneId, volume) => {
    const { sceneVolumes, youtubePlayers, activeScenes } = get();
    const newVolumes = new Map(sceneVolumes);
    newVolumes.set(sceneId, volume);
    
    const player = youtubePlayers.get(sceneId);
    if (player && activeScenes.has(sceneId)) {
      player.setVolume(volume);
    }
    
    set({ sceneVolumes: newVolumes });
  },

  setTimer: (minutes) => {
    set({ timer: minutes });
  },

  cleanup: () => {
    const { youtubePlayers } = get();
    audioEngine.cleanup();
    youtubePlayers.clear();
  },
}));

export default useAudioStore;