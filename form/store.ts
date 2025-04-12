import { FormSchemaType } from "@/form/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LOCAL_STORAGE_KEY } from "@/lib/utils";
import { BestLocation } from "@/core/work-place/best-location";

type FormState = Partial<FormSchemaType> & {
    locations?: BestLocation[];
    setData: (data: Partial<FormSchemaType> & { locations?: BestLocation[] }) => void;
};

export const useFormStore = create<FormState>()(
        persist(
            (set) => ({
                locations: undefined,
                setData: (data) => set((state) => ({ ...state, ...data,  })),
            }),
            {
                name: LOCAL_STORAGE_KEY,
                storage: createJSONStorage(() => localStorage),
            }
        )
);
