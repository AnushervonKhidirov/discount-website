import type { FC } from 'react';
import type { Benefit as TBenefit } from '@type/benefit.type';

import { useEffect, useState } from 'react';
import { BenefitService } from '@service/benefit/benefit.service';

import Grid from '@component/common/grid/grid';
import Benefit from '@component/benefit/benefit';

const BenefitPage: FC<{ type?: TBenefit['type'] }> = ({ type }) => {
  const benefitService = new BenefitService();
  const [benefits, setBenefits] = useState<TBenefit[]>([]);

  async function getBenefits() {
    const [benefits, err] = await benefitService.getAll({ where: { type } });
    if (err) return;
    setBenefits(benefits);
  }

  useEffect(() => {
    getBenefits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      {benefits.map(benefit => (
        <Benefit {...benefit} key={benefit.id} />
      ))}
    </Grid>
  );
};

export default BenefitPage;
