"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const app = require("./app");
//https://us-central1-boreal-physics-153205.cloudfunctions.net/genericStore
exports.genericstore = functions.https.onRequest(app.app);
//# sourceMappingURL=index.js.map