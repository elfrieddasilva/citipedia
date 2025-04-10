import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    ReactElement
} from "react";

import {FormSchemaType} from "@/form/schema";

export type StepType = {
    step: ReactElement,
}

interface IFormContext {
    formData: FormSchemaType;
    setFormData: Dispatch<SetStateAction<any>>;
    onHandleBack: () => void;
    onHandleNext: () => void;
    steps: StepType[];
    step: ReactElement | null;
    currentStepIndex: number;
    setCurrentStepIndex: Dispatch<SetStateAction<number>>
    isFirstStep: boolean;
    isLastStep: boolean;
    updateFormDataField: (data: Partial<FormSchemaType>) => void;
}

export const FormContext = createContext<IFormContext>({
    formData: {} as FormSchemaType,
    onHandleBack: () => { },
    onHandleNext: () => { },
    setFormData: () => { },
    steps: [],
    step: null,
    currentStepIndex: 0,
    setCurrentStepIndex: () => { },
    isFirstStep: false,
    isLastStep: false,
    updateFormDataField: (data: Partial<FormSchemaType>) => {},
});

export function useFormStateHook() {
    return useContext(FormContext);
}