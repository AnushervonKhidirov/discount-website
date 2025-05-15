import type { Company } from './company.type';
import type { Bank } from './bank.type';

export type Promotion = {
  id: number;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: PromotionType;
  size: number;
  message: string | null;
  startAt: Date;
  endAt: Date;
  companyId: number;
  company: Company;
  bankId: number | null;
  bank: Bank;
  promoCode: string | null;
};

export enum PromotionType {
  DISCOUNT = 'DISCOUNT',
  CASHBACK = 'CASHBACK',
  PROMO_CODE = 'PROMO_CODE',
}

export type Discount = Omit<Promotion, 'bankId' | 'promoCode'>;
export type Cashback = Omit<Promotion, 'promoCode'> & { bankId: number };
export type PromoCode = Omit<Promotion, 'bankId'> & { promoCode: string };
type UnknownPromotionType = Discount | Cashback | PromoCode;

export function isDiscount(promotion: UnknownPromotionType): promotion is Discount {
  return promotion.type === PromotionType.DISCOUNT;
}

export function isCashback(promotion: UnknownPromotionType): promotion is Cashback {
  return promotion.type === PromotionType.CASHBACK;
}

export function isPromoCode(promotion: UnknownPromotionType): promotion is PromoCode {
  return promotion.type === PromotionType.PROMO_CODE;
}
