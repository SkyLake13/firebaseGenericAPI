"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
class FuelController extends base_controller_1.BaseController {
    constructor(fuelService) {
        super('Fuel controller');
        this.fuelService = fuelService;
        this.setUp();
    }
    setUp() {
        this.router.get('/', this.get.bind(this));
        this.router.get('/cities', this.getCities.bind(this));
        this.router.get('/:names', this.getByCityNames.bind(this));
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fuels = yield this.fuelService.get();
            res.send(fuels);
        });
    }
    getCities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield this.fuelService.getCities();
            res.send(cities);
        });
    }
    getByCityNames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _cityNames = req.params.names.toLowerCase();
            const cityNames = _cityNames.split(',');
            const fuels = yield this.fuelService.getByCities(cityNames);
            res.send(fuels);
        });
    }
}
exports.default = FuelController;
//# sourceMappingURL=fuel.controller.js.map