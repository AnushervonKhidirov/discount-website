import type { User } from '@type/user.type';

import { create } from 'zustand';

type UserValue = User | null;

type UserState = {
  user: UserValue;
  setUser: (user: UserValue) => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
}));
