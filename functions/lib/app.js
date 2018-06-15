"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cheerio = require("cheerio");
const request = require("request");
const firebase = functions.config().firebase;
admin.initializeApp(firebase);
const db = admin.firestore();
const storageBucket = admin.storage().bucket();
exports.app = express();
exports.app.use(cors({ origin: true }));
// app.use(auth.auth);
// check if app is listening
exports.app.get('/', (req, res) => {
    res.send('firebase function with express is listening.');
});
exports.app.get('/scrap/:url', (req, res) => {
    let url = 'https://' + req.params.url;
    let jsons = [];
    let json = { city: "", price: "", change: "" };
    request(url, (error, response, html) => {
        console.log("error", error);
        if (!error) {
            let $ = cheerio.load(html);
            $('#mainDiv').each((index, element) => {
                json = { city: "", price: "", change: "" };
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
exports.app.post('/:type', (req, res) => {
    let type = req.params.type;
    let data = req.body;
    console.log('data', data);
    db.collection(type).add(data).then((d) => {
        res.send('data with id ' + d.id + ' is created in data collection.');
    }).catch(err => res.status(500).send(err));
});
// update document
exports.app.put('/:type/:id', (req, res) => {
    let id = req.params.id;
    let type = req.params.type;
    let data = req.body;
    db.collection(type).doc(id).update(data).then((d) => {
        res.send(d.writeTime);
    }).catch(err => res.status(500).send(err));
});
// delete document by type & id
exports.app.delete('/:type/:id', (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    db.collection(type).doc(id).delete().then(d => {
        res.send(d.writeTime);
    }).catch(err => res.status(400).send(err));
});
// get document by type & id
exports.app.get('/:type/:id', (req, res) => {
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
exports.app.get('/:type', (req, res) => {
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
});
//# sourceMappingURL=app.js.map