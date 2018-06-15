import * as functions from 'firebase-functions';

import * as app from './app'

//https://us-central1-boreal-physics-153205.cloudfunctions.net/genericStore
export const genericstore = functions.https.onRequest(app.app);

