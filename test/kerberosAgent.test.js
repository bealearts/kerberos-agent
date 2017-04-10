import fetch from 'node-fetch';

import kerberosAgent from '../';
import mockEndPoint from './mock/mockEndPoint';

const url = 'http://localhost:8765';
let endPoint;

describe('kerberos-agent', () => {
    before((done) => {
        endPoint = mockEndPoint().listen(8765, 'localhost', done);
    });

    after(() => {
        endPoint.close();
    });

    it('allows a non Kerberos request', () =>
        fetch(url, {
            agent: kerberosAgent()
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
            })
    );

    it('allows a Kerberos request', () =>
        fetch(`${url}/kerberos`, {
            agent: kerberosAgent()
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
            })
    );
});
