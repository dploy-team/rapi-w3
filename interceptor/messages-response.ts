export interface MessagesResponse {

    respondOffline(): void;

    respondOk(data: any): void;

    respondNotFound(data: any): void;

    respondValidation(data: any): void;

    respondPermissionRequired(data): void;

    respondUnauthorized(data): void;

    respondInternalError(error): void;

    respondError(error): void;
}

