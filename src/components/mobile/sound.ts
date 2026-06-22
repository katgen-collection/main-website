// Procedural CRT sound effects for the Midnight Channel mobile OS.
// Everything is synthesized with the Web Audio API, so there are no audio
// assets and no copyright concerns. Muted by default; the AudioContext is only
// created/resumed inside a user gesture (browsers block autoplay otherwise).

type AudioCtor = typeof AudioContext;

class Sound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private listeners = new Set<() => void>();
  private initialized = false;
  muted = true;

  /** Read the persisted mute preference. Safe to call repeatedly. */
  init() {
    if (this.initialized) return;
    this.initialized = true;
    if (typeof localStorage === "undefined") return;
    const v = localStorage.getItem("p4-muted");
    if (v !== null) this.muted = v === "1";
  }

  /** External-store wiring for useSyncExternalStore. */
  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  getMuted = () => {
    this.init();
    return this.muted;
  };

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
      const AC = w.AudioContext ?? w.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.45;
      this.master.connect(this.ctx.destination);
      const len = Math.floor(this.ctx.sampleRate * 1.2);
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buf;
    }
    return this.ctx;
  }

  /** Call inside a user gesture to unlock audio. */
  enable() {
    const ctx = this.ensure();
    if (ctx && ctx.state === "suspended") void ctx.resume();
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (typeof localStorage !== "undefined") localStorage.setItem("p4-muted", m ? "1" : "0");
    this.emit();
  }

  private noise(dur: number, gain: number, filter?: { type: BiquadFilterType; freq: number }) {
    const ctx = this.ensure();
    if (!ctx || !this.master || !this.noiseBuffer || this.muted) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const g = ctx.createGain();
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    let node: AudioNode = src;
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = filter.type;
      f.frequency.value = filter.freq;
      src.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(this.master);
    src.start(now);
    src.stop(now + dur + 0.05);
  }

  private tone(freq: number, dur: number, gain: number, type: OscillatorType = "sine", sweepTo?: number) {
    const ctx = this.ensure();
    if (!ctx || !this.master || this.muted) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const now = ctx.currentTime;
    o.type = type;
    o.frequency.setValueAtTime(freq, now);
    if (sweepTo) o.frequency.exponentialRampToValueAtTime(sweepTo, now + dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(now);
    o.stop(now + dur + 0.02);
  }

  private noiseSweep(dur: number, gain: number, fromFreq: number, toFreq: number) {
    const ctx = this.ensure();
    if (!ctx || !this.master || !this.noiseBuffer || this.muted) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 0.7;
    const now = ctx.currentTime;
    f.frequency.setValueAtTime(fromFreq, now);
    f.frequency.exponentialRampToValueAtTime(toFreq, now + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(now);
    src.stop(now + dur + 0.05);
  }

  /** Fire a haptic buzz (Android; iOS Safari has no vibrate and no-ops). */
  private buzz(pattern: number | number[]) {
    if (this.muted) return;
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(pattern);
    }
  }

  /** Short UI blip for taps. */
  blip() {
    this.tone(620, 0.06, 0.13, "square");
    this.buzz(10);
  }

  /** Channel locks in: a thunk, a tick, and a short low burst. */
  clunk() {
    this.tone(95, 0.18, 0.32, "square", 42);
    this.tone(1600, 0.05, 0.07, "square");
    this.noise(0.06, 0.1, { type: "lowpass", freq: 800 });
    this.buzz([12, 26, 12]);
  }

  /** Degauss-style power thunk when the tube energizes. */
  powerOn() {
    this.tone(55, 0.3, 0.3, "sine", 180);
    this.tone(2200, 0.28, 0.05, "sine", 380);
    this.noise(0.1, 0.08, { type: "highpass", freq: 1200 });
    this.buzz(28);
  }

  /** Channel-change: sweeping static plus a descending flyback whine. */
  tune() {
    this.noiseSweep(0.7, 0.18, 700, 2600);
    this.tone(1300, 0.7, 0.05, "sawtooth", 280);
    this.buzz(18);
  }

  /** Velvet Room discovery: a soft chime and a fluttering haptic. */
  flutter() {
    this.tone(1320, 0.12, 0.06, "sine");
    this.tone(1760, 0.22, 0.05, "sine", 1980);
    this.buzz([8, 16, 8, 16, 8]);
  }
}

export const sound = new Sound();
