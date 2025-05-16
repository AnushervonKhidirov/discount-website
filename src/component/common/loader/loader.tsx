import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import { LoadingOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';

import classNames from 'classnames';
import classes from './loader.module.css';

const Loader: FC<AdditionalProps<{ size?: 'small' | 'medium' | 'large' }>> = ({
  size = 'medium',
  className,
}) => {
  return (
    <div className={classNames(classes.loader, classes[size], className)}>
      <LoadingOutlined style={{ color: blue.primary }} />
    </div>
  );
};

export default Loader;
