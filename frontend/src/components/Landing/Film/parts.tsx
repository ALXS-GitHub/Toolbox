/**
 * Small visual atoms shared by the film and the other mockups of the home page: the Claude mark, Zorg's status
 * dots and priority glyph, ticket cards. They copy the real apps' shapes and colours; the data is always made up.
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import s from './parts.module.scss';

export function ClaudeMark({className, size = 16}: {className?: string; size?: number}): ReactNode {
  const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg className={clsx(s.claudeMark, className)} width={size} height={size} viewBox="-12 -12 24 24" aria-hidden>
      {rays.map((a, i) => (
        <line
          key={a}
          x1="0"
          y1="0"
          x2={Math.cos((a * Math.PI) / 180) * (i % 2 ? 9 : 11)}
          y2={Math.sin((a * Math.PI) / 180) * (i % 2 ? 9 : 11)}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export type ZStatus = 'open' | 'progress' | 'done';

export function StatusDot({status, className}: {status: ZStatus; className?: string}): ReactNode {
  return (
    <span className={clsx(s.sdot, s[`sdot-${status}`], className)} aria-hidden>
      {status === 'done' ? (
        <svg viewBox="0 0 12 12">
          <path d="M3 6.2l2 2 4-4.4" />
        </svg>
      ) : null}
    </span>
  );
}

/** Zorg's priority glyph: three bars, lit up to the level (1 low, 2 medium, 3 high). */
export function Priority({level}: {level: 1 | 2 | 3}): ReactNode {
  return (
    <span className={clsx(s.prio, s[`prio-${level}`])} aria-hidden>
      <i className={level >= 1 ? s.on : ''} />
      <i className={level >= 2 ? s.on : ''} />
      <i className={level >= 3 ? s.on : ''} />
    </span>
  );
}

export function Chip({children, tone = 'violet'}: {children: ReactNode; tone?: 'violet' | 'sky' | 'pink' | 'teal' | 'amber'}): ReactNode {
  return <span className={clsx(s.chip, s[`chip-${tone}`])}>{children}</span>;
}

export function Avatar({letter, tone = 0, claude}: {letter?: string; tone?: number; claude?: boolean}): ReactNode {
  if (claude) {
    return (
      <span className={clsx(s.avatar, s.avatarClaude)} aria-hidden>
        <ClaudeMark size={11} />
      </span>
    );
  }
  return (
    <span className={clsx(s.avatar, s[`avatar-${tone % 4}`])} aria-hidden>
      {letter}
    </span>
  );
}

export function TicketCard({
  k,
  title,
  prio,
  label,
  tone,
  avatar,
  comments,
  className,
  children,
}: {
  k: string;
  title: string;
  prio: 1 | 2 | 3;
  label?: string;
  tone?: 'violet' | 'sky' | 'pink' | 'teal' | 'amber';
  avatar?: ReactNode;
  comments?: number;
  className?: string;
  children?: ReactNode;
}): ReactNode {
  return (
    <div className={clsx(s.card, className)}>
      <div className={s.cardRow}>
        <Priority level={prio} />
        <span className={s.cardKey}>#{k}</span>
        {comments ? (
          <span className={s.cardMeta}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {comments}
          </span>
        ) : null}
        <span className={s.grow} />
        {avatar}
      </div>
      <div className={s.cardTitle}>{title}</div>
      {label ? (
        <div className={s.cardFoot}>
          <Chip tone={tone}>{label}</Chip>
          {children}
        </div>
      ) : null}
    </div>
  );
}
