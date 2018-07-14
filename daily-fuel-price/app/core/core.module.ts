import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FuelService, Interceptor } from "./fuel.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        FuelService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ],
    exports: [HttpClientModule]
})
export class CoreModule { }
