import express from 'express';
import NodeSSPI from 'node-sspi';

const sspi = new NodeSSPI({
    sspiPackagesUsed: ['Negotiate']
});

export default function mockEndPoint() {
    const app = express();

    app.get('/', (req, res) => res.send());

    app.get('/kerberos', auth, (req, res) => res.send());

    return app;
}


function auth(req, res, next) {
    sspi.authenticate(req, res, (err) => {
        if (err) {
            throw new Error(err);
        }
        if (!res.finished) {
            next();
        }
    });
}
