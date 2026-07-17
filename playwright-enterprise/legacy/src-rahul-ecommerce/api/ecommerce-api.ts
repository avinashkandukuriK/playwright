import type { APIRequestContext } from '@playwright/test';
import { env } from '../config/env';

export interface CreateOrderResponse {
  token: string;
  orderId: string;
}

export class EcommerceApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(username: string, password: string): Promise<string> {
    const response = await this.request.post(`${env.urls.apiBaseUrl}/auth/login`, {
      data: {
        userEmail: username,
        userPassword: password
      }
    });

    if (!response.ok()) {
      throw new Error(`Login API failed with HTTP ${response.status()}`);
    }

    const body = (await response.json()) as { token?: string };

    if (!body.token) {
      throw new Error('Login API response did not include a token.');
    }

    return body.token;
  }

  async createOrder(username: string, password: string, productOrderedId: string): Promise<CreateOrderResponse> {
    const token = await this.login(username, password);
    const response = await this.request.post(`${env.urls.apiBaseUrl}/order/create-order`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: {
        orders: [
          {
            country: process.env.ORDER_COUNTRY_NAME || 'India',
            productOrderedId
          }
        ]
      }
    });

    if (!response.ok()) {
      throw new Error(`Create order API failed with HTTP ${response.status()}`);
    }

    const body = (await response.json()) as { orders?: string[] };
    const orderId = body.orders?.[0];

    if (!orderId) {
      throw new Error('Create order API response did not include an order id.');
    }

    return { token, orderId };
  }
}
