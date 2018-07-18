import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FuelService, Interceptor } from "./fuel.service";
import { TextboxComponent } from "~/core/components/text-box/text-box.component";

@NgModule({
    imports: [HttpClientModule],
    declarations: [TextboxComponent],
    providers: [
        FuelService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ],
    exports: [HttpClientModule]
})
export class CoreModule { }
