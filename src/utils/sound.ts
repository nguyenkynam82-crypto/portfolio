class SoundManager {
  private context: AudioContext | null = null;
  private isMuted: boolean = true;

  public init() {
    if (!this.context && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.context = new AudioContextClass();
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted && !this.context) {
      this.init();
    }
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public playHover() {
    if (this.isMuted || !this.context) return;
    try {
      const t = this.context.currentTime;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      
      // A soft low-frequency pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.1);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      
      osc.connect(gain);
      gain.connect(this.context.destination);
      
      osc.start(t);
      osc.stop(t + 0.1);
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  }

  public playClick() {
    if (this.isMuted || !this.context) return;
    try {
      const t = this.context.currentTime;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      
      // A sharp mechanical click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.05);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      
      osc.connect(gain);
      gain.connect(this.context.destination);
      
      osc.start(t);
      osc.stop(t + 0.05);
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  }
}

export const soundManager = new SoundManager();
