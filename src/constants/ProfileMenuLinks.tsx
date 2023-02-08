import { IProfileMenuLink } from '@custom-types/ui/IHeaderLink';
import {
  BellRinging,
  Crown,
  GlassFull,
  MailOpened,
  Robot,
} from 'tabler-icons-react';

export const menuLinks: IProfileMenuLink[] = [
  {
    text: (locale) => locale.mainHeaderLinks.profileLinks.profile,
    icon: <Robot color="var(--secondary)" size={20} />,
    href: '/profile/me',
  },
  {
    text: (locale) =>
      locale.mainHeaderLinks.profileLinks.notifications,
    icon: <BellRinging color="var(--secondary)" size={20} />,
    href: '/profile/me?section=notifications',
  },
  {
    text: (locale) =>
      locale.mainHeaderLinks.profileLinks.adminDashboard,
    icon: <Crown color="var(--secondary)" size={20} />,
    href: '/dashboard/admin',
    permission: 'admin',
  },
  {
    text: (locale) =>
      locale.mainHeaderLinks.profileLinks.developerDashboard,
    icon: <GlassFull color="var(--secondary)" size={20} />,
    href: '/dashboard/developer',
    permission: 'developer',
  },
  {
    text: (locale) => locale.mainHeaderLinks.profileLinks.feedback,
    icon: <MailOpened color="var(--secondary)" size={20} />,
    href: '/feedback',
  },
];
