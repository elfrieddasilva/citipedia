import {GeoCoordinate} from "@/core/work-place/geo-coordinate";

export interface Workplace {
    coords: GeoCoordinate;
    transportationMean: string;
}
