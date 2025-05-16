import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';
import type { Promotion as TPromotion } from '@type/promotion.type';
import { isCashback } from '@type/promotion.type';

import dayjs from 'dayjs';
import { Card, Tag } from 'antd/es';
import Rating from '@common/rating/rating';

import classNames from 'classnames';
import classes from './promotion.module.css';

const Promotion: FC<TPromotion> = promotion => {
  return (
    <Card className={classes.promotion_wrapper}>
      <Tag className={classes.promotion_type} color="success">
        {promotion.type.replaceAll('_', ' ')}
      </Tag>

      <NameOrLogo
        className={classes.company_header}
        name={promotion.company.name}
        logoUrl={promotion.company.logoUrl}
      />

      {isCashback(promotion) && (
        <NameOrLogo
          className={classes.bank_header}
          name={promotion.bank.name}
          logoUrl={promotion.bank.logoUrl}
        />
      )}

      <div className={classes.promotion}>
        <PromotionText {...promotion} />
        <div>
          C {dayjs(promotion.startAt).format('DD/MM/YYYY')} по{' '}
          {dayjs(promotion.endAt).format('DD/MM/YYYY')}
        </div>
      </div>

      <Rating
        className={classes.rating}
        value={4.5}
        reviews={104}
        message={`Рейтинг ${promotion.company.name}`}
      />
    </Card>
  );
};

const NameOrLogo: FC<AdditionalProps<{ name: string; logoUrl: string | null }>> = ({
  className,
  name,
  logoUrl,
}) => {
  if (logoUrl) {
    return <img className={classNames(classes.logo, className)} src={logoUrl} alt={name} />;
  }

  return <h2 className={classNames(classes.name, className)}>{name}</h2>;
};

const PromotionText: FC<TPromotion> = promotion => {
  if (isCashback(promotion)) {
    return (
      <div>
        Кэшбек {promotion.size}% при покупке с банка <b>{promotion.bank.name}</b>
      </div>
    );
  }

  return <div>Скидки до {promotion.size}%</div>;
};

export default Promotion;
