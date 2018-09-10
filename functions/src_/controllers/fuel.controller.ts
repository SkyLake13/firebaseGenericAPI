import { Router, Request, Response } from 'express';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { BaseController } from './base.controller';
import FuelService from '../services/fuel.service';

export default class FuelController extends BaseController {
    
    constructor(private fuelService: FuelService) {
        super('Fuel controller');
        this.setUp();
    }

    protected setUp() {
        this.router.get('/', this.get.bind(this));
        this.router.get('/cities', this.getCities.bind(this));
        this.router.get('/:names', this.getByCityNames.bind(this));
    }

    private async get(req: Request, res: Response) {
        const fuels = await this.fuelService.get();

        res.send(fuels);
    }

    private getCities(req: Request, res: Response) {
        const url: string = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        
        const cities = [];

        request(url, (error, response, html) => {
            console.log("error", error);
            if(!error) {    
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

    private getByCityNames(req: Request, res: Response) {
        const url: string = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';
        const _cityNames = req.params.names.toLowerCase();
        const cityNames: Array<string> = _cityNames.split(',');
        
        const jsons = [];
        let json = { city : "", price : "", change : "", date: ""};

        request(url, (error, response, html) => {
            console.log("error", error);
            if(!error) {    
                    const $ = cheerio.load(html);
                    $('#mainDiv').each((index, element) => {
                        json =  { city : "", price : "", change : "", date: ""};
                        const ele = $(element);
                        const name = ele.children('.W70').children().first().text();

                        if(cityNames.find(c => c === name.toLowerCase())) {
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

// export default new FuelController().router;