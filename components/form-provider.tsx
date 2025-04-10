"use client";
import {useState} from 'react';
import {StepType, FormContext} from "@/form/use-form-hook";
import { FormSchemaType } from '@/form/schema';
import WorkingPlaceForm from "@/form/working-place-form";
import {useFormStore} from "@/form/store";
import TransportationMeanForm from "@/form/transportation-mean-form";

const FormProvider = () => {
    const store = useFormStore();
    const [formData, setFormData] = useState<FormSchemaType>({
        workLocationLat: String(store.workLocationLat),
        workLocationLng: String(store.workLocationLng),
        transportationMean: String(store.transportationMean)
    });
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const steps: StepType[] = [
        {
            step: <WorkingPlaceForm/>
        },
        {
            step: <TransportationMeanForm />
        }
    ]
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const step = steps[currentStepIndex].step;

    function onHandleNext() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function onHandleBack() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }
    const updateFormDataField = (data: Partial<FormSchemaType>) => {
       store.setData(data);
    };
    return (
            <FormContext.Provider
                value={{
                    formData,
                    setFormData,
                    onHandleBack,
                    onHandleNext,
                    step,
                    steps,
                    currentStepIndex,
                    setCurrentStepIndex,
                    isFirstStep,
                    isLastStep,
                    updateFormDataField
                }}
            >
                <div className="bg-white w-[350px] rounded-md p-3 top-5 sm:top-15 absolute z-9999 right-3">
                    {step}
                </div>
            </FormContext.Provider>
    );
};

export default FormProvider;
