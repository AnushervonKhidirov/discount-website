import type { FC } from 'react';
import type { MenuProps } from 'antd/es';
import type { AdditionalProps } from '@type/common.type';

import { NavLink, useLocation } from 'react-router';
import { Menu } from 'antd/es';
import { Page } from '@constant/link.constant';

import classNames from 'classnames';
import classes from './navigation.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    label: (
      <NavLink to={Page.Promotion} reloadDocument>
        All
      </NavLink>
    ),
    key: getFromUrl(Page.Promotion),
  },
  {
    label: (
      <NavLink to={Page.Discount} reloadDocument>
        Discounts
      </NavLink>
    ),
    key: getFromUrl(Page.Discount),
  },
  {
    label: (
      <NavLink to={Page.Cashback} reloadDocument>
        Cashback
      </NavLink>
    ),
    key: getFromUrl(Page.Cashback),
  },
  {
    label: (
      <NavLink to={Page.PromoCode} reloadDocument>
        Promo codes
      </NavLink>
    ),
    key: getFromUrl(Page.PromoCode),
  },
];

function getFromUrl(url: string) {
  return url.split('?')[0];
}

const Navigation: FC<AdditionalProps> = ({ className }) => {
  const location = useLocation();

  return (
    <Menu
      className={classNames(classes.navigation, className)}
      items={menuItems}
      selectedKeys={[getFromUrl(location.pathname)]}
    />
  );
};

export default Navigation;
