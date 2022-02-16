import IHeaderLink from '@custom-types/IHeaderLink';
import { capitalize } from '@utils/capitalize';

const mainLinks: IHeaderLink[] = [
  {
    text: (locale) => capitalize(locale.mainHeaderLinks.main),
    href: '/',
    current: (current) => current == 'about',
  },
  {
    text: (locale) => capitalize(locale.mainHeaderLinks.about),
    href: '/about',
    current: (current) => current == 'about',
  },
];
const projectLinks: IHeaderLink[] = [
  {
    text: (locale) => capitalize(locale.projects.education),
    href: '/edu',
    current: () => false,
  },
  {
    text: (locale) => capitalize(locale.projects.courses),
    href: '/courses',
    current: () => false,
  },
  {
    text: (locale) => capitalize(locale.projects.tournaments),
    href: '/tournaments',
    current: () => false,
  },
];

export const links = {
  main: mainLinks,
  secondary: projectLinks,
};
