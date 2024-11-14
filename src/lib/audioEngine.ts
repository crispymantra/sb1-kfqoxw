export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private oscillators: { left: OscillatorNode; right: OscillatorNode } | null = null;
  private gainNode: GainNode | null = null;

  private initializeContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.setVolume(0.5);
    }
    return this.audioContext;
  }

  play(track: { baseFrequency: number; beatFrequency: number }) {
    try {
      const ctx = this.initializeContext();
      
      // Resume context if suspended (needed for Chrome's autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      this.stop();
      
      if (!this.gainNode) return;
      
      const leftOsc = ctx.createOscillator();
      const rightOsc = ctx.createOscillator();
      
      const leftPanner = ctx.createStereoPanner();
      const rightPanner = ctx.createStereoPanner();
      
      leftPanner.pan.value = -1;
      rightPanner.pan.value = 1;
      
      leftOsc.frequency.value = track.baseFrequency;
      rightOsc.frequency.value = track.baseFrequency + track.beatFrequency;
      
      leftOsc.connect(leftPanner);
      rightOsc.connect(rightPanner);
      leftPanner.connect(this.gainNode);
      rightPanner.connect(this.gainNode);
      
      leftOsc.start();
      rightOsc.start();
      
      this.oscillators = { left: leftOsc, right: rightOsc };
    } catch (error) {
      console.error('Error playing binaural beats:', error);
    }
  }

  stop() {
    if (this.oscillators) {
      try {
        this.oscillators.left.stop();
        this.oscillators.right.stop();
      } catch (error) {
        console.error('Error stopping oscillators:', error);
      }
      this.oscillators = null;
    }
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(volume, this.audioContext?.currentTime || 0);
    }
  }

  cleanup() {
    this.stop();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    this.audioContext = null;
    this.gainNode = null;
  }
}