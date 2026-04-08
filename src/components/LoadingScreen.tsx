import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Phase = 'enter' | 'shrink' | 'split' | 'done';

const ORANGE = '#FF642B';
const EASE_SHARP = [0.76, 0, 0.24, 1] as const;

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    // 0ms      → enter  (text fades in over 400ms)
    // 800ms    → shrink (text scales down over 900ms)
    // 1700ms   → split  (halves fly apart over 900ms, text fades out)
    // 2600ms   → done   (component removed)
    const t1 = setTimeout(() => setPhase('shrink'), 800);
    const t2 = setTimeout(() => setPhase('split'),  1700);
    const t3 = setTimeout(() => setPhase('done'),   2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  const isSplit   = phase === 'split';
  const isShrunk  = phase === 'shrink' || phase === 'split';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>

      {/* ── TOP HALF ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          backgroundColor: ORANGE,
        }}
        animate={{ y: isSplit ? '-100%' : '0%' }}
        transition={{ duration: 0.9, ease: EASE_SHARP }}
      />

      {/* ── BOTTOM HALF ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          backgroundColor: ORANGE,
        }}
        animate={{ y: isSplit ? '100%' : '0%' }}
        transition={{ duration: 0.9, ease: EASE_SHARP }}
      />

      {/* ── TEXT (sits above both halves) ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: isSplit ? 0 : 1,
          scale: isShrunk ? 0.25 : 1,
        }}
        transition={
          isSplit
            ? { opacity: { duration: 0.25, ease: 'easeIn' }, scale: { duration: 0 } }
            : isShrunk
            ? { scale: { duration: 0.9, ease: EASE_SHARP }, opacity: { duration: 0 } }
            : { opacity: { duration: 0.35, ease: 'easeOut' } }
        }
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 700,
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            letterSpacing: '0.06em',
            color: '#ffffff',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          Studio 91
        </span>
      </motion.div>

    </div>
  );
}
