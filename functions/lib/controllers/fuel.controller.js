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
const request = require("request");
const cheerio = require("cheerio");
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
        const url = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        const cities = [];
        request(url, (error, response, html) => {
            console.log("error", error);
            if (!error) {
                const $ = cheerio.load(html);
                $('#mainDiv').each((index, element) => {
                    const ele = $(element);
                    const city = ele.children('.W70').children().first().text();
                    cities.push(city);
                });
            }
            res.send(cities);
        });
    }
    getByCityNames(req, res) {
        const url = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        const _cityNames = req.params.names.toLowerCase();
        const cityNames = _cityNames.split(',');
        const jsons = [];
        let json = { city: "", price: "", change: "", date: "" };
        request(url, (error, response, html) => {
            console.log("error", error);
            if (!error) {
                const $ = cheerio.load(html);
                $('#mainDiv').each((index, element) => {
                    json = { city: "", price: "", change: "", date: "" };
                    const ele = $(element);
                    const name = ele.children('.W70').children().first().text();
                    if (cityNames.find(c => c === name.toLowerCase())) {
                        const price = ele.children('.W60').children('b').text();
                        const change = ele.children('.W60').children('span').text();
                        const date = ele.children('.W40').children('div').text().replace('\\n', '').trim();
                        json.city = name;
                        json.price = price;
                        json.change = change;
                        json.date = date;
                        jsons.push(json);
                    }
                });
            }
            res.send(jsons);
        });
    }
}
exports.default = FuelController;
// export default new FuelController().router;
//# sourceMappingURL=fuel.controller.js.map