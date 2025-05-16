import type { FC } from 'react';
import { AdditionalProps } from '@type/common.type';

import classNames from 'classnames';
import classes from './content.module.css';

const Content: FC<AdditionalProps<{ fullHeight?: boolean }>> = ({
  fullHeight,
  className,
  children,
}) => {
  return (
    <div className={classNames(classes.content, className, { [classes.full_height]: fullHeight })}>
      {children}
    </div>
  );
};

export default Content;
