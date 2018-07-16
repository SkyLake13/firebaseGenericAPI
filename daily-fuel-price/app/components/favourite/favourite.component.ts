import { Component, OnInit } from "@angular/core";
import { City, BusyIndicatorService, AppSettings } from "~/core";
import { FavouriteService } from "~/components/favourite/favourite.service";
import { BaseComponent } from "~/components/base.component";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: 'fav-fuel',
    moduleId: module.id,
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.css'],
    providers: [FavouriteService]
})
export class FavouriteComponent extends BaseComponent implements OnInit  {
    items: Array<City> = [];

    constructor(private favService: FavouriteService, busyIndicatorService: BusyIndicatorService,
    private settings: AppSettings, private router: Router) {
        super(busyIndicatorService);
     }

    ngOnInit(): void {
        this.router.events.subscribe(event => { 
            if(event instanceof NavigationEnd) {
                this.busyIndicatorService.loading();
                this.init();
            }
        });

        this.init();
    }

    init() {
        this.favService.getFavourites().then(res => {
            this.items = res;
            this.busyIndicatorService.loaded();
        });
    }

    removeFavourite(city: string) {
        this.favService.removeFavourite(city);
        this.items = this.items.filter(c => c['city'] !== city);
    }
}