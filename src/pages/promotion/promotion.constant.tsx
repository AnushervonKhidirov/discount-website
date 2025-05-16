import { TabsProps } from 'antd/es';

import { PromotionType } from '@type/promotion.type';
import { Page } from '@constant/link.constant';
import { getKeyFromUrl } from '@helper/navigation.helper';

export const tabs: TabsProps['items'] = [
  {
    label: 'All',
    key: Page.Promotion,
  },
  {
    label: 'Discounts',
    key: Page.Discount,
  },
  {
    label: 'Cashback',
    key: Page.Cashback,
  },
  {
    label: 'Promo',
    key: Page.PromoCode,
  },
];

export const pageToPromotionType = new Map([
  [getKeyFromUrl(Page.Discount), PromotionType.DISCOUNT],
  [getKeyFromUrl(Page.Cashback), PromotionType.CASHBACK],
  [getKeyFromUrl(Page.PromoCode), PromotionType.PROMO_CODE],
]);
