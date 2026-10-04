import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';
import i18n from '@generated/i18n';

/**
 * Picks the language of the site from the visitor's browser, once.
 *
 * - First visit, no saved choice: if the browser prefers French and the page is the English version,
 *   go to the French one (and the other way round).
 * - Choosing a language in the navbar dropdown saves that choice; it is then always respected.
 *
 * Each locale is a separate build: in the French one, `baseUrl` already ends with `fr/`.
 */
const KEY = 'toolbox.locale';
const {defaultLocale, locales, currentLocale} = i18n;
const rootUrl =
  currentLocale === defaultLocale
    ? siteConfig.baseUrl
    : siteConfig.baseUrl.slice(0, siteConfig.baseUrl.length - currentLocale.length - 1);

function localizedPath(path: string, to: string): string {
  const here = currentLocale === defaultLocale ? rootUrl : `${rootUrl}${currentLocale}/`;
  const rest = path.startsWith(here) ? path.slice(here.length) : '';
  return rootUrl + (to === defaultLocale ? '' : `${to}/`) + rest;
}

/** The locale the URL itself points to, whatever build is serving it. */
function urlLocale(path: string): string {
  const other = locales.find((l) => l !== defaultLocale && (path === `${rootUrl}${l}` || path.startsWith(`${rootUrl}${l}/`)));
  return other ?? defaultLocale;
}

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function save(locale: string): void {
  try {
    localStorage.setItem(KEY, locale);
  } catch {
    /* private mode: the choice is simply not remembered */
  }
}

if (ExecutionEnvironment.canUseDOM) {
  const {pathname, search, hash} = window.location;
  const saved = read();
  const browser = (navigator.languages?.[0] ?? navigator.language ?? '').slice(0, 2).toLowerCase();
  const wanted = saved ?? (locales.includes(browser) ? browser : defaultLocale);
  if (!saved) save(wanted);
  // A page served by another locale's build (the server's 404 page, typically) must not redirect:
  // the URL already carries a locale, and rewriting it would stack prefixes (`/fr/fr/fr/…`).
  const consistent = urlLocale(pathname) === currentLocale;
  if (consistent && wanted !== currentLocale && locales.includes(wanted)) {
    window.location.replace(localizedPath(pathname, wanted) + search + hash);
  }

  // The navbar language dropdown renders links with a `lang` attribute: remember the visitor's pick.
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[lang]');
    const lang = link?.getAttribute('lang')?.slice(0, 2).toLowerCase();
    if (lang && locales.includes(lang)) save(lang);
  });
}
