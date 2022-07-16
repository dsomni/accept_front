import IHeaderLink from '@custom-types/ui/IHeaderLink';

const mainLinks: IHeaderLink[] = [
  {
    text: (locale) => locale.mainHeaderLinks.main,
    href: '/',
  },
  {
    text: () => 'dropdown',
    href: '',
  },
  {
    text: (locale) => locale.mainHeaderLinks.about,
    href: '/about',
  },
];
const projectLinks: IHeaderLink[] = [
  {
    text: (locale) => locale.projects.education.title,
    href: '/edu',
  },
  {
    text: (locale) => locale.projects.courses.title,
    href: '/courses',
  },
  {
    text: (locale) => locale.projects.tournaments.title,
    href: '/tournaments',
  },
];

export const links = {
  main: mainLinks,
  secondary: projectLinks,
};
