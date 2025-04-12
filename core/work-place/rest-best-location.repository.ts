import {BestLocationRepository} from "@/core/work-place/best-location.repository";
import {GeoCoordinate} from "./geo-coordinate";
import {BestLocation} from "@/core/work-place/best-location";
import {AxiosHttp} from "@/core/http/infrastructure/AxiosHttp";
import {RecommendationResponse} from "@/core/work-place/api-response";
import {injectable, inject} from "inversify";

const sample = {
    "best_places": [
        {
            "distance": 0.4772034922405177,
            "latitude": 6.3781607,
            "living_index": 4.0,
            "longitude": 2.4079646697068346,
            "optimal_path": [
                [
                    6.3774494,
                    2.4074522
                ],
                [
                    6.3761847,
                    2.405843
                ],
                [
                    6.3754531,
                    2.4049182
                ],
                [
                    6.3753717,
                    2.4047992
                ],
                [
                    6.3752976,
                    2.4049191
                ],
                [
                    6.3749488,
                    2.4054923
                ],
                [
                    6.374576,
                    2.406004
                ],
                [
                    6.3742102,
                    2.4064568
                ],
                [
                    6.3738197,
                    2.4069271
                ]
            ],
            "place": "8\u00e8me arrondissement, Cotonou",
            "score": 8.3821683307882
        },
        {
            "distance": 1.4482806569050632,
            "latitude": 6.3701637,
            "living_index": 10.0,
            "longitude": 2.4193839459694386,
            "optimal_path": [
                [
                    6.3706109,
                    2.4194266
                ],
                [
                    6.3694501,
                    2.417945
                ],
                [
                    6.3699767,
                    2.4175273
                ],
                [
                    6.3704398,
                    2.4171597
                ],
                [
                    6.3708094,
                    2.4168668
                ],
                [
                    6.3709342,
                    2.4167662
                ],
                [
                    6.3709979,
                    2.4158754
                ],
                [
                    6.371074,
                    2.4150567
                ],
                [
                    6.3711115,
                    2.4145701
                ],
                [
                    6.371138,
                    2.4141981
                ],
                [
                    6.3712098,
                    2.4133382
                ],
                [
                    6.3712869,
                    2.4124855
                ],
                [
                    6.3713614,
                    2.4116264
                ],
                [
                    6.3714321,
                    2.4107641
                ],
                [
                    6.3714775,
                    2.4105385
                ],
                [
                    6.3718544,
                    2.4104245
                ],
                [
                    6.371985,
                    2.4103198
                ],
                [
                    6.3722021,
                    2.4097763
                ],
                [
                    6.3720785,
                    2.4093789
                ],
                [
                    6.3723427,
                    2.4088499
                ],
                [
                    6.3727357,
                    2.4083969
                ],
                [
                    6.3730676,
                    2.408025
                ],
                [
                    6.3735006,
                    2.4075512
                ],
                [
                    6.3738646,
                    2.4070953
                ],
                [
                    6.374282,
                    2.4065808
                ],
                [
                    6.3746346,
                    2.40616
                ],
                [
                    6.3749932,
                    2.4056728
                ],
                [
                    6.3753796,
                    2.4050422
                ],
                [
                    6.3754531,
                    2.4049182
                ],
                [
                    6.3753717,
                    2.4047992
                ],
                [
                    6.3752976,
                    2.4049191
                ],
                [
                    6.3749488,
                    2.4054923
                ],
                [
                    6.374576,
                    2.406004
                ],
                [
                    6.3742102,
                    2.4064568
                ],
                [
                    6.3738197,
                    2.4069271
                ]
            ],
            "place": "7\u00e8me arrondissement, Cotonou",
            "score": 6.904739045103129
        },
        {
            "distance": 0.8103833799067436,
            "latitude": 6.3671755,
            "living_index": 5.0,
            "longitude": 2.4095618187040513,
            "optimal_path": [
                [
                    6.3676257,
                    2.4097345
                ],
                [
                    6.3681089,
                    2.4093561
                ],
                [
                    6.3685678,
                    2.4089965
                ],
                [
                    6.3690164,
                    2.4086457
                ],
                [
                    6.3694883,
                    2.4082763
                ],
                [
                    6.3699196,
                    2.4079386
                ],
                [
                    6.3700485,
                    2.4078377
                ],
                [
                    6.3692838,
                    2.4068558
                ],
                [
                    6.3697632,
                    2.4064809
                ],
                [
                    6.3702246,
                    2.4061292
                ],
                [
                    6.3706807,
                    2.4057678
                ],
                [
                    6.3711444,
                    2.4054155
                ],
                [
                    6.3716286,
                    2.4050596
                ],
                [
                    6.3720948,
                    2.4046873
                ],
                [
                    6.3738197,
                    2.4069271
                ]
            ],
            "place": "11\u00e8me arrondissement, Cotonou",
            "score": 6.169919230790968
        },
        {
            "distance": 2.344187642937025,
            "latitude": 6.38026655,
            "living_index": 5.0,
            "longitude": 2.4271019479133344,
            "optimal_path": [
                [
                    6.3799207,
                    2.4261796
                ],
                [
                    6.3803591,
                    2.4258451
                ],
                [
                    6.3796132,
                    2.4248739
                ],
                [
                    6.3783936,
                    2.4233626
                ],
                [
                    6.3772822,
                    2.4219317
                ],
                [
                    6.3771959,
                    2.4218298
                ],
                [
                    6.3756543,
                    2.419865
                ],
                [
                    6.3750156,
                    2.4190873
                ],
                [
                    6.3733449,
                    2.4169835
                ],
                [
                    6.3723254,
                    2.4156828
                ],
                [
                    6.3713073,
                    2.4144139
                ],
                [
                    6.371138,
                    2.4141981
                ],
                [
                    6.3712098,
                    2.4133382
                ],
                [
                    6.3712869,
                    2.4124855
                ],
                [
                    6.3713614,
                    2.4116264
                ],
                [
                    6.3714321,
                    2.4107641
                ],
                [
                    6.3714775,
                    2.4105385
                ],
                [
                    6.3718544,
                    2.4104245
                ],
                [
                    6.371985,
                    2.4103198
                ],
                [
                    6.3722021,
                    2.4097763
                ],
                [
                    6.3720785,
                    2.4093789
                ],
                [
                    6.3723427,
                    2.4088499
                ],
                [
                    6.3727357,
                    2.4083969
                ],
                [
                    6.3730676,
                    2.408025
                ],
                [
                    6.3735006,
                    2.4075512
                ],
                [
                    6.3738646,
                    2.4070953
                ],
                [
                    6.374282,
                    2.4065808
                ],
                [
                    6.3746346,
                    2.40616
                ],
                [
                    6.3749932,
                    2.4056728
                ],
                [
                    6.3753796,
                    2.4050422
                ],
                [
                    6.3754531,
                    2.4049182
                ],
                [
                    6.3753717,
                    2.4047992
                ],
                [
                    6.3752976,
                    2.4049191
                ],
                [
                    6.3749488,
                    2.4054923
                ],
                [
                    6.374576,
                    2.406004
                ],
                [
                    6.3742102,
                    2.4064568
                ],
                [
                    6.3738197,
                    2.4069271
                ]
            ],
            "place": "6\u00e8me arrondissement, Cotonou",
            "score": 2.1329350553761626
        },
        {
            "distance": 1.9380486026799015,
            "latitude": 6.3840079,
            "living_index": 4.0,
            "longitude": 2.3924920529062765,
            "optimal_path": [
                [
                    6.3839748,
                    2.3924222
                ],
                [
                    6.3842175,
                    2.3919098
                ],
                [
                    6.3838139,
                    2.3917244
                ],
                [
                    6.3837414,
                    2.3916883
                ],
                [
                    6.3832431,
                    2.3914635
                ],
                [
                    6.3828648,
                    2.3921787
                ],
                [
                    6.382606,
                    2.3927457
                ],
                [
                    6.3822967,
                    2.393493
                ],
                [
                    6.3805681,
                    2.3938256
                ],
                [
                    6.3800132,
                    2.3941058
                ],
                [
                    6.3795478,
                    2.3943481
                ],
                [
                    6.3792347,
                    2.3945235
                ],
                [
                    6.3792343,
                    2.3954893
                ],
                [
                    6.3798951,
                    2.396472
                ],
                [
                    6.3795185,
                    2.3967574
                ],
                [
                    6.3791502,
                    2.3970365
                ],
                [
                    6.3804087,
                    2.399082
                ],
                [
                    6.3802529,
                    2.3991745
                ],
                [
                    6.3797915,
                    2.3995502
                ],
                [
                    6.3796379,
                    2.3996707
                ],
                [
                    6.3798401,
                    2.3999301
                ],
                [
                    6.3793557,
                    2.400318
                ],
                [
                    6.3789003,
                    2.4006827
                ],
                [
                    6.3784424,
                    2.4010495
                ],
                [
                    6.3779772,
                    2.4014221
                ],
                [
                    6.3775069,
                    2.4017997
                ],
                [
                    6.377877,
                    2.4022661
                ],
                [
                    6.3782201,
                    2.4026984
                ],
                [
                    6.3785939,
                    2.4031695
                ],
                [
                    6.3781352,
                    2.4035261
                ],
                [
                    6.3776736,
                    2.4038898
                ],
                [
                    6.3772327,
                    2.4042509
                ],
                [
                    6.3775957,
                    2.4047075
                ],
                [
                    6.3771312,
                    2.4050813
                ],
                [
                    6.3766852,
                    2.4054402
                ],
                [
                    6.3761847,
                    2.405843
                ],
                [
                    6.3754531,
                    2.4049182
                ],
                [
                    6.3753717,
                    2.4047992
                ],
                [
                    6.3752976,
                    2.4049191
                ],
                [
                    6.3749488,
                    2.4054923
                ],
                [
                    6.374576,
                    2.406004
                ],
                [
                    6.3742102,
                    2.4064568
                ],
                [
                    6.3738197,
                    2.4069271
                ]
            ],
            "place": "10\u00e8me arrondissement, Cotonou",
            "score": 2.063931727237834
        }
    ]
}

@injectable()
export class RestBestLocationRepository implements BestLocationRepository {
    constructor(
        @inject(AxiosHttp)
        private http: AxiosHttp
    ) {
    }
    async getBestLocationsForCoordinates(coord: GeoCoordinate, transportationMean?: string): Promise<BestLocation[]> {
       const response = (
           await this.http.get<RecommendationResponse>(
               `best_location?dest_lat=${coord.latitude}&dest_lng=${coord.longitude}&transportation=${transportationMean}`
           )
       ).data.best_places;
        return response.map((place) => {
           return ({
               livingIndex: place.living_index,
               coordinates: {
                   latitude: place.latitude,
                   longitude: place.longitude
               },
               place: place.place,
               distance: place.distance,
               optimalPath: place.optimal_path,
               score: place.score
           })
       });
    }

}