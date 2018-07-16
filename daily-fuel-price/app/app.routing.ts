import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { CitiesComponent } from "~/components/cities/cities.component";
import { SearchFilterPipe } from "~/pipes/search-filter.pipe";
import { CityFuelDetailComponent } from "~/components/details/city-fuel-detail.component";
import { FavouriteComponent } from "~/components/favourite/favourite.component";

const routes: Routes = [
    { path: "", redirectTo: "/favs", pathMatch: "full" },
    { path: "favs", component: FavouriteComponent },
    { path: "cities", component: CitiesComponent },
    // { path: "cities/:city", component: CityFuelDetailComponent },
];

export const AppRouting = NativeScriptRouterModule.forRoot(routes);

export const COMPONENTS = [
    CitiesComponent, CityFuelDetailComponent, SearchFilterPipe, FavouriteComponent
]