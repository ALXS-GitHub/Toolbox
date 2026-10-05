/**
 * The home-page film: a rendered video (see film/ at the root of the repo), full screen under the navbar,
 * looping, muted by default. One render per language and two framings: 16:9 for wide screens, 9:16 (composed,
 * not cropped) for tall ones. The narration is HTML, synced on the video's currentTime, so it is translated with
 * the rest of the site and stays sharp whatever the crop.
 */
import React, {type ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {FiArrowDown, FiPause, FiPlay, FiVolume2, FiVolumeX} from 'react-icons/fi';
import timing from './captions.json';
import s from './Film.module.scss';

type Framing = 'land' | 'port';

/** Taller than wide: the 9:16 cut. */
const PORTRAIT_QUERY = '(max-aspect-ratio: 1/1)';

function useNarration() {
  return [
    {
      title: translate({id: 'home.film.s1.title', message: 'The idea'}),
      text: translate({
        id: 'home.film.s1.text',
        message: 'It starts on my phone. I dictate an idea to Claude, which files it in Zorg, my ticket manager, through its connector.',
      }),
    },
    {
      title: translate({id: 'home.film.s2.title', message: 'The ticket'}),
      text: translate({
        id: 'home.film.s2.text',
        message: 'Zorg holds every task, for me and for my agents: a web app, a desktop app, a CLI and an MCP server, all on the same data.',
      }),
    },
    {
      title: translate({id: 'home.film.s3.title', message: 'The agent'}),
      text: translate({
        id: 'home.film.s3.text',
        message:
          'Back at the computer, in CortX, the terminal I built, I hand the ticket to Claude Code. It reads it in full through the Zorg CLI and moves it to In progress.',
      }),
    },
    {
      title: translate({id: 'home.film.s4.title', message: 'The work'}),
      text: translate({
        id: 'home.film.s4.text',
        message:
          'It edits the code, starts the dev server through the CortX CLI and builds. A hook checks that the commit holds nothing sensitive, then git signs it with my SSH key, once 1Password has asked me to allow its use.',
      }),
    },
    {
      title: translate({id: 'home.film.s5.title', message: 'The trail'}),
      text: translate({
        id: 'home.film.s5.text',
        message: 'The ticket moves to Done, with a comment on how to check it, and my skills turn the work into a document and a diagram.',
      }),
    },
    {
      title: translate({id: 'home.film.s6.title', message: 'The environment'}),
      text: translate({
        id: 'home.film.s6.text',
        message:
          'That is the whole loop: tools I built, processes that keep agents reliable, and Claude doing most of the work. That is my ecosystem: Toolbox.',
      }),
    },
  ];
}

function captionAt(t: number): number {
  return timing.captions.findIndex((c) => t >= c.from && t < c.to);
}

export default function Film(): ReactNode {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'fr' ? 'fr' : 'en';
  const base = useBaseUrl('/video/');
  const src = useCallback((f: string, ext: string) => `${base}film-${locale}-${f}.${ext}`, [base, locale]);
  const narration = useNarration();

  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [framing, setFraming] = useState<Framing | null>(null); // null until the client knows the screen
  // Large screens (at least 1600 device pixels wide, not a phone) get the 2560 × 1440 render, shown 1:1
  // on 1440p displays; the others keep the lighter 1920 × 1080 one. Decided once, on load.
  const [hd, setHd] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // first frame shown: the poster can go
  const [muted, setMuted] = useState(true);
  const [still, setStill] = useState(false); // reduced motion or data saver: no autoplay
  const [armed, setArmed] = useState(false); // in still mode, the video is only fetched once Play is pressed
  const [cap, setCap] = useState(-1);
  const userPaused = useRef(false);
  const resumeAt = useRef(0);

  // Framing follows the screen's shape; switching keeps the current time.
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const pick = () => {
      if (video.current) resumeAt.current = video.current.currentTime;
      setFraming(mq.matches ? 'port' : 'land');
    };
    pick();
    setHd(window.innerWidth >= 1024 && window.innerWidth * (window.devicePixelRatio || 1) >= 1600);
    mq.addEventListener('change', pick);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & {connection?: {saveData?: boolean}}).connection?.saveData === true;
    setStill(reduce.matches || saveData);
    return () => mq.removeEventListener('change', pick);
  }, []);

  // Start (or resume) once the source is set.
  const live = framing !== null && (!still || armed);
  useEffect(() => {
    const v = video.current;
    if (!v || !live) return;
    v.load();
    const onMeta = () => {
      if (resumeAt.current > 0) v.currentTime = resumeAt.current % (v.duration || timing.duration);
      if (!userPaused.current) v.play().catch(() => setPlaying(false));
    };
    v.addEventListener('loadedmetadata', onMeta, {once: true});
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [framing, live, hd]);

  // Pause when the film leaves the screen, resume when it comes back.
  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) v.pause();
        else if ((!still || armed) && !userPaused.current && v.readyState > 0) v.play().catch(() => undefined);
      },
      {threshold: 0.2},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still, armed, framing]);

  // Captions follow the video's clock while it plays.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = video.current;
      if (v) setCap((c) => {
        const n = captionAt(v.currentTime);
        return n === c ? c : n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (!live) {
      userPaused.current = false;
      setArmed(true); // the sources are added, then the video loads and plays
      return;
    }
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      v.pause();
    }
  };
  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!live) {
      setArmed(true);
      return;
    }
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => undefined);
    }
  };
  const next = () => {
    const el = root.current?.nextElementSibling as HTMLElement | null;
    el?.scrollIntoView({behavior: still ? 'auto' : 'smooth', block: 'start'});
  };

  const label = translate({id: 'home.film.label', message: 'From an idea to a commit, in six scenes'});
  const line = cap >= 0 ? narration[cap] : null;
  const transcript = useMemo(() => narration.map((n) => `${n.title}. ${n.text}`).join(' '), [narration]);

  return (
    <section ref={root} className={s.film} aria-label={label}>
      <picture className={clsx(s.poster, started && s.posterGone)}>
        <source media={PORTRAIT_QUERY} srcSet={src('port', 'webp')} />
        <img src={src('land', 'webp')} alt="" fetchPriority="high" decoding="async" />
      </picture>
      <video
        ref={video}
        className={s.video}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlaying={() => setStarted(true)}>
        {live && (
          <>
            <source src={src(framing === 'land' && hd ? 'land-1440' : framing, 'webm')} type='video/webm; codecs="av01.0.12M.10, opus"' />
            <source src={src(framing === 'land' && hd ? 'land-1440' : framing, 'mp4')} type='video/mp4; codecs="avc1.640033, mp4a.40.2"' />
          </>
        )}
      </video>
      <div className={s.scrim} aria-hidden />

      <p className={s.srOnly}>{transcript}</p>
      <div className={s.captions} aria-hidden>
        {line && (
          <div key={cap} className={s.caption}>
            <span className={s.chapter}>
              <span>{String(cap + 1).padStart(2, '0')}</span>
              {line.title}
            </span>
            <span className={s.sentence}>{line.text}</span>
          </div>
        )}
      </div>

      {!playing && (still || started) && (
        <button type="button" className={s.bigPlay} onClick={toggle} aria-label={translate({id: 'home.film.play', message: 'Play'})}>
          <FiPlay />
        </button>
      )}

      <div className={s.controls}>
        <button
          type="button"
          className={s.ctl}
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? translate({id: 'home.film.soundOn', message: 'Turn the sound on'}) : translate({id: 'home.film.soundOff', message: 'Turn the sound off'})}>
          {muted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
        <button
          type="button"
          className={s.ctl}
          onClick={toggle}
          aria-label={playing ? translate({id: 'home.film.pause', message: 'Pause'}) : translate({id: 'home.film.play', message: 'Play'})}>
          {playing ? <FiPause /> : <FiPlay />}
        </button>
      </div>

      <button type="button" className={s.scroll} onClick={next}>
        <span>{translate({id: 'home.film.scroll', message: 'The rest of the site'})}</span>
        <FiArrowDown aria-hidden />
      </button>
    </section>
  );
}
