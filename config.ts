// export class W3Config {
//
//
//   public mask = {
//     tel: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
//     cep: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
//   };
// }


import {w3StorageByLocalStorage, W3StorageOption} from './apps/storage';

export const W3Variables = {

    /**
     * MASKS
     *
     * chamar TextMaskModule no módulo a ser usado
     * exemplo: [textMask]="{mask: mask.tel}"
     * orgem: https://github.com/text-mask/text-mask
     */
    mask: {
        tel: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cep: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
};

export const W3ConfigToast = {
    closeButton: true,
    timeOut: 5500,
    enableHtml: true,
    positionClass: 'toast-top-right'
};

export interface W3Config {
    storage: W3StorageOption;
}

export const w3ConfigDefault: W3Config = {
    storage: w3StorageByLocalStorage
};
