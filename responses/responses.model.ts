export interface ItemResponse {
    data: any;
    message?: string; // mytodo remove
}

export interface ItemRespDec<T> {
    data: T;
}

export interface CollectionRespDec<T> extends CollectionResponse {
    data: T[];
}

export interface CollectionResponse {
    data: any[];
    includes?: string[];
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links?: {
        first: string;
        last: string;
        prev: string;
        next: string;
    };
}

export interface Response20x {
    status?: 'success' | 'error';
    message?: string;
    data?: any;
}

export interface Response40x {
    status?: 'success' | 'error';
    message: string;
    data?: any;
    error: Error;
}

interface Error {
    code: string;
    http_code: number;
    validation?: { [key: string]: string[]; }; // [{ [key: string]: string[]; }];
    // validation: {
    //     [key: string]: string[]
    // };
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
    _pathSrc: '';
}

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;

    getMessage(): string;
}


