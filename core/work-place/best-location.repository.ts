import {GeoCoordinate} from "@/core/work-place/geo-coordinate";
import {BestLocation} from "@/core/work-place/best-location";

export abstract class BestLocationRepository {
    abstract getBestLocationsForCoordinates(coord: GeoCoordinate, transportationMean?: string): Promise<BestLocation[]>;
}