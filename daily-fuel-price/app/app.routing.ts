import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from "~/components/home/home.component";
import { SearchFIlterPipe } from "~/pipes/search-filter.pipe";
import { CityFuelDetailComponent } from "~/components/details/city-fuel-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/cities", pathMatch: "full" },
    { path: "cities", component: HomeComponent },
    { path: "cities/:city", component: CityFuelDetailComponent },
];

export const AppRouting = NativeScriptRouterModule.forRoot(routes);

export const COMPONENTS = [
    HomeComponent, CityFuelDetailComponent, SearchFIlterPipe
]