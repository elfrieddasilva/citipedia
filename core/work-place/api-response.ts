import {GeoCoordinate} from "@/core/work-place/geo-coordinate";

export interface BestPlace {
    distance: number;
    latitude: number;
    longitude: number;
    living_index: number;
    optimal_path: GeoCoordinate[];
    place: string;
    score: number;
}

export interface RecommendationResponse {
    best_places: BestPlace[];
}
