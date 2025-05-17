export type Company = {
  id: number;
  name: string;
  about: string | null;
  logoUrl: string | null;
  archived: boolean;
  verified: boolean;
  categoryId: number;
  countryIds: number[];
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type CreateCompany = Pick<Company, 'name' | 'about' | 'countryIds' | 'categoryId'>;

export type UpdateCompany = Pick<
  Company,
  'name' | 'about' | 'countryIds' | 'categoryId' | 'logoUrl'
>;
