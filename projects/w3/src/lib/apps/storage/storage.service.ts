import { Injectable } from "@angular/core";
import { W3StorageOption } from "./models";
import { isObject, isString } from "util";

/**
 * Service de Storage do W3
 * As configurações de storage podem ser alteradas no método `forRoot()` e.g
 *
 *
 *                                               const customConfig: W3Config{
 *                                                  storage: {
 *                                                      drive: 'STORAGE',
 *                                                      prefix: 'adm'
 *                                                  }
 *                                               }
 *
 *
 *                                               {W3Module.forRoot(customConfig)}
 */
@Injectable()
export class W3StorageService {
  private drive: Storage;

  constructor(private options: W3StorageOption) {
    console.log("W3StorageService.options->", options);
    this.drive =
      this.options.drive === "SESSION" ? sessionStorage : localStorage;
  }

  /**
   * retorna a chave com o prefixo
   * @param k
   */
  private key(k): string {
    return `${this.options.prefix}_${k}`.toLowerCase();
  }

  /**
   * Recupera o valor através da chave
   * @param key
   * @param def
   */
  get(key: string, def: any = null): any {
    let value = this.drive.getItem(this.key(key)) || def;

    if (value && isString(value) && value.indexOf("json:") === 0) {
      value = JSON.parse(value.substr(5));
    }

    return value;
  }

  /**
   * Seta um novo valor
   * @param key
   * @param value
   */
  set(key: string, value: any): any {
    if (isObject(value)) {
      value = "json:" + JSON.stringify(value);
    }

    return this.drive.setItem(this.key(key), value);
  }

  /**
   * Excluir o valor
   */
  remove(key: string): void {
    this.drive.removeItem(this.key(key));
  }
}
