import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { Tabs } from 'antd/es';

import Grid from '@component/common/grid/grid';
import Promotion from '@component/promotion/promotion';
import Loader from '@component/common/loader/loader';

import { PromotionService } from '@service/promotion/promotion.service';
import { getKeyFromUrl } from '@helper/navigation.helper';

import { tabs, pageToPromotionType } from './promotion.constant';
import classes from './promotion.module.css';

const PromotionPage = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const promotionService = new PromotionService();
  const [type, setType] = useState(pageToPromotionType.get(getKeyFromUrl(location.pathname)));

  const { data: promotions, isFetching } = useQuery({
    initialData: [],
    queryKey: ['promotionsData', type],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const [promotions, err] = await promotionService.getAll({
        where: { type },
      });
      if (err) throw err;
      return promotions;
    },
  });

  function onTabChange(key: string) {
    navigation(key, { preventScrollReset: true });

    setTimeout(() => {
      setType(pageToPromotionType.get(getKeyFromUrl(key)));
    }, 300);
  }

  return (
    <div className={classes.promotion_page}>
      <Tabs
        onChange={onTabChange}
        defaultActiveKey={getKeyFromUrl(location.pathname)}
        items={tabs}
      />

      {isFetching && <Loader size="large" />}

      {!isFetching && (
        <Grid>
          {promotions.map(promotion => (
            <Promotion {...promotion} key={promotion.id} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PromotionPage;
