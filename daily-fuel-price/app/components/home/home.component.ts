import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FuelService, BusyIndicatorService, AppSettings } from "~/core";
import { BaseComponent } from "~/components/base.component";
import { FavouriteService } from "~/components/favourite/favourite.service";


@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [FuelService, FavouriteService]
})
export class HomeComponent extends BaseComponent implements OnInit {
    private _cities: Array<string> 

    get cities(): Array<string> {
        this._cities = this.settings.getCities();
        return this._cities;
    }

    set cities(value: Array<string>) {
        this.settings.setCities(value);
        this._cities = value;
    }

    searchText: string;

    constructor(private fuelService: FuelService, 
        busyIndicatorService: BusyIndicatorService,
        private settings: AppSettings, private favService: FavouriteService) { 
            super(busyIndicatorService);
        }

    ngOnInit(): void {
        if(this.cities === undefined || this.cities.length === 0) {
            this.fuelService.getCities().then((cities: Array<string>) => {
                this.cities = cities;
                this.busyIndicatorService.loaded();
            });
        }
        else {
            this.busyIndicatorService.loaded();
        }
    }

    onTextChanged(args) {
        const searchBar = args.object;
        this.searchText = searchBar.text;
    }

    addAsfavourite(city: string) {
        console.log(city);
        this.favService.setFavourite(city);
    }
}

