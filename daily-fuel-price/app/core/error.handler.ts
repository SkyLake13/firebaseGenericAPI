import { ErrorHandler, Injectable, EventEmitter, Injector } from "@angular/core";
import { ErrorHandlerService } from "~/core";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    private errorHanlderService: ErrorHandlerService;

    constructor(private injector: Injector) {
        this.errorHanlderService = this.injector.get(ErrorHandlerService);
    }

    handleError(error: any): void {
        this.errorHanlderService.handle(error);
    }

}