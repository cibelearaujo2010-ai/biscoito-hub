export interface StoryTrack {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  melody: number[];     // Piano lead notes in Hz (0 = rest)
  bass: number[];       // Violão thumb bass notes in Hz
  chords: number[][];   // Violão chord string voicings in Hz
  style: 'duet' | 'bossa' | 'waltz' | 'ballad';
}

export const STORY_TRACKS: StoryTrack[] = [
  {
    id: 'track-brigadeiro',
    title: 'Doce Manhã (Piano & Violão)',
    artist: 'Acústico 4 Irmãos',
    bpm: 92,
    style: 'duet',
    // G -> D -> Em -> C gentle piano melody + warm guitar fingerpicking
    melody: [
      587.33, 659.25, 783.99, 0, 739.99, 659.25, 587.33, 493.88,
      523.25, 587.33, 659.25, 0, 587.33, 493.88, 392.0, 0,
    ],
    bass: [196.0, 196.0, 146.83, 146.83, 164.81, 164.81, 130.81, 130.81],
    chords: [
      [246.94, 293.66, 392.0], // G
      [220.0, 293.66, 369.99], // D
      [246.94, 329.63, 392.0], // Em
      [261.63, 329.63, 392.0], // C
    ],
  },
  {
    id: 'track-mms',
    title: 'Tarde Alegre (Violão & Piano)',
    artist: 'Duo Lilás Acústico',
    bpm: 108,
    style: 'duet',
    // Bright D -> A -> Bm -> G acoustic duet
    melody: [
      587.33, 739.99, 880.0, 739.99, 659.25, 739.99, 880.0, 0,
      783.99, 739.99, 659.25, 587.33, 493.88, 587.33, 659.25, 0,
    ],
    bass: [146.83, 146.83, 220.0, 220.0, 246.94, 246.94, 196.0, 196.0],
    chords: [
      [293.66, 369.99, 440.0], // D
      [220.0, 277.18, 329.63], // A
      [246.94, 293.66, 369.99], // Bm
      [196.0, 246.94, 293.66], // G
    ],
  },
  {
    id: 'track-cacau',
    title: 'Chuva e Chocolate (Piano & Violão)',
    artist: 'Mestre Adão Acústico',
    bpm: 80,
    style: 'ballad',
    // Expressive Em7 -> Am7 -> D7 -> Gmaj7 acoustic ballad
    melody: [
      659.25, 0, 739.99, 783.99, 659.25, 587.33, 523.25, 0,
      587.33, 659.25, 739.99, 587.33, 493.88, 0, 392.0, 0,
    ],
    bass: [164.81, 164.81, 110.0, 110.0, 146.83, 146.83, 196.0, 196.0],
    chords: [
      [246.94, 329.63, 392.0], // Em
      [261.63, 329.63, 392.0], // Am7
      [220.0, 293.66, 369.99], // D
      [246.94, 369.99, 392.0], // Gmaj7
    ],
  },
  {
    id: 'track-bossa',
    title: 'Saudade na Varanda (Violão Bossa & Piano)',
    artist: 'Trio Pinheiros',
    bpm: 94,
    style: 'bossa',
    // Warm Fmaj7 -> G7 -> Gm7 -> C7 nylon guitar + jazz piano
    melody: [
      698.46, 0, 659.25, 587.33, 523.25, 0, 587.33, 659.25,
      587.33, 523.25, 440.0, 0, 466.16, 440.0, 349.23, 0,
    ],
    bass: [174.61, 130.81, 196.0, 146.83, 196.0, 146.83, 130.81, 196.0],
    chords: [
      [261.63, 329.63, 440.0], // Fmaj7
      [246.94, 349.23, 392.0], // G7
      [233.08, 349.23, 392.0], // Gm7
      [233.08, 329.63, 392.0], // C7
    ],
  },
  {
    id: 'track-lata',
    title: 'Valsa da Lata Lilás (Piano & Violão)',
    artist: 'Cibele Araújo Acústico',
    bpm: 96,
    style: 'waltz',
    // Delicate A -> E -> F#m -> D waltz-feel piano & acoustic guitar
    melody: [
      659.25, 880.0, 830.61, 659.25, 739.99, 659.25,
      587.33, 739.99, 659.25, 554.37, 493.88, 440.0,
    ],
    bass: [220.0, 220.0, 164.81, 164.81, 185.0, 185.0, 146.83, 146.83],
    chords: [
      [220.0, 277.18, 329.63], // A
      [246.94, 329.63, 415.3], // E
      [220.0, 277.18, 369.99], // F#m
      [220.0, 293.66, 369.99], // D
    ],
  },
  {
    id: 'track-fornada',
    title: 'Forno Quentinho (Dedilhado & Piano)',
    artist: 'Fornada Acústica',
    bpm: 84,
    style: 'ballad',
    // Peaceful C -> G/B -> Am -> F dedilhado de violão + piano
    melody: [
      523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 493.88, 0,
      440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0, 0,
    ],
    bass: [130.81, 130.81, 123.47, 123.47, 110.0, 110.0, 174.61, 174.61],
    chords: [
      [261.63, 329.63, 392.0], // C
      [246.94, 293.66, 392.0], // G/B
      [220.0, 261.63, 329.63], // Am
      [220.0, 261.63, 349.23], // F
    ],
  },
];

class StoryAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private step = 0;
  private currentTrack: StoryTrack | null = null;
  private isPlaying = false;

  private ensureContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.28;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Warm Acoustic Piano voice:
   * Hammer attack + fundamental triangle + decaying 2nd harmonic + gentle dynamic filter
   */
  private playPianoNote(freq: number, durationSec: number, volume = 0.22) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    const now = this.ctx.currentTime;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3400, now);
    filter.frequency.exponentialRampToValueAtTime(950, now + Math.min(durationSec, 1.2));

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(volume, now + 0.012);
    env.gain.exponentialRampToValueAtTime(volume * 0.45, now + 0.18);
    env.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    // Fundamental body
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Soft octave overtone for piano brightness on attack
    const osc2 = this.ctx.createOscillator();
    const osc2Gain = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2Gain.gain.setValueAtTime(0.32, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);

    filter.connect(env);
    env.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.05);
    osc2.stop(now + durationSec + 0.05);
  }

  /**
   * Warm Nylon/Acoustic Violão string pluck:
   * Plucked string filter sweep + warm woody resonance
   */
  private playGuitarPluck(freq: number, durationSec: number, delaySec = 0, volume = 0.16) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    const start = this.ctx.currentTime + delaySec;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, start);
    filter.frequency.exponentialRampToValueAtTime(620, start + 0.28);
    filter.Q.value = 1.1;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(volume, start + 0.008);
    env.gain.exponentialRampToValueAtTime(volume * 0.35, start + 0.14);
    env.gain.exponentialRampToValueAtTime(0.0001, start + durationSec);

    // Nylon string blend (sine fundamental + subtle sawtooth harmonic texture)
    const oscFund = this.ctx.createOscillator();
    oscFund.type = 'triangle';
    oscFund.frequency.setValueAtTime(freq, start);

    const oscHarm = this.ctx.createOscillator();
    const harmGain = this.ctx.createGain();
    oscHarm.type = 'sine';
    oscHarm.frequency.setValueAtTime(freq * 2, start);
    harmGain.gain.setValueAtTime(0.24, start);
    harmGain.gain.exponentialRampToValueAtTime(0.01, start + 0.18);

    oscFund.connect(filter);
    oscHarm.connect(harmGain);
    harmGain.connect(filter);

    filter.connect(env);
    env.connect(this.masterGain);

    oscFund.start(start);
    oscHarm.start(start);
    oscFund.stop(start + durationSec + 0.04);
    oscHarm.stop(start + durationSec + 0.04);
  }

  public start(track: StoryTrack) {
    this.stop();
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.currentTrack = track;
    this.isPlaying = true;
    this.step = 0;

    const stepMs = (60 / track.bpm / 2) * 1000; // Eighth-note pulse
    const beatSec = stepMs / 1000;

    const tick = () => {
      if (!this.isPlaying || !this.currentTrack) return;

      const t = this.currentTrack;
      const s = this.step;

      // 1. Piano Melody
      const melFreq = t.melody[s % t.melody.length];
      if (melFreq > 0) {
        this.playPianoNote(melFreq, beatSec * 2.8, 0.22);
      }

      // 2. Piano Left-Hand Warm Bass/Chord on measure downbeats
      if (s % 4 === 0 && t.chords.length > 0) {
        const chordIdx = Math.floor(s / 4) % t.chords.length;
        const chord = t.chords[chordIdx];
        // Soft piano chord sustain
        chord.forEach((f, idx) => {
          this.playPianoNote(f, beatSec * 3.8, idx === 0 ? 0.11 : 0.08);
        });
      }

      // 3. Violão Fingerpicking (Dedilhado) & Nylon Bass
      if (t.chords.length > 0) {
        const chordIdx = Math.floor(s / 4) % t.chords.length;
        const chord = t.chords[chordIdx];

        if (s % 2 === 0) {
          // Violão thumb bass note
          const bassIdx = Math.floor(s / 2) % t.bass.length;
          this.playGuitarPluck(t.bass[bassIdx], beatSec * 2.4, 0, 0.22);
        }

        if (t.style === 'bossa') {
          // Bossa nova violão syncopated comping
          if (s % 4 === 0 || s % 4 === 3) {
            chord.forEach((f, i) => {
              this.playGuitarPluck(f, beatSec * 1.5, i * 0.018, 0.11);
            });
          }
        } else {
          // Classical / MPB dedilhado fingerpicking across strings every eighth note
          const stringNote = chord[s % chord.length];
          this.playGuitarPluck(stringNote, beatSec * 1.9, 0.01, 0.13);
        }
      }

      this.step += 1;
    };

    tick();
    this.timerId = window.setInterval(tick, stepMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const storyAudio = new StoryAudioEngine();
