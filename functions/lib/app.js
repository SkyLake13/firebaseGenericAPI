"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const FuelController = require("./controllers/fuel.controller");
const StoreController = require("./controllers/store.controller");
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        //this.app.use(authorization);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
        this.app.use(cors({ origin: true }));
        this.app.use('/fuel', FuelController.default);
        this.app.use('/store', StoreController.default);
    }
}
exports.app = new App().app;
//# sourceMappingURL=app.js.map