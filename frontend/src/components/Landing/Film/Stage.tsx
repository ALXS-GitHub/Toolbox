/**
 * The film's set: every mockup lives in one large "world" that a virtual camera pans and zooms across.
 * Positions come from CSS (one layout per composition: L = landscape, P = portrait); the timeline only
 * measures them and animates transforms and opacity. Elements the timeline drives carry a data-f hook.
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {
  FiAlignLeft,
  FiBell,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiFileText,
  FiGlobe,
  FiGrid,
  FiList,
  FiLock,
  FiMenu,
  FiMic,
  FiPlus,
  FiSearch,
  FiSettings,
  FiSliders,
  FiTerminal,
  FiCpu,
  FiMonitor,
  FiSmartphone,
  FiCode,
  FiShield,
  FiActivity,
  FiZap,
} from 'react-icons/fi';
import {Avatar, ClaudeMark, StatusDot, TicketCard} from './parts';
import type {FilmCopy} from './copy';
import s from './Film.module.scss';

export type Mode = 'L' | 'P';

export const SIZES: Record<Mode, {w: number; h: number}> = {
  L: {w: 1280, h: 720},
  P: {w: 420, h: 700},
};

/** Terminal lines, in order. `kind` drives the look; ids are the timeline's hooks. */
export function termLines(c: FilmCopy) {
  return [
    {id: 'user', kind: 'user', text: c.takeTicket},
    {id: 'skill', kind: 'tool', tool: 'Skill', arg: 'zorg-tickets', res: c.loaded},
    {id: 'show', kind: 'tool', tool: 'Bash', arg: 'zorg ticket show ZORG-128 --json', res: `#128 ${c.ticketTitle} · ${c.statusOpen}`},
    {id: 'move', kind: 'tool', tool: 'Bash', arg: `zorg ticket update ZORG-128 --status "${c.statusProgress}"`, res: `ZORG-128 → ${c.statusProgress}`},
    {id: 'read', kind: 'tool', tool: 'Read', arg: 'src/notes/NoteList.tsx', res: c.readLines},
    {id: 'edit', kind: 'tool', tool: 'Update', arg: 'src/notes/NoteList.tsx', res: '+18 −2', diff: true},
    {id: 'serve', kind: 'tool', tool: 'Bash', arg: 'cortx service start zorg web', res: c.serviceStarted},
    {id: 'build', kind: 'tool', tool: 'Bash', arg: 'bun run build', res: '✓ built in 3.8s'},
    {id: 'commit', kind: 'tool', tool: 'Bash', arg: 'git commit -m "feat(notes): pin a note to the top (ZORG-128)"', res: c.leakCheck, commit: true},
    {id: 'comment', kind: 'tool', tool: 'Bash', arg: 'zorg comment add ZORG-128 "…"', res: '✓'},
    {id: 'close', kind: 'tool', tool: 'Bash', arg: `zorg ticket update ZORG-128 --status "${c.statusDone}"`, res: `ZORG-128 → ${c.statusDone}`},
    {id: 'final', kind: 'say', text: c.finalAnswer},
  ] as const;
}

function Phone({c}: {c: FilmCopy}): ReactNode {
  return (
    <div className={s.phone} data-f="phone">
      <div className={s.phScreen}>
        <div className={s.phStatus}>
          <span>21:04</span>
          <span className={s.phNotch} />
          <span className={s.phSignal}>
            <i />
            <i />
            <i />
            <b />
          </span>
        </div>
        <div className={s.phHeader}>
          <FiMenu />
          <span className={s.phTitle}>{c.newChat}</span>
          <ClaudeMark size={18} />
        </div>
        <div className={s.phChat}>
          <div className={s.phUser} data-f="phUser">
            {c.dictation}
          </div>
          <div className={s.phThink} data-f="phThink">
            <ClaudeMark size={20} className={s.spin} />
          </div>
          <div className={s.phTool} data-f="phTool">
            <span className={s.phToolIcon}>
              <FiZap />
            </span>
            <span>Zorg</span>
            <span className={s.phToolName}>create_ticket</span>
            <FiCheck className={s.phToolOk} />
          </div>
          <p className={s.phAnswer} data-f="phAnswer">
            {c.claudeAnswer}
          </p>
          <div className={s.phEmbed} data-f="phEmbed">
            <TicketCard k="ZORG-128" title={c.ticketTitle} prio={2} label="notes" tone="violet" />
          </div>
        </div>
        <div className={s.phComposer}>
          <span className={s.phPlus}>
            <FiPlus />
          </span>
          <span className={s.phPlaceholder} data-f="phPlaceholder">
            {c.reply}
          </span>
          <span className={s.phWave} data-f="phWave">
            {Array.from({length: 22}, (_, i) => (
              <i key={i} style={{animationDelay: `${(i * 97) % 600}ms`}} />
            ))}
          </span>
          <span className={s.phMic} data-f="phMic">
            <FiMic />
          </span>
        </div>
      </div>
    </div>
  );
}

function Dictation({c}: {c: FilmCopy}): ReactNode {
  const words = c.dictation.split(' ');
  return (
    <div className={s.dict} data-f="dict">
      <div className={s.dictLabel}>
        <span className={s.recDot} />
        {c.listening}
      </div>
      <div className={s.dictText}>
        {words.map((w, i) => (
          <span key={i} className={s.dictWord} data-f="dictWord">
            {w}{' '}
          </span>
        ))}
      </div>
    </div>
  );
}

function Column({
  id,
  status,
  name,
  count,
  children,
}: {
  id: string;
  status: 'open' | 'progress' | 'done';
  name: string;
  count: number;
  children: ReactNode;
}): ReactNode {
  return (
    <div className={s.zCol}>
      <div className={s.zColHead}>
        <StatusDot status={status} />
        <span>{name}</span>
        <span className={s.zCount} data-f={`count-${id}`}>
          {count}
        </span>
        <FiPlus className={s.zColPlus} />
      </div>
      <div className={s.zColBody}>
        <div className={s.slot} data-f={`slot-${id}`} />
        <div className={s.zRest} data-f={`rest-${id}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Board({c, img}: {c: FilmCopy; img: (p: string) => string}): ReactNode {
  return (
    <div className={s.board} data-f="board">
      <aside className={s.zSide}>
        <div className={s.zBrand}>
          <img src={img('/img/landing/zorg.webp')} alt="" width={26} height={26} />
          <span>Zorg</span>
        </div>
        <div className={s.zSwitch}>
          <i style={{background: '#0d9488'}} />
          Zorg
          <FiChevronDown />
        </div>
        <div className={s.zGroup}>{c.navWork}</div>
        <div className={clsx(s.zNav, s.zNavActive)}>
          <FiGrid /> {c.navTickets} <span className={s.zNavCount}>6</span>
        </div>
        <div className={s.zGroup}>{c.navKnowledge}</div>
        <div className={s.zNav}>
          <FiFileText /> {c.navNotes}
        </div>
        <div className={s.zGroup}>{c.navTime}</div>
        <div className={s.zNav}>
          <FiBell /> {c.navReminders}
        </div>
        <div className={s.zNav}>
          <FiCalendar /> {c.navCalendar}
        </div>
        <div className={s.zNav}>
          <FiSettings /> {c.navSettings}
        </div>
      </aside>
      <div className={s.zMain}>
        <header className={s.zHead}>
          <span className={s.zH1}>{c.boardTitle}</span>
          <span className={s.zSub}>{c.boardSub}</span>
          <span className={s.grow} />
          <span className={s.zSeg}>
            <i className={s.zSegOn}>
              <FiGrid />
            </i>
            <i>
              <FiList />
            </i>
            <i>
              <FiAlignLeft />
            </i>
          </span>
          <span className={s.zNew}>
            <FiPlus /> {c.boardNew}
          </span>
        </header>
        <div className={s.zCols}>
          <Column id="open" status="open" name={c.statusOpen} count={2}>
            <TicketCard k="ZORG-127" title={c.cards[0]} prio={1} label="calendar" tone="sky" avatar={<Avatar letter="A" tone={0} />} />
            <TicketCard k="ZORG-125" title={c.cards[1]} prio={2} label="notes" tone="violet" />
          </Column>
          <Column id="prog" status="progress" name={c.statusProgress} count={1}>
            <TicketCard k="ZORG-124" title={c.cards[2]} prio={3} label="reminders" tone="pink" avatar={<Avatar claude />} />
          </Column>
          <Column id="done" status="done" name={c.statusDone} count={2}>
            <TicketCard k="ZORG-122" title={c.cards[3]} prio={1} label="notes" tone="violet" avatar={<Avatar claude />} comments={1} />
            <TicketCard k="ZORG-121" title={c.cards[4]} prio={2} label="ui" tone="teal" avatar={<Avatar letter="A" tone={0} />} />
          </Column>
        </div>
        {/* The ticket of the story: one card that flies in and moves across the columns. */}
        <div className={s.tcard} data-f="tcard">
          <div className={s.tcardGlow} data-f="tcGlow" />
          <TicketCard
            k="ZORG-128"
            title={c.ticketTitle}
            prio={2}
            label="notes"
            tone="violet"
            avatar={
              <span className={s.tcAvatar}>
                <span data-f="tcAvatar">
                  <Avatar claude />
                </span>
              </span>
            }>
            <span className={s.grow} />
            <span className={s.tcStatus}>
              <StatusDot status="open" className={s.tcDot} />
              <span data-f="tcProg" className={s.tcLayer}>
                <StatusDot status="progress" />
              </span>
              <span data-f="tcDone" className={s.tcLayer}>
                <StatusDot status="done" />
              </span>
            </span>
          </TicketCard>
        </div>
      </div>
    </div>
  );
}

function Comment({c}: {c: FilmCopy}): ReactNode {
  return (
    <div className={s.zComment} data-f="zComment">
      <div className={s.zCommentHead}>
        <Avatar claude />
        <b>Claude Code</b>
        <span>· ZORG-128</span>
      </div>
      <p>{c.comment}</p>
    </div>
  );
}

function Surfaces({c}: {c: FilmCopy}): ReactNode {
  const icons = [<FiGlobe key="w" />, <FiMonitor key="d" />, <FiTerminal key="c" />, <FiSmartphone key="m" />];
  return (
    <div className={s.surfaces} data-f="surfaces">
      {c.surfaces.map((label, i) => (
        <span key={label} className={s.surface} data-f="surface">
          {icons[i]}
          {label}
        </span>
      ))}
    </div>
  );
}

function Statusline(): ReactNode {
  return (
    <div className={s.statusline}>
      <div className={s.slRow}>
        <span className={s.slPath}>📁 ~/Projects/zorg</span>
        <i>│</i>
        <span className={s.slBranch}>
          🌿 main <b data-f="slDirty">✓</b>
        </span>
        <i>│</i>
        <span className={s.slModel}>🤖 Opus 5.5</span>
        <i className={s.slOpt}>│</i>
        <span className={clsx(s.slEffort, s.slOpt)}>⚡ high</span>
        <i>│</i>
        <span className={s.slCtx}>
          🧠 <span className={s.slBar}>
            <span data-f="slBar" />
          </span>{' '}
          <span data-f="slCtx">8% · 16k/200k</span>
        </span>
        <i className={s.slOpt}>│</i>
        <span className={clsx(s.slCost, s.slOpt)} data-f="slCost">
          💰 $0.04
        </span>
      </div>
      <div className={s.slRow}>
        <span className={s.slQuota}>
          ⏳ 5h <b>34%</b> <em>↻20:20</em> · 7d <b className={s.slAmber}>61%</b>
        </span>
        <i>│</i>
        <span data-f="slTime">⏱ 0m</span>
        <i>│</i>
        <span>
          📝 <b className={s.slPlus} data-f="slPlus">+0</b> <b className={s.slMinus} data-f="slMinus">−0</b>
        </span>
        <i className={s.slOpt}>│</i>
        <span className={clsx(s.slCache, s.slOpt)}>🔥 87%</span>
      </div>
    </div>
  );
}

function Terminal({c, img}: {c: FilmCopy; img: (p: string) => string}): ReactNode {
  const lines = termLines(c);
  return (
    <div className={s.term} data-f="term">
      <div className={s.cxBar}>
        <img src={img('/img/landing/cortx.webp')} alt="" width={18} height={18} />
        <span className={s.cxName}>Terminal</span>
        <span className={s.cxBeta}>Beta</span>
        <span className={s.grow} />
        <span className={s.cxScopes}>
          <i>
            <FiGlobe /> Global
          </i>
          <i>
            <FiCpu /> Agents <b data-f="agentsCount">1</b>
          </i>
          <i className={s.cxScopeOn}>
            <span className={s.cxDot} /> zorg
          </i>
        </span>
        <span className={s.grow} />
        <span className={s.cxSearch}>
          <FiSearch /> <kbd>Ctrl K</kbd>
        </span>
        <FiSliders className={s.cxIcon} />
      </div>
      <div className={s.cxBody}>
        <aside className={s.cxRail}>
          <div className={s.cxRailHead}>
            {c.sessions} <span>4</span>
          </div>
          <div className={clsx(s.cxTab, s.cxTabOn)}>
            <ClaudeMark size={13} />
            <span className={s.cxTabText}>
              <b>zorg</b>
              <small className={s.cxCmd}>claude · ZORG-128</small>
            </span>
            <span className={s.agentPulse} />
          </div>
          <div className={s.cxTab}>
            <FiTerminal className={s.cxTabIcon} />
            <span className={s.cxTabText}>
              <b>cortx</b>
              <small>~/Projects/cortx</small>
            </span>
            <span className={s.idleDot} />
          </div>
          <div className={s.cxTab}>
            <FiTerminal className={s.cxTabIcon} />
            <span className={s.cxTabText}>
              <b>toolbox</b>
              <small>~/Projects/toolbox</small>
            </span>
            <span className={s.okPill}>✓</span>
          </div>
          <div className={s.cxTab} data-f="tabWeb">
            <FiCode className={s.cxTabIcon} />
            <span className={s.cxTabText}>
              <b>web · zorg</b>
              <small className={s.cxCmd}>bun dev · :5173</small>
            </span>
            <span className={s.cxRun}>
              <span className={s.spinner} data-f="webSpin" />
              <span className={s.runDot} data-f="webOk" />
            </span>
          </div>
          <div className={s.cxTab} data-f="tabCodex">
            <span className={s.codexIcon}>{'{}'}</span>
            <span className={s.cxTabText}>
              <b>codex · review</b>
              <small className={s.cxCmd}>codex</small>
            </span>
            <span className={s.agentPulse} />
          </div>
          <div className={s.cxRailFoot}>
            <FiPlus /> {c.newTerminal}
          </div>
        </aside>
        <div className={s.cxPane}>
          <div className={s.tScroll} data-f="tScroll">
            <div className={s.tLines} data-f="tLines">
              <div className={s.tPrompt} data-f="tl-prompt">
                <span className={s.omp}>
                  <i className={s.ompA}> zorg</i>
                  <i className={s.ompB}> main</i>
                </span>{' '}
                <span className={s.tTyped} data-type="cc" data-f="typeCc" />
                <span className={s.caret} data-f="caretCc" />
              </div>
              <div className={s.ccHead} data-f="tl-head">
                <span className={s.ccLogo}>
                  <ClaudeMark size={22} />
                </span>
                <span>
                  <b>Claude Code</b>
                  <br />
                  <small>Opus 5.5 · high · ~/Projects/zorg</small>
                </span>
              </div>
              {lines.map((l) => {
                if (l.kind === 'user') {
                  return (
                    <div key={l.id} className={s.tUser} data-f={`tl-${l.id}`}>
                      <span>›</span> {l.text}
                    </div>
                  );
                }
                if (l.kind === 'say') {
                  return (
                    <div key={l.id} className={s.tSay} data-f={`tl-${l.id}`}>
                      <span className={s.bulletSay}>⏺</span> {l.text}
                    </div>
                  );
                }
                return (
                  <div key={l.id} className={s.tTool} data-f={`tl-${l.id}`}>
                    <div className={s.tCall}>
                      <span className={s.bullet}>
                        <span className={s.bulletRun}>⏺</span>
                        <span className={s.bulletOk} data-f={`ok-${l.id}`}>
                          ⏺
                        </span>
                      </span>
                      <b>{l.tool}</b>
                      <span className={s.tArg}>({l.arg})</span>
                    </div>
                    {'diff' in l && l.diff ? (
                      <div className={s.tDiff} data-f={`res-${l.id}`}>
                        <div className={s.tRes}>
                          ⎿ <b className={s.slPlus}>+18</b> <b className={s.slMinus}>−2</b>
                        </div>
                        <div className={s.dDel}>
                          <i>41</i>- const notes = sortByTitle(folder.notes);
                        </div>
                        <div className={s.dAdd}>
                          <i>41</i>+ const notes = sortByTitle(folder.notes)
                        </div>
                        <div className={s.dAdd}>
                          <i>42</i>+ {'  '}.sort((a, b) =&gt; Number(b.pinned) - Number(a.pinned));
                        </div>
                      </div>
                    ) : (
                      <div className={s.tRes} data-f={`res-${l.id}`}>
                        ⎿ {l.res}
                        {'commit' in l && l.commit ? (
                          <span className={s.tSigned} data-f="signedLine">
                            <br />⎿ [main 7c1e9a2] feat(notes): pin a note to the top{' '}
                            <span className={s.verified}>
                              <FiLock /> {c.signed}
                            </span>
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={s.ccBottom} data-f="ccBottom">
            <div className={s.banner} data-f="banner">
              <b>ZORG-128</b>
              <span className={s.bannerStatus}>
                <span className={s.bannerProg} data-f="bannerProg">
                  {c.statusProgress}
                </span>
                <span className={s.bannerDone} data-f="bannerDone">
                  {c.statusDone}
                </span>
              </span>
              <span className={s.bannerTitle}>{c.ticketTitle}</span>
              <em>· Zorg</em>
            </div>
            <div className={s.ccInput}>
              <span className={s.ccChevron}>›</span>
              <span className={s.tTyped} data-type={c.takeTicket} data-f="typeTake" />
              <span className={s.caret} data-f="caretTake" />
            </div>
            <Statusline />
          </div>
        </div>
      </div>
      <div className={s.toast} data-f="toast">
        <span className={s.toastIcon}>
          <FiCheck />
        </span>
        <span>
          <b>{c.toastTitle}</b>
          <br />
          <code>bun run build</code> {c.toastBody}
        </span>
      </div>
    </div>
  );
}

function Codex({c}: {c: FilmCopy}): ReactNode {
  return (
    <div className={s.codex} data-f="codex">
      <div className={s.codexBar}>
        <span className={s.codexIcon}>{'{}'}</span> codex · review
        <span className={s.grow} />
        <span className={s.codexTag}>Codex</span>
      </div>
      <div className={s.codexBody}>
        <div>
          <span className={s.codexPrompt}>›</span> <span className={s.tTyped} data-type={c.codexPrompt} data-f="typeCodex" />
        </div>
        <div className={s.codexRes} data-f="codexRes">
          <FiCheck /> {c.codexResult}
        </div>
      </div>
    </div>
  );
}

function Approval({c}: {c: FilmCopy}): ReactNode {
  return (
    <div className={s.approve} data-f="approve">
      <div className={s.approveIcon}>
        <FiLock />
      </div>
      <div className={s.approveText}>
        <b>{c.approveTitle}</b>
        <p>{c.approveBody}</p>
      </div>
      <div className={s.approveBtns}>
        <span className={s.btnGhost}>{c.approveDeny}</span>
        <span className={s.btnBlue} data-f="approveOk">
          {c.approveOk}
        </span>
      </div>
    </div>
  );
}

function Doc({c}: {c: FilmCopy}): ReactNode {
  const widths = [[96, 100, 88, 62], [100, 92, 97, 40], [94, 100, 70]];
  return (
    <div className={s.doc} data-f="doc">
      <div className={s.docSkill} data-f="docSkill">
        <FiFileText /> documents
      </div>
      <div className={s.docEyebrow}>{c.docEyebrow}</div>
      <div className={s.docTitle}>{c.docTitle}</div>
      <div className={s.docSub}>{c.docSub}</div>
      <div className={s.docMeta}>
        <span>{c.docVersion}</span>
        <span>1.0</span>
        <span>{c.docTicket}</span>
        <span>ZORG-128</span>
      </div>
      {c.docSections.map((title, i) => (
        <div key={title} className={s.docSection} data-f="docSection">
          <div className={s.docH}>
            <b>{i + 1}</b> {title}
          </div>
          {widths[i].map((w, j) => (
            <i key={j} className={s.docLine} style={{width: `${w}%`}} />
          ))}
        </div>
      ))}
      <div className={s.docFoot}>
        <span>ZORG-128 · {c.docEyebrow.toLowerCase()}</span>
        <span>1 / 1</span>
      </div>
    </div>
  );
}

function Diagram({c}: {c: FilmCopy}): ReactNode {
  return (
    <div className={s.diagram} data-f="diagram">
      <div className={s.docSkill} data-f="diaSkill">
        <DiagramIcon /> diagrams
      </div>
      <svg viewBox="0 0 600 300" className={s.diaSvg}>
        <g data-f="diaZone">
          <rect x="12" y="34" width="156" height="140" rx="12" className={s.dzone} />
          <text x="28" y="60" className={s.dzoneT}>
            {c.diagramPhone.toUpperCase()}
          </text>
        </g>
        <g data-f="diaZone">
          <rect x="196" y="34" width="168" height="140" rx="12" className={s.dzone} />
          <text x="212" y="60" className={s.dzoneT}>
            ZORG
          </text>
        </g>
        <g data-f="diaZone">
          <rect x="392" y="34" width="196" height="254" rx="12" className={s.dzone} />
          <text x="408" y="60" className={s.dzoneT}>
            {c.diagramTerminal.toUpperCase()}
          </text>
        </g>
        <path data-f="diaLabel" d="M150 113 H206" className={clsx(s.darrow, s.dashed)} />
        <path data-f="diaArrow" pathLength={1} d="M410 113 H358" className={s.darrow} />
        <path data-f="diaArrow" pathLength={1} d="M490 144 V192" className={s.darrow} />
        <g data-f="diaBlock">
          <rect x="28" y="84" width="122" height="58" rx="9" className={s.dblock} />
          <text x="89" y="110" className={s.dblockT}>
            Claude
          </text>
          <text x="89" y="128" className={s.dblockS}>
            claude.ai
          </text>
        </g>
        <g data-f="diaBlock">
          <rect x="212" y="84" width="140" height="58" rx="9" className={clsx(s.dblock, s.dblockData)} />
          <text x="282" y="110" className={s.dblockT}>
            Zorg
          </text>
          <text x="282" y="128" className={s.dblockS}>
            tickets · API
          </text>
        </g>
        <g data-f="diaBlock">
          <rect x="410" y="84" width="160" height="58" rx="9" className={clsx(s.dblock, s.dblockMain)} />
          <text x="490" y="110" className={s.dblockT}>
            Claude Code
          </text>
          <text x="490" y="128" className={s.dblockS}>
            skills · hooks
          </text>
        </g>
        <g data-f="diaBlock">
          <rect x="410" y="200" width="160" height="58" rx="9" className={s.dblock} />
          <text x="490" y="226" className={s.dblockT}>
            Git
          </text>
          <text x="490" y="244" className={s.dblockS}>
            {c.diagramCommits}
          </text>
        </g>
        <g data-f="diaLabel">
          <path d="M204 108 L212 113 L204 118 Z" className={s.dhead} />
          <path d="M360 108 L352 113 L360 118 Z" className={s.dhead} />
          <path d="M485 190 L490 198 L495 190 Z" className={s.dhead} />
          <text x="181" y="104" className={s.dlabel}>
            {c.diagramIdea}
          </text>
          <text x="381" y="104" className={s.dlabel}>
            CLI
          </text>
          <text x="500" y="176" className={s.dlabel} textAnchor="start">
            commit
          </text>
        </g>
      </svg>
    </div>
  );
}

function DiagramIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="7" height="6" rx="1.5" />
      <rect x="14" y="15" width="7" height="6" rx="1.5" />
      <path d="M6.5 9v5.5a1 1 0 0 0 1 1H14" />
    </svg>
  );
}

function Cursor(): ReactNode {
  return (
    <div className={s.cursor} data-f="cursor">
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path d="M4 2.5l15 9.2-6.6 1.4 3.9 7.3-3 1.5-3.8-7.4L4.6 19z" />
      </svg>
      <span className={s.ripple} data-f="ripple" />
    </div>
  );
}

/** Final scene: the whole environment as a constellation around Claude Code. */
function Constellation({c, img, mode}: {c: FilmCopy; img: (p: string) => string; mode: Mode}): ReactNode {
  const L = mode === 'L';
  const cx = L ? 850 : 210;
  const cy = L ? 360 : 262;
  const inner = [
    {key: 'cortx', label: 'CortX', src: '/img/landing/cortx.webp'},
    {key: 'zorg', label: 'Zorg', src: '/img/landing/zorg.webp'},
    {key: 'codex', label: 'Codex', src: '/img/landing/openai.webp', light: true},
    {key: 'skills', label: c.nodeSkills, icon: <FiFileText />},
    {key: 'guard', label: c.nodeGuardrails, icon: <FiShield />},
    {key: 'status', label: c.nodeStatusline, icon: <FiActivity />},
  ];
  const outer = [
    ['powershell', 'PowerShell 7'],
    ['oh-my-posh', 'Oh My Posh'],
    ['eza', 'eza'],
    ['fzf', 'fzf'],
    ['ripgrep', 'ripgrep'],
    ['zoxide', 'zoxide'],
    ['lazygit', 'lazygit'],
    ['yazi', 'yazi'],
    ['neovim', 'Neovim'],
    ['vscode', 'VS Code'],
    ['zen', 'Zen'],
    ['git', 'Git'],
  ];
  const ri = L ? {x: 205, y: 165} : {x: 120, y: 104};
  const ro = L ? {x: 375, y: 290} : {x: 172, y: 176};
  const pos = (i: number, n: number, r: {x: number; y: number}, off = -90) => {
    const a = ((off + (360 / n) * i) * Math.PI) / 180;
    return {x: cx + Math.cos(a) * r.x, y: cy + Math.sin(a) * r.y};
  };
  const innerPos = inner.map((_, i) => pos(i, inner.length, ri));
  const outerPos = outer.map((_, i) => pos(i, outer.length, ro, -75));
  const {w, h} = SIZES[mode];
  return (
    <div className={s.constellation} data-f="const">
      <svg className={s.cLines} viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
        <ellipse data-f="cLineOuter" pathLength={1} cx={cx} cy={cy} rx={ri.x} ry={ri.y} className={s.cLineOuter} />
        <ellipse data-f="cLineOuter" pathLength={1} cx={cx} cy={cy} rx={ro.x} ry={ro.y} className={s.cLineOuter} />
        {innerPos.map((p, i) => (
          <path key={`i${i}`} data-f="cLine" pathLength={1} d={`M${cx} ${cy} L${p.x} ${p.y}`} className={s.cLine} />
        ))}
        {innerPos.map((p, i) => (
          <circle key={`d${i}`} r="3" className={s.cPacket} data-f="cPacket">
            <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={`M${p.x} ${p.y} L${cx} ${cy}`} />
          </circle>
        ))}
      </svg>
      <div className={s.cCenter} data-f="cCenter" style={{left: cx, top: cy}}>
        <span className={s.cHalo} />
        <img src={img('/img/landing/claude.webp')} alt="" width={L ? 64 : 46} height={L ? 64 : 46} />
        <b>Claude Code</b>
      </div>
      {inner.map((n, i) => (
        <div key={n.key} className={s.cNode} data-f="cNode" style={{left: innerPos[i].x, top: innerPos[i].y}}>
          <span className={clsx(s.cIcon, n.light && s.cIconLight)}>
            {n.src ? <img src={img(n.src)} alt="" width={34} height={34} /> : n.icon}
          </span>
          <b>{n.label}</b>
        </div>
      ))}
      {outer.map(([key, label], i) => (
        <div key={key} className={s.cTool} data-f="cTool" style={{left: outerPos[i].x, top: outerPos[i].y}}>
          <img src={img(`/img/landing/${key}.webp`)} alt="" width={26} height={26} />
          <span>{label}</span>
        </div>
      ))}
      <div className={s.finale}>
        {c.finale.map((line, i) => (
          <div key={line} className={s.finaleLine}>
            <span data-f="finale" className={i === 2 ? s.finaleAccent : undefined}>
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stamp({c}: {c: FilmCopy}): ReactNode {
  return (
    <div className={s.stamp} aria-hidden>
      {c.scenes.map((sc, i) => (
        <div key={sc.title} className={s.stampItem} data-f="stamp">
          <span className={s.stampNum}>{String(i + 1).padStart(2, '0')}</span>
          <span className={s.stampTitle}>{sc.title}</span>
        </div>
      ))}
    </div>
  );
}

export default function Stage({c, mode}: {c: FilmCopy; mode: Mode}): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();
  const img = (p: string) => withBaseUrl(p);
  return (
    <>
      <div className={s.backdrop} data-f="backdrop" aria-hidden />
      <div className={s.world} data-f="world">
        <svg className={s.beams} width="10" height="10" aria-hidden>
          <path data-f="beamT" pathLength={1} className={s.beamTrail} />
          <path data-f="beam2T" pathLength={1} className={s.beamTrail} />
          <path data-f="beam3T" pathLength={1} className={s.beamTrail} />
          <path data-f="beam" pathLength={1} className={s.beam} />
          <path data-f="beam2" pathLength={1} className={s.beam} />
          <path data-f="beam3" pathLength={1} className={s.beam} />
        </svg>
        <Phone c={c} />
        <Dictation c={c} />
        <Board c={c} img={img} />
        <Surfaces c={c} />
        <div className={s.dockTag} data-f="dockTag">
          <img src={img('/img/landing/zorg.webp')} alt="" width={16} height={16} />
          Zorg
          <span className={s.liveDot} />
        </div>
        <Comment c={c} />
        <Terminal c={c} img={img} />
        <Codex c={c} />
        <Approval c={c} />
        <Doc c={c} />
        <Diagram c={c} />
        <Cursor />
      </div>
      <Constellation c={c} img={img} mode={mode} />
      <Stamp c={c} />
      <div className={s.vignette} aria-hidden />
    </>
  );
}

