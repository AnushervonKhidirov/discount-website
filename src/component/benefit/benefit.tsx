import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';
import type { Benefit as TBenefit } from '@type/benefit.type';
import { isCashback } from '@type/benefit.type';

import dayjs from 'dayjs';
import { Card, Tag } from 'antd/es';
import Rating from '@component/common/rating/rating';

import classNames from 'classnames';
import classes from './benefit.module.css';

const Benefit: FC<TBenefit> = benefit => {
  return (
    <Card className={classes.benefit_wrapper}>
      <Tag className={classes.benefit_type} color="success">
        {benefit.type.replaceAll('_', ' ')}
      </Tag>

      <NameOrLogo
        className={classes.company_header}
        name={benefit.company.name}
        logoUrl={benefit.company.logoUrl}
      />

      {isCashback(benefit) && (
        <NameOrLogo
          className={classes.bank_header}
          name={benefit.bank.name}
          logoUrl={benefit.bank.logoUrl}
        />
      )}

      <div className={classes.benefit}>
        <BenefitText {...benefit} />
        <div>
          C {dayjs(benefit.startAt).format('DD/MM/YYYY')} по{' '}
          {dayjs(benefit.endAt).format('DD/MM/YYYY')}
        </div>
      </div>

      <Rating
        className={classes.rating}
        value={4.5}
        reviews={104}
        message={`Рейтинг ${benefit.company.name}`}
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

const BenefitText: FC<TBenefit> = benefit => {
  if (isCashback(benefit)) {
    return (
      <div>
        Кэшбек {benefit.size}% при покупке с банка <b>{benefit.bank.name}</b>
      </div>
    );
  }

  return <div>Скидки до {benefit.size}%</div>;
};

export default Benefit;
