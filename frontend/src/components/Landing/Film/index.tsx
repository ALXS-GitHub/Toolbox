/**
 * "From an idea to a commit": a short motion-design film in six scenes, played at the top of the home page.
 *
 * - Auto-plays when it comes into view, pauses when it leaves; play/pause/replay and chapter buttons.
 * - prefers-reduced-motion: nothing plays by itself; chapters jump to still frames.
 * - Debug: ?t=23.5 freezes the film at a given second, ?scene=3 on a scene's still frame,
 *   ?motion=reduce forces the reduced-motion version.
 */
import React, {type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import {FiPause, FiPlay, FiRotateCcw} from 'react-icons/fi';
import Stage, {SIZES, type Mode} from './Stage';
import {buildFilm, END, POSTERS, SCENES} from './timeline';
import {useFilmCopy} from './copy';
import s from './Film.module.scss';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const P_MAX = 520;
const P_BELOW = 760;

function params() {
  const p = new URLSearchParams(window.location.search);
  const t = p.get('t');
  const scene = p.get('scene');
  return {
    t: t !== null ? Number(t) : scene !== null ? POSTERS[Math.min(5, Math.max(0, Number(scene) - 1))] : undefined,
    motion: p.get('motion'),
  };
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

export default function Film(): ReactNode {
  const c = useFilmCopy();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const timeRef = useRef<HTMLSpanElement>(null);
  const film = useRef<ReturnType<typeof buildFilm> | null>(null);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const debugT = useRef<number | undefined>(undefined);

  const [mode, setMode] = useState<Mode>('L');
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [debug, setDebug] = useState(false);
  const sceneRef = useRef(0);

  // Composition and scale follow the available width.
  useIsoLayoutEffect(() => {
    const wrap = wrapRef.current!;
    const apply = () => {
      const w = wrap.clientWidth;
      const m: Mode = w < P_BELOW ? 'P' : 'L';
      const stageW = m === 'P' ? Math.min(w, P_MAX) : w;
      canvasRef.current?.style.setProperty('--s', String(stageW / SIZES[m].w));
      setMode(m);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const {motion, t} = params();
    debugT.current = t;
    setDebug(t !== undefined);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(motion === 'reduce' || (motion !== 'full' && mq.matches));
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const tick = useCallback(() => {
    const f = film.current;
    if (!f) return;
    const t = f.tl.time();
    f.hud(t);
    let i = 0;
    while (i < SCENES.length - 1 && t >= SCENES[i + 1]) i++;
    if (i !== sceneRef.current) {
      sceneRef.current = i;
      setScene(i);
    }
    SCENES.forEach((start, k) => {
      const end = SCENES[k + 1] ?? END;
      const p = Math.min(1, Math.max(0, (t - start) / (end - start)));
      const el = fills.current[k];
      if (el) el.style.transform = `scaleX(${p})`;
    });
    if (timeRef.current) timeRef.current.textContent = `${fmt(t)} / ${fmt(END)}`;
  }, []);

  // Build (and rebuild on composition change) the timeline, once fonts are ready so measurements hold.
  useEffect(() => {
    const canvas = canvasRef.current!;
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    const previous = film.current?.tl.time();
    const wasPlaying = film.current ? !film.current.tl.paused() : false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const f = buildFilm(canvas, mode);
        film.current = f;
        f.tl.eventCallback('onUpdate', tick);
        f.tl.eventCallback('onComplete', () => {
          setPlaying(false);
          setEnded(true);
        });
        const start = debugT.current ?? previous ?? (reduced ? POSTERS[0] : 0);
        f.tl.time(start, false);
        tick();
        if (wasPlaying && !reduced) {
          f.tl.play();
        } else if (visible.current && !reduced && debugT.current === undefined && !userPaused.current && start === 0) {
          f.tl.play();
          setPlaying(true);
        }
      }, canvas);
      setReady(true);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [mode, reduced, tick]);

  // Play when the film comes into view, pause when it leaves.
  useEffect(() => {
    const wrap = wrapRef.current!;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.intersectionRatio >= 0.35;
        const f = film.current;
        if (!f || reduced || debugT.current !== undefined) return;
        if (visible.current && !userPaused.current && f.tl.time() < END) {
          f.tl.play();
          setPlaying(true);
        } else if (entry.intersectionRatio < 0.1 && !f.tl.paused()) {
          f.tl.pause();
          setPlaying(false);
        }
      },
      {threshold: [0, 0.1, 0.35, 0.6]},
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  // Pause CSS loops and SVG animations with the film.
  useEffect(() => {
    canvasRef.current?.querySelectorAll('svg').forEach((svg) => {
      if (playing) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
  }, [playing, ready]);

  const toggle = () => {
    const f = film.current;
    if (!f) return;
    if (ended || f.tl.time() >= END) {
      setEnded(false);
      userPaused.current = false;
      f.tl.restart();
      setPlaying(true);
    } else if (!f.tl.paused()) {
      userPaused.current = true;
      f.tl.pause();
      setPlaying(false);
    } else {
      userPaused.current = false;
      f.tl.play();
      setPlaying(true);
    }
  };

  const goTo = (i: number) => {
    const f = film.current;
    if (!f) return;
    setEnded(false);
    if (reduced) {
      f.tl.pause().time(POSTERS[i]);
      setPlaying(false);
    } else {
      userPaused.current = false;
      f.tl.time(SCENES[i]).play();
      setPlaying(true);
    }
    tick();
  };

  const {w, h} = SIZES[mode];
  const label = ended ? c.replay : playing ? c.pause : c.play;

  return (
    <div className={s.film} ref={wrapRef}>
      <div
        className={clsx(s.stage, mode === 'P' ? s.P : s.L, !playing && s.paused)}
        style={{aspectRatio: `${w} / ${h}`}}
        aria-hidden>
        <div className={clsx(s.canvas, ready && s.ready, debug && s.instant)} ref={canvasRef} style={{width: w, height: h}}>
          <Stage c={c} mode={mode} />
        </div>
      </div>

      <div className={s.bar} style={mode === 'P' ? {maxWidth: P_MAX} : undefined}>
        <button type="button" className={s.playBtn} onClick={toggle} aria-label={label} title={label}>
          {ended ? <FiRotateCcw /> : playing ? <FiPause /> : <FiPlay style={{marginLeft: 2}} />}
        </button>
        <div className={s.chapters} role="group" aria-label={c.filmLabel}>
          {c.scenes.map((sc, i) => (
            <button
              key={sc.title}
              type="button"
              className={clsx(s.chapterBtn, i === scene && s.chapterActive)}
              onClick={() => goTo(i)}
              aria-label={`${c.chapter} ${i + 1} : ${sc.title}`}
              aria-current={i === scene ? 'step' : undefined}>
              <span className={s.track}>
                <span className={s.fill} ref={(el) => void (fills.current[i] = el)} />
              </span>
              <span className={s.chapterLabel}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <span>{sc.title}</span>
              </span>
            </button>
          ))}
        </div>
        <span className={s.time} ref={timeRef} aria-hidden>
          0:00 / {fmt(END)}
        </span>
      </div>

      <div className={s.captions} style={mode === 'P' ? {maxWidth: P_MAX} : undefined} aria-hidden>
        {c.scenes.map((sc, i) => (
          <p key={sc.title} className={clsx(s.caption, i === scene && s.captionOn)}>
            {sc.text.split(' ').map((word, k) => (
              <React.Fragment key={k}>
                <span style={{transitionDelay: i === scene ? `${k * 22}ms` : '0ms'}}>{word}</span>{' '}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>

      <ol className={s.srOnly}>
        {c.scenes.map((sc) => (
          <li key={sc.title}>
            {sc.title}. {sc.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
