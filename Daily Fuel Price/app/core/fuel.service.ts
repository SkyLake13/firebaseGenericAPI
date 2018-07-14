import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FuelService {
    private url: string = "https://us-central1-boreal-physics-153205.cloudfunctions.net/genericstore/fuel/";

    constructor(private http: HttpClient) { }

    getCities() {
        const url = this.url + "cities";

        return this.http.get(url).toPromise();
    }

    getPriceByCity(cityName: string) {
        const url = this.url + cityName;

        return this.http.get(url).toPromise();
    }

}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class Interceptor implements HttpInterceptor {
    headers: HttpHeaders = new HttpHeaders();

    constructor() {
        this.headers = this.headers.set("Authorization", "Bearer abhishek");
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({ headers: this.headers });

        return next.handle(request);
    }
}
