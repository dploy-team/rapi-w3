import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class NotificationService {
    constructor(private http: HttpClient) {}

    search(params): Observable<any> {
        return this.http
            .get(`${environment.URL_API}/me/notifications`, params)
            .pipe(map((data: any) => data.data));
    }

    markAllAsRead(): Observable<any> {
        return this.http
            .put(`${environment.URL_API}/me/notifications/read`, null)
            .pipe(map((data: any) => data.data));
    }
}
