import type { DocFrontMatter } from '@docusaurus/plugin-content-docs';

export const DOC_FRONT_MATTER_EXTENSION_KEYS = {
  CATEGORY: 'category',
  ORIGIN: 'origin',
  RATING: 'rating',
  USE_STATE: 'use_state',
  LOCATION: 'location',
  URL: 'url',
  VERSION: 'version',
  OS: 'os',
} as const;

export type DocFrontMatterExtensionKey = typeof DOC_FRONT_MATTER_EXTENSION_KEYS[keyof typeof DOC_FRONT_MATTER_EXTENSION_KEYS];

export type DocFrontMatterExtension = {
    [DOC_FRONT_MATTER_EXTENSION_KEYS.CATEGORY]?: string;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.ORIGIN]?: string;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.RATING]?: number;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.USE_STATE]?: string;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.LOCATION]?: string;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.URL]?: string;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.VERSION]?: string;
    [DOC_FRONT_MATTER_EXTENSION_KEYS.OS]?: string;
}

export type ExtendedDocFrontMatter = DocFrontMatter & DocFrontMatterExtension;
