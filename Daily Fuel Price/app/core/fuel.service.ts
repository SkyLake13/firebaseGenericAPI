import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FuelService {
    private url: string = 'https://us-central1-boreal-physics-153205.cloudfunctions.net/genericStore/fuel/';

    constructor(private http: HttpClient) { }

    public getCities() {
        let url = this.url + 'cities';

        return this.http.get(url).toPromise();
    }

    public getPriceByCity(cityName: string) {
        let url = this.url + cityName;

        return this.http.get(url).toPromise();
    }

}

@Injectable()
export class Interceptor implements HttpInterceptor {
    headers: HttpHeaders = new HttpHeaders();

    constructor() {
        this.headers = this.headers.set('Authorization', 'Bearer abhishek');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req.clone({ headers: this.headers });

        return next.handle(request);
    }
}