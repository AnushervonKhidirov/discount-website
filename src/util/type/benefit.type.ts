import type { Company } from './company.type';
import type { Bank } from './bank.type';

export type Discount = {
  id: number;
  size: number;
  about: string | null;
  archived: boolean;
  company: Company;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Cashback = Discount & {
  bank: Bank;
};

export type Benefit = Cashback | Discount;
