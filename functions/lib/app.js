"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fuel_controller_1 = require("./controllers/fuel.controller");
const store_controller_1 = require("./controllers/store.controller");
// import { authorization } from "./auth";
const store_service_1 = require("./services/store.service");
const fuel_service_1 = require("./services/fuel.service");
class App {
    constructor() {
        this.express = express();
        this.middleWares();
        this.serviceFactory();
        this.routes();
    }
    middleWares() {
        //this.express.use(authorization);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.express.use(express.static('public'));
        this.express.use(cors({ origin: true }));
    }
    routes() {
        this.express.use('/fuel', new fuel_controller_1.default(this.fuelService).router);
        this.express.use('/store', new store_controller_1.default(this.storeService).router);
    }
    serviceFactory() {
        this.storeService = new store_service_1.default();
        this.fuelService = new fuel_service_1.default(this.storeService);
    }
}
exports.app = new App().express;
//# sourceMappingURL=app.js.map