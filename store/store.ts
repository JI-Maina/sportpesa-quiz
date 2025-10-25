import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  nickname: string;
  phoneNo: string;
  isAdmin: boolean;
};

export type State = {
  user: User | null;
};

export type Actions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

const initialState: State = {
  user: null,
};

export const useQuizStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User) => {
        set({ user });
      },

      clearUser: () => {
        set({ user: null });
      },
    }),
    { name: "quiz-store" }
  )
);
