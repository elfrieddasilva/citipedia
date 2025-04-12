type Coordinate = [number, number];

interface BestPlace {
    distance: number;
    latitude: number;
    longitude: number;
    living_index: number;
    optimal_path: Coordinate[];
    place: string;
    score: number;
}

export interface RecommendationResponse {
    best_places: BestPlace[];
}
