import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import classNames from 'classnames';
import classes from './grid.module.css';

type size = 'xSmall' | 'small' | 'medium' | 'large';

const Grid: FC<AdditionalProps<{ size?: size }>> = ({ children, className, size = 'medium' }) => {
  return <div className={classNames(classes.grid, classes[size], className)}>{children}</div>;
};

export default Grid;
