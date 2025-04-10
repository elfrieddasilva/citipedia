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

const transportationMeanFormSchema = formSchema.pick({
    transportationMean: true
});

type TransportationMeanFormSchemaType = z.infer<typeof transportationMeanFormSchema>;

const TransportationMeanForm = () => {
    const { onHandleBack, formData } = useFormStateHook();
    const store = useFormStore();
    const form = useForm<TransportationMeanFormSchemaType>({
        resolver: zodResolver(transportationMeanFormSchema),
        values: {
            transportationMean: store.transportationMean ?? "",
        }
    });

    useEffect(() => {
        form.reset({
            transportationMean: store.transportationMean ?? ""
        });
    }, [store.workLocationLat, store.workLocationLng, form.reset]);

    const onSubmit = (data: TransportationMeanFormSchemaType)=> {
        console.log(formData)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="transportationMean"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Moyen de déplacement</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre moyen de déplacement" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="me-2" onClick={onHandleBack}>Précédent</Button>
                <Button type="submit">Valider</Button>
            </form>
        </Form>
    );
};

export default TransportationMeanForm;
