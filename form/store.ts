import {FormSchemaType} from "@/form/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {LOCAL_STORAGE_KEY} from "@/lib/utils";

type FormState = Partial<FormSchemaType> & {
    setData: (data: Partial<FormSchemaType>) => void;
};

export const useFormStore = create<FormState>()(
    persist(
        (set) => ({
            setData: (data: Partial<FormSchemaType>) => set(data),
        }),
        {
            name: LOCAL_STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
);

