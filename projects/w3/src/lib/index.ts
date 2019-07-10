import { InjectionToken } from "@angular/core";

export * from "./responses/responses.model";
export * from "./services/abstract-request.service";

export const skipAuthorization = { headers: { skipAuthorization: "1" } };
export const skipToast = { headers: { skipToast: "1" } };
export const skipToastAndAuthorization = {
  headers: { skipToast: "1", skipAuthorization: "1" }
};

export const W3Variables = {
  /**
   * MASKS
   *
   * chamar TextMaskModule no módulo a ser usado
   * exemplo: [textMask]="{mask: mask.tel}"
   * orgem: https://github.com/text-mask/text-mask
   */
  mask: {
    tel: [
      "(",
      /[1-9]/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ],
    cep: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]
  }
};

export const W3ConfigToast = {
  closeButton: true,
  timeOut: 5500,
  enableHtml: true,
  positionClass: "toast-top-right"
};

// TOKENS
export const W3_MESSAGE_RESPONSE = new InjectionToken("W3_MESSAGE_RESPONSE");
