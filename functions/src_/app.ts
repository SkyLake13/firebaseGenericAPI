import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as FuelController from './controllers/fuel.controller'
import * as StoreController from "./controllers/store.controller";
import { authorization } from "./auth";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void{
        this.app.use(authorization);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
        this.app.use(cors({ origin: true }));
        this.app.use('/fuel', FuelController.default);
        this.app.use('/store', StoreController.default);
    }
}

export const app = new App().app;