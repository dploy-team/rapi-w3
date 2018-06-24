export interface ItemResponse {
  status?: 'error' | 'success';
  message?: string;
  data: any;
}

export interface CollectionResponse {
  data: any[];
  includes?: any[];
  pagination?: {};
  meta?: {
    total: number,
    per_page: any
  };
  links?: any;
}

export interface ErrorResponse {
  status: string;
  data?: any;
  error?: Error;
}

interface Error {
  code: string;
  http_code: number;
  message: string;
  validation?: [{ string: string[] }];
}
