import { Component, OnInit, OnDestroy } from "@angular/core";
import { BusyIndicatorService, AppErrorHandler, ErrorHandlerService } from "~/core";
import * as Connectivity from 'tns-core-modules/connectivity';
import { ErrorHandler } from "@angular/router/src/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit, OnDestroy {
    public isBusy: boolean;

    constructor(private busyIndicatorService: BusyIndicatorService,
    private errorHandlerService: ErrorHandlerService) {

    }

    ngOnInit() {
        this.busyIndicatorService.status().subscribe((state: boolean) => this.isBusy = state);
        // this.checkConnectivity();

        Connectivity.startMonitoring((connectionType: Connectivity.connectionType) => {
            this.checkConnectivity(connectionType);
        });

        this.errorHandlerService.catchError().subscribe(err => {
            console.log('----------Handled Error-----------');
            console.log(err);
        })
    }

    ngOnDestroy() {
        Connectivity.stopMonitoring();
    }

    checkConnectivity(connectionType: Connectivity.connectionType) {
        if(connectionType === Connectivity.connectionType.none) {
            alert('Unable to fetch data!!!');
        }
    }
 }
