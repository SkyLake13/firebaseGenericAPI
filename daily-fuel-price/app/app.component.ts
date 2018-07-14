import { Component } from "@angular/core";
import { BusyIndicatorService } from "~/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    public isBusy: boolean;

    constructor(private busyIndicatorService: BusyIndicatorService) {

    }

    ngOnInit() {
        this.busyIndicatorService.status().subscribe((state: boolean) => this.isBusy = state);
    }
 }
