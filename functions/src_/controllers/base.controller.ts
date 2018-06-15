import { Router, Request, Response } from 'express';

export class BaseController {
    protected controllerName: string;
    public router: Router = Router();

    constructor(controllerName: string) {
        this.controllerName = controllerName;
        // this._setUp();
    }

    private _setUp() {
        this.router.get('/', this.listening);
    }

    private listening(req: Request, res: Response) {
        res.send(this ? this.controllerName : 'Base controller' + ' is listening.');
    }
}