import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiCore } from '../core/api-core';
import { ENV } from '../config/env';

export class BookingsApi extends ApiCore {
  constructor(request: APIRequestContext) {
    super(request);
  }

  private url(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }

    const base = ENV.API_BASE_URL.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
  }

  public async createBooking(
    payload: any,
    endpoint = `/booking`,
  ): Promise<APIResponse> {
    return this.post(this.url(endpoint), payload);
  }

  public async getBookingIds(endpoint = '/booking'): Promise<APIResponse> {
    return this.get(this.url(endpoint));
  }

  public async getBookingById(id: number | string, endpoint = `/booking/${id}`): Promise<APIResponse> {
    return this.get(this.url(endpoint));
  }

  public async updateBooking(
    id: number | string,
    payload: any,
    authToken: string,
    endpoint = `/booking/${id}`,
  ): Promise<APIResponse> {
    return this.put(this.url(endpoint), payload, authToken);
  }

  public async deleteBooking(
    id: number | string,
    authToken: string,
    endpoint = `/booking/${id}`, 
  ): Promise<APIResponse> {
    return this.delete(this.url(endpoint), authToken);
  }

  public async authBooking(
    payload: any,
    endpoint = `/auth`,): Promise<APIResponse> {
      return this.post(this.url(endpoint), payload);
  }


}
