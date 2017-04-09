import { SSIP } from 'kerberos';
import agent from 'agent-base';
import net from 'net';
import tls from 'tls';

export default function kerberosAgent(options) {
    return agent((req, opts, callback) => {
        let socket;

        if (opts.secureEndpoint) {
            socket = tls.connect(opts);
        } else {
            socket = net.connect(opts);
        }

        callback(null, socket);
    });
}
