import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class BusyIndicatorService {
    private _loading: EventEmitter<boolean> = new EventEmitter<boolean>();

    // to show loading
    loading() {
        this._loading.emit(true);
    }

    // to hide loading
    loaded() {
        this._loading.emit(false);
    }

    // subscription point
    status(): EventEmitter<boolean> {
        return this._loading;
    }
}