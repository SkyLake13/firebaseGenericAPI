import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FuelService, BusyIndicatorService } from "~/core";


@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [FuelService]
})
export class HomeComponent implements OnInit {
    _cities: Array<string>;

    get cities(): Array<string> {
        return this._cities;
    }

    set cities(value: Array<string>) {
        this._cities = value;
        this.filteredCities = value;
    }

    filteredCities: Array<string>;
    searchText: string;

    constructor(private fuelService: FuelService, 
        private router: RouterExtensions, private busyIndicatorService: BusyIndicatorService) { }

    ngOnInit(): void {
        this.busyIndicatorService.loading();
        this.fuelService.getCities().then((cities: Array<string>) => {
            this.cities = cities;
            this.busyIndicatorService.loaded();
        });
    }

    onTextChanged(args) {
        const searchBar = args.object;
        this.searchText = searchBar.text;
    }

    onItemTap(event) {
        console.log(event);
    }
}

