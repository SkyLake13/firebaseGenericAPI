import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRouting, COMPONENTS } from "./app.routing";
import { AppComponent } from "./app.component";

import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CoreModule } from "~/core";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule, // <--- this is important 
        AppRouting,
        CoreModule
    ],
    declarations: [
        AppComponent,
        ...COMPONENTS
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    bootstrap: [
        AppComponent
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
