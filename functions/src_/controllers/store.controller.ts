import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Router, Request, Response } from 'express';
import { BaseController } from './base.controller';

function instantiateDbObject() {
    const firebase = functions.config().firebase;
    admin.initializeApp(firebase);
    return admin.firestore();
}

class StoreController extends BaseController {
    private db: FirebaseFirestore.Firestore;

    constructor() {
        super('Store controller');
        this.setUp();
    }

    private setUp() {
        this.router.get('/:type', this.getAllByType);
        this.router.get('/:type/:id', this.getByTypeId);
        this.router.post('/:type', this.post);
        this.router.put('/:type/:id', this.put);
        this.router.delete('/:type/:id', this.delete);
    }

    private getAllByType(req: Request, res: Response) {
        let db = instantiateDbObject();

        let type = req.params.type;

        db.collection(type).get().then((d) => {
            let xyz = [];
            d.forEach(a => { 
                let b = a.data();
                b.Id = a.id;
                b.CreateTime = a.createTime;
                b.UpdateTime = a.updateTime;
                xyz.push(b)
            });
            res.send(xyz);
        }).catch(err => res.status(500).send(err));
    }

    private getByTypeId(req: Request, res: Response) {
        let db = instantiateDbObject();

        let type = req.params.type;
        let id = req.params.id;
        
        db.collection(type).doc(id).get().then((d) => {
            let x = d.data();
            x.Id = d.id;
            x.CreateTime = d.createTime;
            x.UpdateTime = d.updateTime;
            res.send(x);
        }).catch(err => res.status(500).send(err));
    }

    private post(req: Request, res: Response) {
        let db = instantiateDbObject();

        let type = req.params.type;
        let data = req.body;

        db.collection(type).add(data).then((d) => {
            res.send('data with id ' + d.id + ' is created in data collection.');
        }).catch(err => res.status(500).send(err));
    }

    private put(req: Request, res: Response) {
        let db = instantiateDbObject();

        let id = req.params.id;
        let type = req.params.type;
        let data = req.body;

        db.collection(type).doc(id).update(data).then((d) => {
            res.send(d.writeTime);
        }).catch(err => res.status(500).send(err));
    }

    private delete(req: Request, res: Response) {
        let db = instantiateDbObject();

        let type = req.params.type;
        let id = req.params.id;
    
        db.collection(type).doc(id).delete().then(d => {
            res.send(d.writeTime);
        }).catch(err => res.status(400).send(err));
    }
}

export default new StoreController().router;