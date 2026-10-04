import {translate} from '@docusaurus/Translate';

/**
 * Every string of the film, in one place. The story is fictional on purpose: the ticket, the idea and the
 * board cards are made up to show how the pieces work together, never what my apps contain.
 */
export function useFilmCopy() {
  return {
    scenes: [
      {
        title: translate({id: 'home.film.s1.title', message: 'The idea'}),
        text: translate({
          id: 'home.film.s1.text',
          message:
            'It starts on my phone. I dictate an idea to Claude, which files it in Zorg, my ticket manager, through its connector.',
        }),
      },
      {
        title: translate({id: 'home.film.s2.title', message: 'The ticket'}),
        text: translate({
          id: 'home.film.s2.text',
          message:
            'Zorg holds every task, for me and for my agents: a web app, a desktop app, a CLI and an MCP server, all on the same data.',
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
            'It edits the code, starts the dev server through the CortX CLI and builds. A hook checks the commit for leaks, and the commit is signed with a key only I can approve.',
        }),
      },
      {
        title: translate({id: 'home.film.s5.title', message: 'The trail'}),
        text: translate({
          id: 'home.film.s5.text',
          message:
            'The ticket moves to Done with a comment on how to check it. Codex, my second agent, reviews the change, and my skills turn the work into documents and diagrams.',
        }),
      },
      {
        title: translate({id: 'home.film.s6.title', message: 'The environment'}),
        text: translate({
          id: 'home.film.s6.text',
          message:
            'That is the whole loop: tools I built, processes that keep agents reliable, and Claude doing most of the work. The rest of the site explains each piece.',
        }),
      },
    ],
    // Phone (claude.ai)
    newChat: translate({id: 'home.film.phone.newChat', message: 'Ticket idea'}),
    reply: translate({id: 'home.film.phone.reply', message: 'Reply to Claude…'}),
    listening: translate({id: 'home.film.phone.listening', message: 'Listening…'}),
    dictation: translate({
      id: 'home.film.phone.dictation',
      message: 'Idea for Zorg: let me pin a note to the top of its folder.',
    }),
    claudeAnswer: translate({
      id: 'home.film.phone.answer',
      message: 'Done. I created ZORG-128 in the Zorg project, priority Medium, with the notes label.',
    }),
    // Ticket and board
    ticketTitle: translate({id: 'home.film.ticket.title', message: 'Pin a note to the top of its folder'}),
    statusOpen: translate({id: 'home.film.status.open', message: 'Open'}),
    statusProgress: translate({id: 'home.film.status.progress', message: 'In progress'}),
    statusDone: translate({id: 'home.film.status.done', message: 'Done'}),
    boardTitle: translate({id: 'home.film.board.title', message: 'Tickets'}),
    boardSub: translate({id: 'home.film.board.sub', message: '6 open'}),
    boardNew: translate({id: 'home.film.board.new', message: 'New'}),
    navTickets: translate({id: 'home.film.board.nav.tickets', message: 'Tickets'}),
    navNotes: translate({id: 'home.film.board.nav.notes', message: 'Notes'}),
    navReminders: translate({id: 'home.film.board.nav.reminders', message: 'Reminders'}),
    navCalendar: translate({id: 'home.film.board.nav.calendar', message: 'Calendar'}),
    navSettings: translate({id: 'home.film.board.nav.settings', message: 'Settings'}),
    navWork: translate({id: 'home.film.board.nav.work', message: 'Work'}),
    navKnowledge: translate({id: 'home.film.board.nav.knowledge', message: 'Knowledge'}),
    navTime: translate({id: 'home.film.board.nav.time', message: 'Time'}),
    cards: [
      translate({id: 'home.film.card.1', message: 'Week view in the calendar'}),
      translate({id: 'home.film.card.2', message: 'Search notes by label'}),
      translate({id: 'home.film.card.3', message: 'Snooze a reminder from its notification'}),
      translate({id: 'home.film.card.4', message: 'Export a note as Markdown'}),
      translate({id: 'home.film.card.5', message: 'Shortcut for the command palette'}),
    ],
    surfaces: [
      translate({id: 'home.film.surface.web', message: 'Web app'}),
      translate({id: 'home.film.surface.desktop', message: 'Desktop app'}),
      translate({id: 'home.film.surface.cli', message: 'CLI for agents'}),
      translate({id: 'home.film.surface.mcp', message: 'MCP for claude.ai'}),
    ],
    comment: translate({
      id: 'home.film.comment',
      message: 'Done: notes have a Pin action and pinned notes stay first. To check: pin one, reload, it stays on top.',
    }),
    // Terminal
    takeTicket: translate({id: 'home.film.term.take', message: 'take ticket ZORG-128'}),
    loaded: translate({id: 'home.film.term.loaded', message: 'Loaded skill: Zorg tickets'}),
    readLines: translate({id: 'home.film.term.read', message: 'Read 214 lines'}),
    serviceStarted: translate({id: 'home.film.term.started', message: 'web started in the background · :5173'}),
    leakCheck: translate({id: 'home.film.term.leak', message: 'pre-commit: no secret, no e-mail address'}),
    signed: translate({id: 'home.film.term.signed', message: 'signed'}),
    finalAnswer: translate({
      id: 'home.film.term.final',
      message: 'ZORG-128 is done: signed commit, ticket closed with a comment on how to check it.',
    }),
    sessions: translate({id: 'home.film.term.sessions', message: 'Sessions'}),
    newTerminal: translate({id: 'home.film.term.newTerminal', message: 'New terminal'}),
    waiting: translate({id: 'home.film.term.waiting', message: 'Working'}),
    toastTitle: translate({id: 'home.film.toast.title', message: 'build · zorg'}),
    toastBody: translate({id: 'home.film.toast.body', message: 'finished in 3.8s'}),
    approveTitle: translate({id: 'home.film.approve.title', message: 'SSH key request'}),
    approveBody: translate({
      id: 'home.film.approve.body',
      message: 'git wants to sign a commit with your “Git signing” key.',
    }),
    approveDeny: translate({id: 'home.film.approve.deny', message: 'Deny'}),
    approveOk: translate({id: 'home.film.approve.ok', message: 'Authorize'}),
    codexPrompt: translate({id: 'home.film.codex.prompt', message: 'review the last commit'}),
    codexResult: translate({
      id: 'home.film.codex.result',
      message: 'Reviewed 7c1e9a2: nothing blocking, one small suggestion.',
    }),
    // Generated document and diagram
    docEyebrow: translate({id: 'home.film.doc.eyebrow', message: 'Change note'}),
    docTitle: translate({id: 'home.film.doc.title', message: 'Pinned notes'}),
    docSub: translate({id: 'home.film.doc.sub', message: 'What changed in Zorg, why, and how to check it.'}),
    docSections: [
      translate({id: 'home.film.doc.section1', message: 'The need'}),
      translate({id: 'home.film.doc.section2', message: 'The change'}),
      translate({id: 'home.film.doc.section3', message: 'How to check'}),
    ],
    docVersion: translate({id: 'home.film.doc.version', message: 'Version'}),
    docTicket: translate({id: 'home.film.doc.ticket', message: 'Ticket'}),
    diagramPhone: translate({id: 'home.film.diagram.phone', message: 'Phone'}),
    diagramTerminal: translate({id: 'home.film.diagram.terminal', message: 'Terminal · CortX'}),
    diagramIdea: translate({id: 'home.film.diagram.idea', message: 'idea'}),
    diagramReads: translate({id: 'home.film.diagram.reads', message: 'reads'}),
    diagramCommits: translate({id: 'home.film.diagram.commits', message: 'signed'}),
    diagramConnector: translate({id: 'home.film.diagram.connector', message: 'connector'}),
    // Finale
    finale: [
      translate({id: 'home.film.finale.1', message: 'My tools.'}),
      translate({id: 'home.film.finale.2', message: 'My processes.'}),
      translate({id: 'home.film.finale.3', message: 'My agents.'}),
    ],
    nodeSkills: translate({id: 'home.film.node.skills', message: 'Skills'}),
    nodeGuardrails: translate({id: 'home.film.node.guardrails', message: 'Guardrails'}),
    nodeStatusline: translate({id: 'home.film.node.statusline', message: 'Status line'}),
    // Controls
    play: translate({id: 'home.film.play', message: 'Play'}),
    pause: translate({id: 'home.film.pause', message: 'Pause'}),
    replay: translate({id: 'home.film.replay', message: 'Replay'}),
    chapter: translate({id: 'home.film.chapter', message: 'Chapter'}),
    filmLabel: translate({id: 'home.film.label', message: 'From an idea to a commit, in six scenes'}),
  };
}

export type FilmCopy = ReturnType<typeof useFilmCopy>;
