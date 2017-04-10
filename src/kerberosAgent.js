import { SSIP } from 'kerberos';
import agent from 'agent-base';
import net from 'net';
import tls from 'tls';

export default function kerberosAgent(options) {
    return agent((req, opts, callback) => {
        const spn = `HTTP/${opts.host}`;

        getToken(spn, (error, token) => {
            if (error) {
                return callback(error);
            }

            addAuthHeader(req, token);

            let socket;
            if (opts.secureEndpoint) {
                socket = tls.connect(opts);
            } else {
                socket = net.connect(opts);
            }

            callback(null, socket);
        });
    });
}


function getToken(spn, callback) {
    SSIP.SecurityCredentials.acquire('Negotiate', '', (error, creds) => {
        if (error) {
            return callback(error);
        }

        SSIP.SecurityContext.initialize(creds, spn, '', (err, context) => {
            if (err) {
                return callback(err);
            }

            return callback(null, context.payload);
        });
    });
}


function addAuthHeader(req, token) {
    if (req._header) {
        req._header = null;
        req.setHeader('Authorization', `Negotiate ${token}`);
        req._implicitHeader();

        if (req.output && req.output.length > 0) {
            const first = req.output[0];
            const endOfHeaders = first.indexOf('\r\n\r\n') + 4;
            req.output[0] = req._header + first.substring(endOfHeaders);
        }
    } else {
        req.setHeader('Authorization', `Negotiate ${token}`);
    }
}
