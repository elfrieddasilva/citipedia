'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    location: z.string().min(2, {
        message: "Ce champ est requis",
    }).nonempty({ message: "Ce champ est requis" })
})

type FormSchemaType = z.infer<typeof formSchema>;


const Map = () => {

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });

    const onSubmit = (data: FormSchemaType)=> {

    }

    return (
        <>
            <div className="relative">
                <div className="bg-white w-[350px] rounded-md p-3 top-5 absolute z-9999 left-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lieu de travail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sélectionnez votre lieu de travail sur la carte" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Enregistrer</Button>
                        </form>
                    </Form>
                </div>

            </div>
            <MapContainer className="map" center={[6.36, 2.43]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[6.36, 2.43]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default Map;
