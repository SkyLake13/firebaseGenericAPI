import * as cheerio from 'cheerio';
import * as got from 'got';
import Fuel from '../models/fuel.model';

export default class FuelService {
    private readonly url: string = 'https://www.mypetrolprice.com/petrol-price-in-india.aspx';

    // tslint:disable-next-line:no-empty
    constructor() { }

    public async get(): Promise<Array<Fuel>> {
        const response = await got(this.url);
        const fuels = FuelService.adapt(response.body);

        return fuels;
    }

    public static adapt(html: string): Array<Fuel> {
        const fuels: Array<Fuel> = [];

        const $ = cheerio.load(html);
        $('#mainDiv').each((index, element) => {
            const ele = $(element);
            const name = ele.children('.W70').children().first().text();
            const price = ele.children('.W60').children('b').text();
            const change = ele.children('.W60').children('span').text();
            const date = ele.children('.W40').children('div').text().replace('\\n', '').trim();

            const fuel = new Fuel(name, price, date, change);
            fuels.push(fuel);
        });

        return fuels;
    }
}