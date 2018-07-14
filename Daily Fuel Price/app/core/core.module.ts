import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FuelService, Interceptor } from "~/core/fuel.service";
import { DataService } from "./data.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        DataService, FuelService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
})
export class CoreModule { }
