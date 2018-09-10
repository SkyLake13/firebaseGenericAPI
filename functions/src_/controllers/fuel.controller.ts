import { Request, Response } from 'express';
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

    private async getCities(req: Request, res: Response) {
        const cities = await this.fuelService.getCities();

        res.send(cities);
    }

    private async getByCityNames(req: Request, res: Response) {
        const _cityNames = req.params.names.toLowerCase();
        const cityNames: Array<string> = _cityNames.split(',');
        
        const fuels = await this.fuelService.getByCities(cityNames);

        res.send(fuels);
    }
}