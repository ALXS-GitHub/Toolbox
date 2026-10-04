import type {PluginOptions} from '@docusaurus/plugin-content-docs';

type SidebarItemsGeneratorOption = PluginOptions['sidebarItemsGenerator'];
type Item = Awaited<ReturnType<SidebarItemsGeneratorOption>>[number];

/**
 * Default generator, plus `customProps` taken from each page's front matter (`image`, `status`), so that
 * cards and sidebar entries can show the tool logo and its status without repeating them in
 * `sidebar_custom_props`.
 */
export const sidebarItemsGenerator: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  const docs = new Map(args.docs.map((d) => [d.id, d]));
  const enrich = (items: Item[]): Item[] =>
    items.map((item) => {
      if (item.type === 'category') return {...item, items: enrich(item.items)};
      if (item.type !== 'doc') return item;
      const fm = docs.get(item.id)?.frontMatter as Record<string, unknown> | undefined;
      if (!fm) return item;
      const customProps: Record<string, unknown> = {...(item.customProps ?? {})};
      if (typeof fm.image === 'string') customProps.image = fm.image;
      if (typeof fm.status === 'string') customProps.status = fm.status;
      return {...item, customProps};
    });
  return enrich(await defaultSidebarItemsGenerator(args));
};
