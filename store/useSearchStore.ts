/* eslint-disable @typescript-eslint/no-explicit-any */

import {create} from "zustand";

type State = {
  q: string;
  contract: string | null;
  city: string;
  setQ: (v: string) => void;
  setContract: (v: string | null) => void;
  setCity: (v: string) => void;
  reset: () => void;
};

export const useSearchStore = create<State>((set: (arg0: { q?: any; contract?: any; city?: any; }) => any) => ({
  q: "",
  contract: null,
  city: "",
  setQ: (v: any) => set({ q: v }),
  setContract: (v: any) => set({ contract: v }),
  setCity: (v: any) => set({ city: v }),
  reset: () => set({ q: "", contract: null, city: "" }),
}));
