"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const base_controller_1 = require("./base.controller");
function instantiateDbObject() {
    const firebase = functions.config().firebase;
    admin.initializeApp(firebase);
    return admin.firestore();
}
class StoreController extends base_controller_1.BaseController {
    constructor() {
        super('Store controller');
        this.setUp();
    }
    setUp() {
        this.router.get('/:type', this.getAllByType);
        this.router.get('/:type/:id', this.getByTypeId);
        this.router.post('/:type', this.post);
        this.router.put('/:type/:id', this.put);
        this.router.delete('/:type/:id', this.delete);
    }
    getAllByType(req, res) {
        let db = instantiateDbObject();
        let type = req.params.type;
        db.collection(type).get().then((d) => {
            let xyz = [];
            d.forEach(a => {
                let b = a.data();
                b.Id = a.id;
                b.CreateTime = a.createTime;
                b.UpdateTime = a.updateTime;
                xyz.push(b);
            });
            res.send(xyz);
        }).catch(err => res.status(500).send(err));
    }
    getByTypeId(req, res) {
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
    post(req, res) {
        let db = instantiateDbObject();
        let type = req.params.type;
        let data = req.body;
        db.collection(type).add(data).then((d) => {
            res.send('data with id ' + d.id + ' is created in data collection.');
        }).catch(err => res.status(500).send(err));
    }
    put(req, res) {
        let db = instantiateDbObject();
        let id = req.params.id;
        let type = req.params.type;
        let data = req.body;
        db.collection(type).doc(id).update(data).then((d) => {
            res.send(d.writeTime);
        }).catch(err => res.status(500).send(err));
    }
    delete(req, res) {
        let db = instantiateDbObject();
        let type = req.params.type;
        let id = req.params.id;
        db.collection(type).doc(id).delete().then(d => {
            res.send(d.writeTime);
        }).catch(err => res.status(400).send(err));
    }
}
exports.default = new StoreController().router;
//# sourceMappingURL=store.controller.js.map