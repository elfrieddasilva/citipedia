import {GeoCoordinate} from "@/core/work-place/geo-coordinate";

export interface BestLocation {
    distance: number;
    livingIndex: number;
    place: string;
    score: number;
    coordinates: GeoCoordinate;
    optimalPath: GeoCoordinate[];
}

