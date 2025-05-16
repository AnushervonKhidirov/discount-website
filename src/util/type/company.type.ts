export type Company = {
  id: number;
  name: string;
  about: string | null;
  logoUrl: string | null;
  archived: boolean;
  verified: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};
