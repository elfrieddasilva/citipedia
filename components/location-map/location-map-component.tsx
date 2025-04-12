'use client';

import {MapContainer, TileLayer, Marker, useMapEvents, Polyline, Popup, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder";

import Logo from "../../public/logo.png";
import Image from "next/image"
import {useState} from "react";
import FormProvider from "@/components/form-provider";
import { useFormStore } from '@/form/store';
import {resetForm} from "@/lib/utils";
import {useIsMobile} from "@/hooks/use-mobile";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import {LatLng} from "leaflet";

const Map = () => {
    const store = useFormStore();
    const isMobile = useIsMobile();

    const colors = ["blue", "green", "red", "orange", "yellow", "purple"];

    const bestLocations = store.locations;

    const workPlace = [Number(store.workLocationLat!), Number(store.workLocationLng!)]

    if (!bestLocations) {
        return (
            <div className="bg-white w-[350px] rounded-md p-3 top-5 sm:top-15 absolute z-9999 right-3">
                <Link href="/" className="flex items-center justify-center
                    px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80
                    transition-colors
                    ">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
            </div>
        )
    }

    return (
        <>
            <div className="relative">
                <div className="bg-white w-[350px] rounded-md p-3 top-5 sm:top-15 absolute z-9999 right-3">
                    <Link href="/" className="flex items-center justify-center
                    px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80
                    transition-colors
                    ">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                            Aller à la page principale
                    </Link>
                </div>
                {
                    !isMobile && (
                        <div className="absolute top-20  left-0.5 z-9999">
                            <Image src={Logo.src} alt="Citipedia" width={80} height={80}/>
                        </div>
                    )
                }
            </div>
            {
                bestLocations && (
                    <>

                        <MapContainer className="map" center={[workPlace[0], workPlace[1]]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[workPlace[0], workPlace[1]]}>
                                <Popup>Votre destination</Popup>
                                <Tooltip permanent>Destination</Tooltip>
                            </Marker>
                            {
                                bestLocations.map((bestLocation, index) => {
                                    const pathPositions = bestLocation.optimalPath.map((coord) => {
                                        return new LatLng(coord.latitude, coord.longitude);
                                    })
                                    return (
                                        <>
                                            <Marker position={[bestLocation.coordinates.latitude, bestLocation.coordinates.longitude]}>
                                                <Tooltip permanent>{bestLocation.place}</Tooltip>
                                            </Marker>
                                            <Polyline pathOptions={{ color: colors[index] }} positions={pathPositions} />
                                        </>
                                    )
                                })
                            }
                        </MapContainer>
                    </>
                )
            }

        </>
    );
};

export default Map;
