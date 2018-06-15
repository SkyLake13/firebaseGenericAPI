"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseController {
    constructor(controllerName) {
        this.router = express_1.Router();
        this.controllerName = controllerName;
        // this._setUp();
    }
    _setUp() {
        this.router.get('/', this.listening);
    }
    listening(req, res) {
        res.send(this ? this.controllerName : 'Base controller' + ' is listening.');
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map