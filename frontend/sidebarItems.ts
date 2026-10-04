import type {PluginOptions} from '@docusaurus/plugin-content-docs';

type SidebarItemsGeneratorOption = PluginOptions['sidebarItemsGenerator'];
type Item = Awaited<ReturnType<SidebarItemsGeneratorOption>>[number];

/**
 * Default generator, plus `customProps` taken from each page's front matter (`image`, `status`), so that
 * cards and sidebar entries can show the tool logo and its status without repeating them in
 * `sidebar_custom_props`. A category whose link is a page (its `index.md`) takes that page's logo, status
 * and description: on the section landing page, a multi-page project looks like any other project.
 */
export const sidebarItemsGenerator: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  const docs = new Map(args.docs.map((d) => [d.id, d]));

  const propsOf = (id: string, base: Record<string, unknown> = {}) => {
    const fm = docs.get(id)?.frontMatter as Record<string, unknown> | undefined;
    const customProps: Record<string, unknown> = {...base};
    if (typeof fm?.image === 'string') customProps.image = fm.image;
    if (typeof fm?.status === 'string') customProps.status = fm.status;
    return customProps;
  };

  const enrich = (items: Item[]): Item[] =>
    items.map((item) => {
      if (item.type === 'category') {
        const enriched = {...item, items: enrich(item.items)};
        if (item.link?.type === 'doc') {
          const doc = docs.get(item.link.id);
          enriched.customProps = propsOf(item.link.id, item.customProps ?? {});
          const description = (doc?.frontMatter as {description?: string} | undefined)?.description;
          if (description && !enriched.description) enriched.description = description;
        }
        return enriched;
      }
      if (item.type !== 'doc') return item;
      return {...item, customProps: propsOf(item.id, item.customProps ?? {})};
    });

  return enrich(await defaultSidebarItemsGenerator(args));
};
