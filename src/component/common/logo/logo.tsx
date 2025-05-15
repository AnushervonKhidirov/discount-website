import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import classNames from 'classnames';
import classes from './logo.module.css';

const Logo: FC<AdditionalProps> = ({ className }) => {
  return <div className={classNames(classes.logo, className)}>Logo</div>;
};

export default Logo;
