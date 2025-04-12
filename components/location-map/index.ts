import dynamic from 'next/dynamic';
export const LocationMapComponent = dynamic(() => import("./location-map-component"), { ssr: !!false });