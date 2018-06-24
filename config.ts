export class W3Config{

  /* MASKS
  * chamar TextMaskModule no módulo a ser usado
  * exemplo: [textMask]="{mask: mask.tel}"
  * orgem: https://github.com/text-mask/text-mask
   */
  public mask = {
    tel : ['(', /[1-9]/, /\d/,  ')', ' ', /\d/, /\d/, /\d/,  /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    cep: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
}
