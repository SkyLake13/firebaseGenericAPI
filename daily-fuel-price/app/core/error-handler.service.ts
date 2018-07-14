import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ErrorHandlerService {
    private _error: EventEmitter<any> = new EventEmitter<any>();

    handle(error: any) {
        this._error.emit(error);
    }

    catchError(): EventEmitter<any> {
        return this._error;
    }
}