export default class Fuel {
    city: string;
    name: string;
    price: string;
    date: string;
    change: string;

    constructor(name: string, price: string, date: string, change: string) {
        this.city = this.name = name;
        this.price = price;
        this.date = date;
        this.change = change;
    }
}