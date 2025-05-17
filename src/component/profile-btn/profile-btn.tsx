import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';
import type { User } from '@type/user.type';

import { Button, Avatar, Dropdown } from 'antd/es';
import { UserOutlined } from '@ant-design/icons';

import { profileMenu } from './profile-btn.constant';
import classNames from 'classnames';
import classes from './profile-btn.module.css';

const ProfileBtn: FC<AdditionalProps<{ user: User }>> = ({ user, className }) => {
  const userName = user.firstName ?? user.username;
  const isCompanyOwner = !!user.companies && user.companies.length > 0;
  const filteredMenu = isCompanyOwner ? profileMenu : profileMenu.filter(item => !item.ownerOnly);
  const menuItems = filteredMenu.map(item => {
    delete item.ownerOnly;
    return item;
  });

  return (
    <Dropdown menu={{ items: menuItems }}>
      <Button className={classNames(classes.profile_btn, className)}>
        <Avatar className={classes.avatar} icon={<UserOutlined />} shape="square" />
        <div className={classes.username}>{userName}</div>
        <div className={classes.role}>{user.role.replaceAll('_', ' ').toLowerCase()}</div>
      </Button>
    </Dropdown>
  );
};

export default ProfileBtn;
