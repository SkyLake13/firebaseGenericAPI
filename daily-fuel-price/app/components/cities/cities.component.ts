import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FuelService, BusyIndicatorService, AppSettings, ToastMessageService } from "~/core";
import { BaseComponent } from "~/components/base.component";
import { FavouriteService } from "~/components/favourite/favourite.service";
import { HelperService } from "~/core/helper.service";


@Component({
    selector: "cities",
    moduleId: module.id,
    templateUrl: "./cities.component.html",
    providers: [FuelService, FavouriteService]
})
export class CitiesComponent extends BaseComponent implements OnInit {
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
        private settings: AppSettings, private favService: FavouriteService,
        private toastService: ToastMessageService,
        private router: RouterExtensions,
        private helperService: HelperService) { 
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
        this.favService.setFavourite(city);
        this._cities = this.settings.getCities();
        this.helperService.refreshFavouriteComponent();
        this.toastService.showMessage(city + ' is added to favourites.');
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
