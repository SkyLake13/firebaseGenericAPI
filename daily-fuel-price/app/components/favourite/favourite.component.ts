import { Component, OnInit } from "@angular/core";
import { City, BusyIndicatorService } from "~/core";
import { FavouriteService } from "~/components/favourite/favourite.service";
import { BaseComponent } from "~/components/base.component";

@Component({
    selector: 'fav-fuel',
    moduleId: module.id,
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.css'],
    providers: [FavouriteService]
})
export class FavouriteComponent extends BaseComponent implements OnInit  {
    items: Array<City> = [];

    constructor(private favService: FavouriteService, busyIndicatorService: BusyIndicatorService) {
        super(busyIndicatorService);
     }

    ngOnInit(): void {
        this.favService.getFavourites().then(res => {
            this.items = res
            this.busyIndicatorService.loaded();
        });
    }
}