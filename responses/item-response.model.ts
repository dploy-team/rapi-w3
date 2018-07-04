export interface ItemResponse {
  status?: 'error' | 'success';
  message?: string;
  data: any;
}
export interface ItemUploadResponse {
    status?: 'error' | 'success';
    message?: string;
    data: DataUpload;
}

export interface DataUpload{
    id: number;
    name: string;
    path: string;
    path_src: string;
    path_large?: any;
    path_large_src?: any;
    path_medium?: any;
    path_medium_src?: any;
    path_thumb?: any;
    path_thumb_src?: any;
    mime: string;
    size: number;
    gallery: string;
    drive: string;
    owner_id: string;
    owner_type: string;
    created_at: string;
    updated_at: string;
}
interface FileReaderEventTarget extends EventTarget {
    result:string
}

export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
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
