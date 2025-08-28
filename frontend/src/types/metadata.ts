import type { DocFrontMatter } from '@docusaurus/plugin-content-docs';

export type ExtendedDocFrontMatter = DocFrontMatter & {
    category?: string;
    type?: string;
    rating?: number;
    state?: string;
};
