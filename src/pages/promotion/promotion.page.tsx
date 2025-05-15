import type { FC } from 'react';
import type { Promotion as TPromotion } from '@type/promotion.type';

import { useEffect, useState } from 'react';
import { PromotionService } from '@service/promotion/promotion.service';

import Grid from '@component/common/grid/grid';
import Promotion from '@component/promotion/promotion';

const PromotionPage: FC<{ type?: TPromotion['type'] }> = ({ type }) => {
  const promotionService = new PromotionService();
  const [promotions, setPromotions] = useState<TPromotion[]>([]);

  async function getPromotions() {
    const [promotions, err] = await promotionService.getAll({ where: { type } });
    if (err) return;
    setPromotions(promotions);
  }

  useEffect(() => {
    getPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      {promotions.map(promotion => (
        <Promotion {...promotion} key={promotion.id} />
      ))}
    </Grid>
  );
};

export default PromotionPage;
