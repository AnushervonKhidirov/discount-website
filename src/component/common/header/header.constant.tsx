import type { MenuItem } from '@type/navigation.type';

import { NavLink } from 'react-router';
import { Page } from '@constant/link.constant';

export const menuItems: MenuItem[] = [
  {
    label: <NavLink to={Page.Promotion}>Promotions</NavLink>,
    key: Page.Promotion,
  },
  {
    label: <NavLink to={Page.Store}>Stores</NavLink>,
    key: Page.Store,
  },
];
