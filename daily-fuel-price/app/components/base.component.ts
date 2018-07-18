import { BusyIndicatorService } from "~/core";

export class BaseComponent {
    constructor(protected busyIndicatorService: BusyIndicatorService) {
        this.busyIndicatorService.loading();
    }

    getIcon(icon) {
        return String.fromCharCode(icon);
    }
}