
express = require( 'express');
NodeSSPI = require ( 'node-sspi');

const sspi = new NodeSSPI({
    sspiPackagesUsed: ['Negotiate']
});

endPoint = function mockEndPoint() {
    const app = express();

    app.get('/', (req, res) => res.send('Hi'));

    app.get('/kerberos', auth, (req, res) => res.send(req.connection.user));

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


endPoint().listen(8765, 'localhost', () => {
	console.log('Listening...');
});

