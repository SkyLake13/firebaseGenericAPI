import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import FuelController from './controllers/fuel.controller'
import StoreController from "./controllers/store.controller";
import { authorization } from "./auth";
import StoreService from "./services/store.service";
import FuelService from "./services/fuel.service";

class App {
    public express: express.Application;
    private storeService: StoreService;
    private fuelService: FuelService;

    constructor() {
        this.express = express();
        this.middleWares();
        this.serviceFactory();
        this.routes();
    }

    private middleWares(): void {
        //this.express.use(authorization);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.express.use(express.static('public'));
        this.express.use(cors({ origin: true }));   
    }

    private routes(): void {
        this.express.use('/fuel', new FuelController(this.fuelService).router);
        this.express.use('/store', new StoreController(this.storeService).router);
    }

    private serviceFactory() {
        this.storeService = new StoreService();
        this.fuelService = new FuelService(this.storeService);
    }
}

export const app = new App().express;