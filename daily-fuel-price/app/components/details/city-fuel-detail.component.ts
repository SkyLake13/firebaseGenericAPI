import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FuelService } from "~/core";
import { City } from "~/core/city";

@Component({
    selector: "city-fuel-details",
    moduleId: module.id,
    templateUrl: "./city-fuel-detail.component.html",
})
export class CityFuelDetailComponent implements OnInit {
    city: City;
    
    constructor(
        private fuelService: FuelService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const city = this.route.snapshot.params["city"];
        this.fuelService.getPriceByCity(city).then((city: City[]) => {
            this.city = city[0];
        });
    }
}
