import type { Company } from './company.type';
import type { Bank } from './bank.type';

export type Benefit = {
  id: number;
  type: 'DISCOUNT' | 'CASHBACK';
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
