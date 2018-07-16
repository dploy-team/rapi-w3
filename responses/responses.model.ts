export interface ItemResponse<T> {
    data: T | any;
}

export interface CollectionResponse<T> {
    data: T[];
    includes?: any[];
    pagination?: {};
    meta?: {
        total: number,
        per_page: any
    };
    links?: any;
}

export interface Response20x {
    status?: 'success' | 'error';
    message?: string;
    data?: any;
}

interface Error {
    code: string;
    http_code: number;
    message: string;
    // validation?: [{ string: string[] }];
    validation: {
        [key: string]: string[]
    };
}

export interface Response40x {
    status?: 'success' | 'error';
    data?: any;
    error: Error;
}

//
// const d: Response40x = {
//     error: {
//         code: 'WRONG_ARGS',
//         http_code: 400,
//         message: 'Erro de validação',
//         validation: {
//             indication: [
//                 'O campo indication é obrigatório.',
//                 'sdf'
//             ]
//         }
//     }
// };

export interface ItemUploadResponse {
    status?: 'error' | 'success';
    message?: string;
    data: DataUpload;
}

export interface DataUpload {
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
    result: string;
}

export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;

    getMessage(): string;
}


