import dynamic from 'next/dynamic';
export const MapComponent = dynamic(() => import("./map-component"), { ssr: !!false });