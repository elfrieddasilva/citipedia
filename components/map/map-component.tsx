'use client';

import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder";

import Logo from "../../public/logo.png";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";

const formSchema = z.object({
    location: z.string().min(2, {
        message: "Ce champ est requis",
    }).nonempty({ message: "Ce champ est requis" })
})

type FormSchemaType = z.infer<typeof formSchema>;


const Map = () => {
    const [position, setPosition] = useState({ lat: 6.3703, lng: 2.3912 }); // Default: Cotonou
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                form.setValue("location", `[${e.latlng.lat}, ${e.latlng.lng}]`);
            },
        });

        return position ? <Marker position={position}/> : null;
    }
    const onSubmit = (data: FormSchemaType)=> {

    }
    return (
        <>
            <div className="relative">
                <div className="bg-white w-[350px] rounded-md p-3 top-5 absolute z-9999 right-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lieu de travail</FormLabel>
                                        <FormControl>
                                            <Input disabled placeholder="Sélectionnez votre lieu de travail sur la carte" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Enregistrer</Button>
                        </form>
                    </Form>
                </div>
                <div className="absolute top-20 left-0.5 z-9999">
                    <Image src={Logo.src} alt="Citipedia" width={80} height={80}/>
                </div>
            </div>
            <MapContainer className="map" center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </>
    );
};

export default Map;
