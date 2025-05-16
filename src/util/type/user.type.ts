import type { Company } from './company.type';

export type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  companies: Company[] | null;
};

export type UpdateUserData = Pick<User, 'username' | 'role' | 'archived'>;

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
