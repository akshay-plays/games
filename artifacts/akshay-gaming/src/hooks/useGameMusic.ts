import { useRef, useCallback } from "react";

export function useGameMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const playingRef = useRef(false);
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getCtx = () => {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  };

  const playNote = (
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = "square",
    gain = 0.08
  ) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(gain, startTime + 0.01);
    env.gain.setValueAtTime(gain, startTime + duration - 0.03);
    env.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.connect(env);
    env.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
    nodesRef.current.push(osc, env);
  };

  const scheduleLoop = useCallback((ctx: AudioContext, loopStart: number) => {
    if (!playingRef.current) return;

    const bpm = 140;
    const step = 60 / bpm / 2;

    // --- Melody (square wave) ---
    const melody = [
      [523, 1], [659, 1], [784, 1], [659, 1],
      [880, 2], [784, 1], [659, 1],
      [523, 1], [587, 1], [659, 2], [523, 2],
      [698, 1], [784, 1], [880, 2], [698, 2],
    ];

    let t = loopStart;
    for (const [freq, beats] of melody) {
      playNote(ctx, freq, t, step * beats * 0.85, "square", 0.07);
      t += step * beats;
    }

    // --- Bass (sawtooth) ---
    const bass = [130, 0, 146, 0, 130, 0, 116, 0, 130, 0, 146, 0, 130, 0, 116, 0];
    t = loopStart;
    for (const freq of bass) {
      if (freq > 0) playNote(ctx, freq, t, step * 0.7, "sawtooth", 0.05);
      t += step;
    }

    // --- Hi-hat (noise-like via high-freq triangle) ---
    for (let i = 0; i < 16; i++) {
      if (i % 2 === 1) {
        playNote(ctx, 8000 + Math.random() * 2000, loopStart + i * step, step * 0.1, "triangle", 0.03);
      }
    }

    // --- Kick (low sine blip) ---
    const kicks = [0, 4, 8, 12];
    for (const k of kicks) {
      playNote(ctx, 60, loopStart + k * step, step * 0.3, "sine", 0.12);
    }

    const loopDuration = step * 16 * 1000;
    scheduleRef.current = setTimeout(() => scheduleLoop(ctx, loopStart + step * 16), loopDuration - 100);
  }, []);

  const start = useCallback(async () => {
    const ctx = getCtx();
    if (ctx.state === "suspended") await ctx.resume();
    playingRef.current = true;
    scheduleLoop(ctx, ctx.currentTime + 0.05);
  }, [scheduleLoop]);

  const stop = useCallback(() => {
    playingRef.current = false;
    if (scheduleRef.current) clearTimeout(scheduleRef.current);
    nodesRef.current.forEach(n => {
      try { (n as OscillatorNode).stop?.(); } catch {}
    });
    nodesRef.current = [];
    if (ctxRef.current) {
      ctxRef.current.suspend();
    }
  }, []);

  return { start, stop };
}
