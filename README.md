# kerberos-agent [![Build status](https://ci.appveyor.com/api/projects/status/5ltwkg215ojvomxq?svg=true)](https://ci.appveyor.com/project/DavidBeale/kerberos-agent) [![npm version](https://badge.fury.io/js/kerberos-agent.svg)](http://badge.fury.io/js/kerberos-agent)

HTTP.Agent implementation which provides Kerberos authentication

> Call Windows Authentication protected endpoints using Kerberos

## Usage
```js
import fetch from 'node-fetch';
import kerberosAgent from 'kerberos-agent';

fetch('http://some-endpoint/', {
    agent: kerberosAgent()
})
    .then(...)
```

## Install
```shell
npm install kerberos-agent --save-dev
```

> This module uses the [Kerberos](https://www.npmjs.com/package/kerberos) package and so you must be able in build a C++ package to install. See the the Kerberos package [README](https://www.npmjs.com/package/kerberos) if you have issues

## Options
TODO

## Known Limitations
* No Connection Pooling supported
* No HTTP Keep Alive supported
* Authorization header is always sent, i.e. No Challenge/Response
