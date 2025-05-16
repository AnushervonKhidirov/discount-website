import type { ItemType } from 'antd/es/menu/interface';

import { NavLink } from 'react-router';

import { Page } from '@constant/link.constant';

export const profileMenu: (ItemType & { ownerOnly?: boolean })[] = [
  {
    key: Page.Profile,
    label: <NavLink to={Page.Profile}>Profile</NavLink>,
  },
  {
    key: Page.MyCompanies,
    label: <NavLink to={Page.MyCompanies}>My companies</NavLink>,
    ownerOnly: true,
  },
  {
    key: Page.CreateCompany,
    label: <NavLink to={Page.CreateCompany}>Create company</NavLink>,
  },
];
