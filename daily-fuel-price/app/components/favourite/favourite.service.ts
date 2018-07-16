import { Injectable } from "@angular/core";
import { City, FuelService, AppSettings } from "~/core";
import { of } from "rxjs";

@Injectable()
export class FavouriteService {
    constructor(private fuelService: FuelService, private settings: AppSettings) {}

    getFavourites(): Promise<Array<City>> {
        const favs = this.settings.getFavourites();
        if(favs) {
            return this.fuelService.getPriceByCity(favs.join(','));
        }
        return of([]).toPromise(); 
    }

    setFavourite(cityName: string) {
        const favs = this.settings.getFavourites();
        console.log('favs - ', favs);
        if(favs) {
            favs.push(cityName);
            this.settings.setFavourites(favs);
        }
        else {
            const fav = [];
            fav.push(cityName);
            this.settings.setFavourites(fav);
        }
    }

    removeFavourite(cityName: string): boolean {
        const favs = this.settings.getFavourites();
        const index = favs.findIndex(city => city === cityName);
        if(index > -1) {
            favs.splice(index, 1);
            this.settings.setFavourites(favs);
            return true;
        }
        return false;
    }
}