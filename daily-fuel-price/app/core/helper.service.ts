import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class HelperService {
    private _shouldRefreshFavouriteComponent = new EventEmitter<boolean>();

    refreshFavouriteComponent() {
        this._shouldRefreshFavouriteComponent.emit(true);
    }

    onRefreshFavouriteComponent(): EventEmitter<boolean> {
        return this._shouldRefreshFavouriteComponent;
    }

}