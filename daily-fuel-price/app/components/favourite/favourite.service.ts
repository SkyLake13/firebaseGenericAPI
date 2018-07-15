import { Injectable } from "@angular/core";
import { City, FuelService } from "~/core";

@Injectable()
export class FavouriteService {
    private favouriteCities: Array<string> = ['Pune', 'Mumbai']
    private favourites: Array<City>;

    constructor(private fuelService: FuelService) {}

    getFavourites(): Promise<Array<City>> {
        return this.fuelService.getPriceByCity(this.favouriteCities.join(','));
    }
}