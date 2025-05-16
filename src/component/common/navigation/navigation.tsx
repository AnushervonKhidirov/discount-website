import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';
import type { MenuItem } from '@type/navigation.type';

import { useLocation } from 'react-router';
import { Menu } from 'antd/es';

import { getKeyFromUrl } from '@helper/navigation.helper';
import classNames from 'classnames';
import classes from './navigation.module.css';

const Navigation: FC<AdditionalProps<{ menuItems: MenuItem[] }>> = ({ menuItems, className }) => {
  const location = useLocation();

  return (
    <Menu
      className={classNames(classes.navigation, className)}
      items={menuItems}
      selectedKeys={[getKeyFromUrl(location.pathname, 1)]}
    />
  );
};

export default Navigation;
