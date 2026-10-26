import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class ApiCore {
  constructor(
    public request: APIRequestContext
  ) {
    
  }

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(path);
  }

  protected async post(path: string, data: any): Promise<APIResponse> {
    return this.request.post(path, { data });
  }

  protected async put(path: string, data: any, authToken: string): Promise<APIResponse> {
    return this.request.put(path, { 
      data,
      headers: {
        Cookie: 'token='+ authToken
      }
    });
  }

  protected async patch(path: string, data: any, authToken: string): Promise<APIResponse> {
    return this.request.patch(path, { 
      data,
      headers: {
        Cookie: 'token='+ authToken
      }
    });
  }

  protected async delete(path: string, authToken: string): Promise<APIResponse> {
    return this.request.delete(path, {
      headers: {
        Cookie: 'token='+ authToken
      }
    });
  }
}
