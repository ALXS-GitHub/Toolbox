import type {
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

export type PropSidebarCustomProps = PropSidebarItemLink['customProps'] & {
  image?: string;
};
