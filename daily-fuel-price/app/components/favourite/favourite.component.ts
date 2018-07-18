import { Component, OnInit } from "@angular/core";
import { City, BusyIndicatorService, AppSettings } from "~/core";
import { FavouriteService } from "~/components/favourite/favourite.service";
import { BaseComponent } from "~/components/base.component";
import { Router, NavigationEnd } from "@angular/router";
import { HelperService } from "~/core/helper.service";

@Component({
    selector: 'fav-fuel',
    moduleId: module.id,
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.css'],
    providers: [FavouriteService]
})
export class FavouriteComponent extends BaseComponent implements OnInit  {
    items: Array<City> = [];
    private shouldRefresh = false;

    constructor(private favService: FavouriteService, busyIndicatorService: BusyIndicatorService,
    private settings: AppSettings, private router: Router,
    private helperService: HelperService) {
        super(busyIndicatorService);
        this.helperService.onRefreshFavouriteComponent().subscribe(() => {
            this.shouldRefresh = true;
        });
     }

    ngOnInit(): void {
        this.router.events.subscribe(event => { 
            if(event instanceof NavigationEnd && this.shouldRefresh) {
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
            this.shouldRefresh = false;
        });
    }

    removeFavourite(city: string) {
        this.favService.removeFavourite(city);
        this.items = this.items.filter(c => c['city'] !== city);
    }
}