import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FuelService } from "~/core/fuel.service";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item = {
        city: "", change: "", date: "", price: ""
    };

    constructor(private fuelService: FuelService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params) {
                const city: string = params.city;
                this.fuelService.getPriceByCity(city).then((data) => {
                    this.item = data[0];
                });
            }
        });
    }
}
