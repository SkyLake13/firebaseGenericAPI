import { Router, Request, Response } from 'express';

export class BaseController {
    protected controllerName: string;
    public router: Router;

    constructor(controllerName: string) {
        this.controllerName = controllerName;
        this.router = Router();
        this.setUp();
    }

    protected setUp() {
        this.router.get('/help/help', this.listening.bind(this));
        console.log('base setup is called.', this.controllerName);
    }

    private listening(req: Request, res: Response) {
        res.send(this ? this.controllerName : 'Base controller' + ' is listening.');
    }
}