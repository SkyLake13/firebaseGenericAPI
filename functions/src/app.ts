import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as auth from './auth';

const firebase = functions.config().firebase;
admin.initializeApp(firebase);

const db = admin.firestore();
const storageBucket = admin.storage().bucket();


export const app = express();

app.use(cors({ origin: true }));
// app.use(auth.auth);

// check if app is listening
app.get('/', (req, res) => {
    res.send('firebase function with express is listening.') 
});

// add document
app.post('/:type', (req, res) => {
    let type = req.params.type;
    let data = req.body;
    console.log('data', data);
    db.collection(type).add(data).then((d) => {
        res.send('data with id ' + d.id + ' is created in data collection.');
    }).catch(err => res.status(500).send(err));
});

// update document
app.put('/:type/:id', (req, res) => {
    let id = req.params.id;
    let type = req.params.type;
    let data = req.body;

    db.collection(type).doc(id).update(data).then((d) => {
        res.send(d.writeTime);
    }).catch(err => res.status(500).send(err));
});

// delete document by type & id
app.delete('/:type/:id', (req, res) => {
    let type = req.params.type;
    let id = req.params.id;

    db.collection(type).doc(id).delete().then(d => {
        res.send(d.writeTime);
    }).catch(err => res.status(400).send(err));
});

// get document by type & id
app.get('/:type/:id', (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    
    db.collection(type).doc(id).get().then((d) => {
        let x = d.data();
        x.Id = d.id;
        x.CreateTime = d.createTime;
        x.UpdateTime = d.updateTime;
        res.send(x);
    }).catch(err => res.status(500).send(err));
});

// get collection of specified type
app.get('/:type', (req, res) => {
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
});










