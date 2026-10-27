// Audio feedback engine using Web Audio API
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(frequency, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay restrictions or unsupported
    }
  }

  compare(val = 300) {
    const freq = Math.min(800, 250 + (val * 15));
    this.playTone(freq, 'sine', 0.06, 0.04);
  }

  swap() {
    this.playTone(450, 'triangle', 0.1, 0.06);
    setTimeout(() => this.playTone(550, 'triangle', 0.1, 0.06), 40);
  }

  found() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.18, 0.08);
      }, idx * 60);
    });
  }

  discard() {
    this.playTone(180, 'sawtooth', 0.08, 0.03);
  }

  click() {
    this.playTone(800, 'sine', 0.02, 0.02);
  }
}

window.soundEngine = new SoundEngine();
