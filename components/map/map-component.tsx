'use client';

import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder";

import Logo from "../../public/logo.png";
import Image from "next/image"
import {useState} from "react";
import FormProvider from "@/components/form-provider";
import { useFormStore } from '@/form/store';
import {resetForm} from "@/lib/utils";

const Map = () => {
    resetForm();
    const [position, setPosition] = useState({ lat: 6.3703, lng: 2.3912 });
    const store = useFormStore();
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                store.setData({
                    workLocationLat: e.latlng.lat.toString(),
                    workLocationLng: e.latlng.lng.toString()
                })
            },
        });

        return position ? <Marker position={position}/> : null;
    }

    return (
        <>
            <div className="relative">
               <FormProvider />
                <div className="absolute top-20  left-0.5 z-9999">
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
