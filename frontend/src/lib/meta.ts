import {translate} from '@docusaurus/Translate';

/**
 * The closed list of front matter values (checked by `scripts/check-content.mjs`) and their labels.
 * Labels are translated through `i18n/<locale>/code.json`.
 */

export type Status = 'active' | 'occasional' | 'testing' | 'paused' | 'playing' | 'archived';
export type Kind =
  | 'app' | 'cli' | 'web' | 'service' | 'library' | 'language' | 'extension'
  | 'hardware' | 'game' | 'project' | 'config';
export type Platform = 'windows' | 'macos' | 'linux' | 'web' | 'android' | 'ios';

export type PageMeta = {
  description?: string;
  url?: string;
  repo?: string;
  status?: Status;
  replaced_by?: string;
  kind?: Kind;
  platforms?: Platform[];
  stack?: string[];
  image?: string;
};

export function statusLabel(status: Status): string {
  switch (status) {
    case 'active':
      return translate({id: 'toolbox.status.active', message: 'In use'});
    case 'occasional':
      return translate({id: 'toolbox.status.occasional', message: 'Now and then'});
    case 'testing':
      return translate({id: 'toolbox.status.testing', message: 'Testing'});
    case 'paused':
      return translate({id: 'toolbox.status.paused', message: 'On hold'});
    case 'playing':
      return translate({id: 'toolbox.status.playing', message: 'Playing'});
    case 'archived':
      return translate({id: 'toolbox.status.archived', message: 'No longer used'});
  }
}

export function kindLabel(kind: Kind): string {
  switch (kind) {
    case 'app':
      return translate({id: 'toolbox.kind.app', message: 'App'});
    case 'cli':
      return translate({id: 'toolbox.kind.cli', message: 'CLI'});
    case 'web':
      return translate({id: 'toolbox.kind.web', message: 'Website'});
    case 'service':
      return translate({id: 'toolbox.kind.service', message: 'Service'});
    case 'library':
      return translate({id: 'toolbox.kind.library', message: 'Library'});
    case 'language':
      return translate({id: 'toolbox.kind.language', message: 'Language'});
    case 'extension':
      return translate({id: 'toolbox.kind.extension', message: 'Extension'});
    case 'hardware':
      return translate({id: 'toolbox.kind.hardware', message: 'Hardware'});
    case 'game':
      return translate({id: 'toolbox.kind.game', message: 'Game'});
    case 'project':
      return translate({id: 'toolbox.kind.project', message: 'Project'});
    case 'config':
      return translate({id: 'toolbox.kind.config', message: 'Config'});
  }
}

const PLATFORMS: Record<Platform, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  web: 'Web',
  android: 'Android',
  ios: 'iOS',
};

export function platformLabel(platform: Platform): string {
  return PLATFORMS[platform] ?? platform;
}

/** Logos live in `assets/images/` (served at `/images/`); front matter gives the file name only. */
export function imagePath(image: string): string {
  return image.startsWith('/') || image.startsWith('http') ? image : `/images/${image}`;
}
