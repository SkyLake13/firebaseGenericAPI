"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const cheerio = require("cheerio");
const base_controller_1 = require("./base.controller");
class FuelController extends base_controller_1.BaseController {
    constructor() {
        super('Fuel controller');
        this.setUp();
    }
    setUp() {
        this.router.get('/', this.get);
        this.router.get('/cities', this.getCities);
        this.router.get('/:names', this.getByCityNames);
    }
    get(req, res) {
        let url = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        let jsons = [];
        let json = { city: "", price: "", change: "", date: "" };
        request(url, (error, response, html) => {
            console.log("error", error);
            if (!error) {
                let $ = cheerio.load(html);
                $('#mainDiv').each((index, element) => {
                    json = { city: "", price: "", change: "", date: "" };
                    let ele = $(element);
                    let name = ele.children('.W70').children().first().text();
                    let price = ele.children('.W60').children('b').text();
                    let change = ele.children('.W60').children('span').text();
                    let date = ele.children('.W40').children('div').text().replace('\\n', '').trim();
                    json.city = name;
                    json.price = price;
                    json.change = change;
                    json.date = date;
                    jsons.push(json);
                });
            }
            res.send(jsons);
        });
    }
    getCities(req, res) {
        let url = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        let cities = [];
        request(url, (error, response, html) => {
            console.log("error", error);
            if (!error) {
                let $ = cheerio.load(html);
                $('#mainDiv').each((index, element) => {
                    let ele = $(element);
                    let city = ele.children('.W70').children().first().text();
                    cities.push(city);
                });
            }
            res.send(cities);
        });
    }
    getByCityNames(req, res) {
        let url = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        let _cityNames = req.params.names.toLowerCase();
        let cityNames = _cityNames.split(',');
        let jsons = [];
        let json = { city: "", price: "", change: "", date: "" };
        request(url, (error, response, html) => {
            console.log("error", error);
            if (!error) {
                let $ = cheerio.load(html);
                $('#mainDiv').each((index, element) => {
                    json = { city: "", price: "", change: "", date: "" };
                    let ele = $(element);
                    let name = ele.children('.W70').children().first().text();
                    if (cityNames.find(c => c === name.toLowerCase())) {
                        let price = ele.children('.W60').children('b').text();
                        let change = ele.children('.W60').children('span').text();
                        let date = ele.children('.W40').children('div').text().replace('\\n', '').trim();
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
exports.default = new FuelController().router;
//# sourceMappingURL=fuel.controller.js.map