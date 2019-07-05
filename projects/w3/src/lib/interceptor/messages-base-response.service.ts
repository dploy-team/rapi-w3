import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";

/**
 * https://github.com/scttcper/ngx-toastr
 */

/**
 * Classe Abstrata para mensagens do toast
 */
export abstract class W3MessagesBaseResponseService {
  protected constructor(protected _toast: ToastrService) {}

  respondOffline(): void {
    this._toast.warning("Sem conexão com a internet!");
  }

  respondOk(data): void {
    if (!data.message) {
      return;
    }

    switch (data.status) {
      case "success":
        this._toast.success(data.message);
        break;
      case "error":
        this._toast.error(data.message);
        break;
      default:
        this._toast.info(data.message);
    }
  }

  respondNotFound(data): void {
    if (data.status === "error" && data.message) {
      this._toast.error(data.message);
    }
  }

  respondValidation(data): void {
    if (!data.error) {
      return;
    }

    let error = "";

    if (data.error.validation) {
      error = "<ul>";

      _.forEach(data.error.validation, (msg: string) => {
        error += "<li>" + msg + "</li>";
      });

      error += "</ul>";
    }

    this._toast.error(error, data.message);
  }

  /**
   * // Usuario não possui essa permissão CAM/ROLE
   * @param data
   */
  respondPermissionRequired(data): void {
    const msg =
      data.error && data.message
        ? data.message
        : "Seu usuário não possui acesso!";

    this._toast.warning(msg);
  }

  respondUnauthorized(data): void {
    const msg =
      data.error && data.message ? data.message : "Favor efetuar login!";

    this._toast.info(msg);
  }

  respondError(data): void {
    if (data.error && data.message) {
      this._toast.error(data.message);
    } else {
      this.respondInternalError(data);
    }
  }

  respondInternalError(error): void {
    this._toast.error("Falha ao se comunicar com o servidor!");
  }
}
