import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FuelService, BusyIndicatorService } from "~/core";
import { City } from "~/core";
import { BaseComponent } from "~/components/base.component";

@Component({
    selector: "city-fuel-details",
    moduleId: module.id,
    templateUrl: "./city-fuel-detail.component.html",
})
export class CityFuelDetailComponent extends BaseComponent implements OnInit {
    city: City;
    
    constructor(
        private fuelService: FuelService,
        private route: ActivatedRoute,
        busyIndicatorService: BusyIndicatorService
    ) {
        super(busyIndicatorService)
     }

    ngOnInit(): void {
        const city = this.route.snapshot.params["city"];
        this.fuelService.getPriceByCity(city).then((city: City[]) => {
            this.city = city[0];
            this.busyIndicatorService.loaded();
        });
    }
}
