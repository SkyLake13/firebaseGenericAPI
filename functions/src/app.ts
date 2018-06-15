import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as cheerio from 'cheerio';
import * as request from 'request';

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

app.get('/scrap/:url', (req, res) => {
    let url = 'https://' + req.params.url;
    let jsons = [];
    let json = { city : "", price : "", change : ""};

    request(url, (error, response, html) => {
        console.log("error", error);
        if(!error) {    
                let $ = cheerio.load(html);
                $('#mainDiv').each((index, element) => {
                    json =  { city : "", price : "", change : ""};
                    let ele = $(element);
                    let name = ele.children('.W70').children().first().text();
                    let price = ele.children('.W60').children('b').text();
                    let change = ele.children('.W60').children('span').text();
                    json.city = name;
                    json.price = price;
                    json.change = change;
                    jsons.push(json);
                });
            }
            res.send(jsons);
        });

    
    
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









