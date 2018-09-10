import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Item from '../models/base.model';

export default class StoreService {
    public database: FirebaseFirestore.Firestore;
    constructor() {
        this.database = this.initDbObject();
     }

    private initDbObject() {
        const firebase = functions.config().firebase;
        admin.initializeApp(firebase);
        return admin.firestore();
    }

    public async get(type: string): Promise<Array<Item>> {
        const items: Array<Item> = [];

        const result: FirebaseFirestore.QuerySnapshot = await this.database.collection(type).get();
        
        result.forEach(res => {
            const item = new Item(res.id, res.createTime, res.updateTime, res.data());
            items.push(item);
        });

        return items;
    }

    public async getById(type: string, id: string): Promise<Item> {
        const res: FirebaseFirestore.DocumentSnapshot = await this.database.collection(type)
                    .doc(id).get();

        const item: Item = new Item(res.id, res.createTime, res.updateTime, res.data());

        return item;
    }

    public async add(type: string, data: any): Promise<string> {
        const res: FirebaseFirestore.DocumentReference = await this.database.collection(type)
                    .add(data);

        return res.id;
    }

    public async update(type: string, id: string, data: any): Promise<string> {
        const res: FirebaseFirestore.WriteResult = await this.database.collection(type)
                    .doc(id).update(data);

        return res.writeTime;
    }

    public async delete(type: string, id: string): Promise<string> {
        const res: FirebaseFirestore.WriteResult = await this.database.collection(type)
                    .doc(id).delete();

        return res.writeTime;
    }
}