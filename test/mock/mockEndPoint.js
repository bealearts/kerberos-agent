import express from 'express';

export default function mockEndPoint() {
    const app = express();

    app.get('/', (req, res) => res.send());

    app.get('/kerberos', (req, res) => res.send());

    return app;
}
