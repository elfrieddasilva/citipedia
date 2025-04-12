import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiUrl } from "@/config/api.config";

import { injectable } from "inversify";
export type AxiosHttpResponse<T> = AxiosResponse<T>;

@injectable()
export class AxiosHttp {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<Result>(uri: string, config = {}): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.get<Result>(uri, config);
  }

  async put<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.put<Result>(uri, data);
  }

  async patch<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.patch<Result>(uri, data);
  }

  async post<Result, Payload = never>(uri: string, data?: Payload, config?: AxiosRequestConfig): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.post<Result>(uri, data, config);
  }

  async delete<Result>(uri: string): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.delete<Result>(uri);
  }
}
