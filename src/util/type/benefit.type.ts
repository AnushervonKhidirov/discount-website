import type { Company } from './company.type';
import type { Bank } from './bank.type';

export type Benefit = {
  id: number;
  type: BenefitType;
  size: number;
  about: string | null;
  archived: boolean;
  companyId: number;
  company: Company;
  bankId?: number;
  bank?: Bank;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export enum BenefitType {
  DISCOUNT = 'DISCOUNT',
  CASHBACK = 'CASHBACK',
  PROMO_CODE = 'PROMO_CODE',
}
