import { NgModule } from "@angular/core";
import { DataService } from "./data.service";
import { FuelService, Interceptor } from "~/core/fuel.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        DataService, FuelService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor }
    ]
})
export class CoreModule { }
