import type { Company } from './company.type';
import type { Bank } from './bank.type';

export type Benefit = {
  id: number;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: BenefitType;
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

export enum BenefitType {
  DISCOUNT = 'DISCOUNT',
  CASHBACK = 'CASHBACK',
  PROMO_CODE = 'PROMO_CODE',
}

export type Discount = Omit<Benefit, 'bankId' | 'promoCode'>;
export type Cashback = Omit<Benefit, 'promoCode'> & { bankId: number };
export type PromoCode = Omit<Benefit, 'bankId'> & { promoCode: string };
type UnknownBenefitType = Discount | Cashback | PromoCode;

export function isDiscount(benefit: UnknownBenefitType): benefit is Discount {
  return benefit.type === BenefitType.DISCOUNT;
}

export function isCashback(benefit: UnknownBenefitType): benefit is Cashback {
  return benefit.type === BenefitType.CASHBACK;
}

export function isPromoCode(benefit: UnknownBenefitType): benefit is PromoCode {
  return benefit.type === BenefitType.PROMO_CODE;
}
