import "reflect-metadata";
import { Container } from "inversify";
import {AxiosHttp} from "@/core/http/infrastructure/AxiosHttp";
import {BestLocationRepository} from "@/core/work-place/best-location.repository";
import {RestBestLocationRepository} from "@/core/work-place/rest-best-location.repository";

const container = new Container();
container.bind(AxiosHttp).toSelf();
container.bind(BestLocationRepository).to(RestBestLocationRepository).inSingletonScope();


const useSearchEngine = container.get(BestLocationRepository);

export { useSearchEngine };