import axios, { AxiosInstance } from "axios";
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry";

const defaultRetryConfig = {
  retries: 5,
  initialDelayMs: 100,
};

export default class HttpClient {
  private client: AxiosInstance;
  constructor(baseURL: string, config = defaultRetryConfig) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: { "Content-Type": "application/json" },
    });

    axiosRetry(this.client, {
      retries: config.retries,
      retryDelay: (retryCount: number) => {
        const delay = Math.pow(2, retryCount) * config.initialDelayMs; //100 ms, 200ms, 400ms, 800ms, 1600ms
        const jitter = delay * 0.1 * Math.random(); //10, 20, ... 160
        return delay + jitter;
      },
      retryCondition: (err) => {
        if (err.response) {
          return (
            isNetworkOrIdempotentRequestError(err) ||
            err.response.status === 429
          );
        } else {
          return isNetworkOrIdempotentRequestError(err);
        }
      },
    });
  }

  async fetch(url: string, options: any) {
    const { body, method, headers } = options;
    const request = {
      url,
      method,
      headers: {
        ...headers,
      },
      data: body,
    };

    try {
      const response = await this.client(request);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        //case 1. response status is not 2--
        const data = err.response.data;
        const message =
          data && data.message ? data.message : "something went wrong!";
        throw new Error(message);
      } else {
        //case 2. network error
        throw new Error("connection error");
      }
    }
  }
}
