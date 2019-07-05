import { HttpHeaders, HttpResponseBase } from "@angular/common/http";
import { Response40x } from "./responses.model";

export class MyHttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = "HttpErrorResponse";
  readonly message: string;
  readonly messageHttp: string;
  readonly error: any | null;
  readonly response: Response40x | null;
  readonly data: object | null;
  readonly code: string | null;
  readonly validation: { [key: string]: string[] };

  /**
   * Errors are never okay, even when the status code is in the 2xx success range.
   */
  readonly ok = false;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }) {
    // Initialize with a default status of 0 / Unknown Error.
    super(init, 0, "Unknown Error");

    // If the response was successful, then this was a parse error. Otherwise, it was
    // a protocol-level failure of some sort. Either the request failed in transit
    // or the server returned an unsuccessful status code.
    if (this.status >= 200 && this.status < 300) {
      this.messageHttp = `Http failure during parsing for ${init.url ||
        "(unknown url)"}`;
    } else {
      this.messageHttp = `Http failure response for ${init.url ||
        "(unknown url)"}: ${init.status} ${init.statusText}`;
    }

    this.error = init.error || null;

    this.response = init.error;

    if (this.response) {
      this.data = this.response.data;

      if (this.response.error) {
        this.code = this.response.error.code;
        this.message = this.response.message;
        this.validation = this.response.error.validation;
      } else {
        this.code = this.response.status;
        this.message = this.messageHttp;
      }
    }
  }

  getAllValidations(): string[] {
    if (!this.validation) {
      return [];
    }

    return Object.getOwnPropertyNames(this.validation).reduce(
      (map: any, key: string) => {
        return map.concat(this.validation[key]);
      },
      []
    );
  }

  getFirstValidation(): string {
    return this.getAllValidations()[0] || "";
  }

  getListValidations(): string {
    return this.getAllValidations().join(". ");
  }
}
