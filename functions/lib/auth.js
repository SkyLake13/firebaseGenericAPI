"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authorization(req, res, next) {
    console.log('auth reached');
    console.log('header', req.headers);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const token = req.headers.authorization.split('Bearer ')[1];
    if (token && token === 'abhishek') {
        return next();
    }
    res.status(403).send('Unauthorized');
    return;
}
exports.authorization = authorization;
//# sourceMappingURL=auth.js.map