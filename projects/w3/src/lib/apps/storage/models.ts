export class W3StorageOption {
    prefix: string;
    drive: 'SESSION' | 'STORAGE';
}

export const w3StorageByLocalSession: W3StorageOption = {
    prefix: 'app',
    drive: 'SESSION'
};

export const w3StorageByLocalStorage: W3StorageOption = {
    prefix: 'app',
    drive: 'STORAGE'
};
