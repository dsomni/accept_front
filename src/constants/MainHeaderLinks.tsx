import IHeaderLink from '@custom-types/IHeaderLink';
import { capitalize } from '@utils/capitalize';

const mainLinks: IHeaderLink[] = [
  {
    text: (locale) => capitalize(locale.mainHeaderLinks.main),
    href: '/',
  },
  {
    text: () => 'dropdown',
    href: '',
  },
  {
    text: (locale) => capitalize(locale.mainHeaderLinks.about),
    href: '/about',
  },
];
const projectLinks: IHeaderLink[] = [
  {
    text: (locale) => capitalize(locale.projects.education.title),
    href: '/edu',
  },
  {
    text: (locale) => capitalize(locale.projects.courses.title),
    href: '/courses',
  },
  {
    text: (locale) => capitalize(locale.projects.tournaments.title),
    href: '/tournaments',
  },
];

export const links = {
  main: mainLinks,
  secondary: projectLinks,
};
