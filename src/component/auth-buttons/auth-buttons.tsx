'use client';
import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import { NavLink } from 'react-router';
import { Button } from 'antd/es';
import { useUserStore } from '@store/user.store';
import ProfileBtn from '../profile-btn/profile-btn';

import { Page } from '@constant/link.constant';
import classNames from 'classnames';
import classes from './auth-buttons.module.css';

const AuthButtons: FC<AdditionalProps> = ({ className }) => {
  const { user } = useUserStore();

  return (
    <div className={classNames(classes.auth_buttons, className)}>
      {user ? (
        <ProfileBtn />
      ) : (
        <>
          <Button type="default">
            <NavLink to={Page.LogIn}>Log in</NavLink>
          </Button>
          <Button type="primary">
            <NavLink to={Page.SignUp}>Sign up</NavLink>
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
