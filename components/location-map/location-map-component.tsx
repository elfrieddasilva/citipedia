'use client';

import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
    Tooltip
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder";

import Logo from "../../public/logo.png";
import Image from "next/image";
import { useFormStore } from '@/form/store';
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { LatLng } from "leaflet";
import { useSearchEngine } from "@/core/ioc/container";
import { useQuery } from '@tanstack/react-query';
import {
    Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
} from "@/components/ui/collapsible"


const Map = () => {
    const store = useFormStore();
    const isMobile = useIsMobile();

    const colors = ["blue", "green", "red", "orange", "yellow", "purple"];

    const { isPending, error, data } = useQuery({
        queryKey: ['bestLocation'],
        queryFn: async () => await useSearchEngine.getBestLocationsForCoordinates({
            latitude: 6.36,
            longitude: 2.41
        }),
    });

    if (isPending) {
        return <div className="p-4">Chargement...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Une erreur s'est produite: {error.message}</div>;
    }

    const lat = Number(store.workLocationLat);
    const lng = Number(store.workLocationLng);

    if (isNaN(lat) || isNaN(lng)) {
        return (
            <div className="bg-white w-[350px] rounded-md p-3 top-5 sm:top-15 absolute z-9999 right-3">
                <p>Les coordonnées de travail sont invalides.</p>
                <Link href="/" className="flex items-center justify-center
                    px-4 py-2 mt-3 bg-primary text-white rounded-md hover:bg-primary/80
                    transition-colors
                    ">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à la page principale
                </Link>
            </div>
        );
    }


    const workPlace = [lat, lng];

    return (
        <>
            <div className="relative">
                <div className="bg-white w-[350px] rounded-md p-3 top-5 sm:top-15 absolute z-9999 right-3">
                    {
                        data?.map((location, index) => {
                            return (
                                <Collapsible>
                                    <CollapsibleTrigger className={`mb-2 flex items-center justify-center !text-${colors[index]}-400`}>
                                        <ChevronDown className="w-4 h-4 mr-2" />
                                       <span className={`!text-${colors[index]}-400`}>{location.place}</span>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className={"flex flex-col px-4"}>
                                            <span>Score: {location.score}</span>
                                            <span>Distance à la destination en km: {location.distance}</span>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            )
                        })
                    }
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
                        <div className="absolute top-20 left-0.5 z-9999">
                            <Image src={Logo.src} alt="Citipedia" width={80} height={80}/>
                        </div>
                    )
                }
            </div>

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
                    data?.map((bestLocation, index) => {
                        const pathPositions = bestLocation.optimalPath.map(coord =>
                            new LatLng(coord.latitude, coord.longitude)
                        );
                        pathPositions.push(new LatLng(workPlace[0], workPlace[1]));

                        return (
                            <div key={`location-${index}`}>
                                <Marker position={[
                                    bestLocation.coordinates.latitude,
                                    bestLocation.coordinates.longitude
                                ]}>
                                    <Popup>{bestLocation.place}</Popup>
                                </Marker>
                                <Polyline
                                    pathOptions={{ color: colors[index % colors.length] }}
                                    positions={pathPositions}
                                />
                            </div>
                        );
                    })
                }
            </MapContainer>
        </>
    );
};

export default Map;
