import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { FuelService } from "~/core/fuel.service";

@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: any;

    constructor(private fuelService: FuelService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const city: string = this.route.snapshot.params.city;
        this.fuelService.getPriceByCity(city).then(data => {
            this.item = data[0];
        });
    }
}
