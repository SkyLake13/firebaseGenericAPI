import * as settings from 'application-settings';

export class AppSettings {
    private static CITIES = 'cities';
    private static FAVOURITES = 'favs';

    setCities(cities: Array<string>) {
        cities = Array.from(new Set(cities)).sort();
        const s = cities.join(',');
        settings.setString(AppSettings.CITIES, s);
    }
    getCities(): Array<string> {
        const s = settings.getString(AppSettings.CITIES);
        if(s)
            return s.split(',');
    }

    setFavourites(cities: Array<string>) {
        const s = cities.join(',');
        settings.setString(AppSettings.FAVOURITES, s);
    }
    getFavourites(): Array<string> {
        const s = settings.getString(AppSettings.FAVOURITES);
        if(s)
            return s.split(',');
    }
}