import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent, SearchPipe } from "./home/home.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { SearchComponent } from "./search/search.component";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, SearchPipe];

const routes: Routes = [
    { path: "", redirectTo: "/(homeTab:home//browseTab:browse//searchTab:search)", pathMatch: "full" },

    { path: "home", component: HomeComponent, outlet: "homeTab" },
    { path: "browse", component: BrowseComponent, outlet: "browseTab" },
    { path: "search", component: SearchComponent, outlet: "searchTab" },

    { path: "home/:city", component: ItemDetailComponent, outlet: "homeTab" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
