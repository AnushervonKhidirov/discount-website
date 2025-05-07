import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import { Rate } from 'antd/es';

import classNames from 'classnames';
import classes from './rating.module.css';

type Rating = {
  value: number;
  reviews: number;
  message?: string;
};

const Rating: FC<AdditionalProps<Rating>> = ({ value, reviews, message, className }) => {
  return (
    <div className={classNames(classes.rating, className)}>
      {message && <div className={classes.rating_message}>{message}</div>}

      <div className={classes.rating_start_wrapper}>
        <Rate className={classes.rating_start} allowHalf value={value}></Rate>
        <div className={classes.rating_reviews}>({reviews})</div>
      </div>
    </div>
  );
};

export default Rating;
