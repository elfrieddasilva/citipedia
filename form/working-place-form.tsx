import React, {useEffect} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "@/form/schema";
import {useFormStateHook} from "@/form/use-form-hook";
import { useFormStore } from './store';

const workingPlaceFormSchema = formSchema.pick({
    workLocationLat: true,
    workLocationLng: true,
});

type WorkingPlaceFormSchemaType = z.infer<typeof workingPlaceFormSchema>;

const WorkingPlaceForm = () => {
    const { onHandleNext } = useFormStateHook();
    const store = useFormStore();
    const form = useForm<WorkingPlaceFormSchemaType>({
        resolver: zodResolver(workingPlaceFormSchema),
        values: {
            workLocationLat: store.workLocationLat ?? "",
            workLocationLng: store.workLocationLng ?? "",
        }
    });

    useEffect(() => {
        form.reset({
            workLocationLat: store.workLocationLat ?? "",
            workLocationLng: store.workLocationLng ?? ""
        });
    }, [store.workLocationLat, store.workLocationLng, form.reset]);

    const onSubmit = (data: WorkingPlaceFormSchemaType)=> {
        onHandleNext();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="workLocationLat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lieu de travail</FormLabel>
                            <FormControl>
                                <Input
                                    disabled
                                    placeholder="Sélectionnez votre lieu de travail sur la carte"
                                    value={
                                        form.getValues("workLocationLat") !== "" && form.getValues("workLocationLng") !== ""
                                            ? `[${form.getValues("workLocationLat")}, ${form.getValues("workLocationLng")}]`
                                            : ""
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="workLocationLng"
                    render={({ field }) => (
                        <FormItem className="!hidden">
                            <FormLabel>Lieu de travail</FormLabel>
                            <FormControl>
                                <Input disabled placeholder="Sélectionnez votre lieu de travail sur la carte" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Suivant</Button>
            </form>
        </Form>
    );
};

export default WorkingPlaceForm;
