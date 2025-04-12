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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useSearchEngine} from "@/core/ioc/container";
import { redirect } from 'next/navigation';
import {toast} from "sonner";

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

    const onSubmit = async (data: TransportationMeanFormSchemaType) => {
        store.setData({
            transportationMean: data.transportationMean
        });
        try {
            const bestLocations = await useSearchEngine.getBestLocationsForCoordinates({
                    longitude: Number(store.workLocationLng),
                    latitude: Number(store.workLocationLat),
                },store.transportationMean
            );
            store.setData({
                locations: bestLocations,
            })
            window.location.replace("/best-locations");
        } catch (error : Error) {
            toast.error(error.message);
        }

    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="transportationMean"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-bold text-xl">Moyen de déplacement</FormLabel>
                            <Select value={form.getValues("transportationMean")} onValueChange={(value) => {
                                field.onChange(value);
                                store.setData({transportationMean: value});
                            }}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Moyen de déplacement" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-9999 w-full">
                                    <SelectItem value="all">Tout type</SelectItem>
                                    <SelectItem value="bike">Moto</SelectItem>
                                    <SelectItem value="walk">Marche</SelectItem>
                                </SelectContent>
                            </Select>
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
