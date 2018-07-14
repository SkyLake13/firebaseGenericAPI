import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FuelService } from "../core/fuel.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
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

    constructor(private fuelService: FuelService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.fuelService.getCities().then((cities: Array<string>) => {
            this.cities = cities;
        }).then((err) => {
            if (err) {
                alert("err" + err);
            }
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

// tslint:disable-next-line:no-duplicate-imports
import { Pipe, PipeTransform } from "@angular/core";

// tslint:disable-next-line:max-classes-per-file
@Pipe({name: "search"})
export class SearchPipe implements PipeTransform {
  transform(items: Array<string>, search: string): Array<string> {
    if (!items) { return []; }
    if (!search) { return items; }
    search = search.toLowerCase();

    return items.filter((it) => {
        return it.toLowerCase().includes(search);
    });
  }
}
