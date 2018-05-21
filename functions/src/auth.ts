export function auth(req, res, next) {
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }

    const token = req.headers.authorization.split('Bearer ')[1];

    if(token) {
        return next();
    }
    return;
} 