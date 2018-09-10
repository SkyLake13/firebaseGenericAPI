"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseController {
    constructor(controllerName) {
        this.controllerName = controllerName;
        this.router = express_1.Router();
        this.setUp();
    }
    setUp() {
        this.router.get('/help/help', this.listening.bind(this));
        console.log('base setup is called.', this.controllerName);
    }
    listening(req, res) {
        res.send(this ? this.controllerName : 'Base controller' + ' is listening.');
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map