import { Injectable } from "@angular/core";
import { Couchbase } from 'nativescript-couchbase';

@Injectable()
export class DatabaseService {
    private database: any;

    constructor() {
        this.database = new Couchbase('fuel-db');
    }
}