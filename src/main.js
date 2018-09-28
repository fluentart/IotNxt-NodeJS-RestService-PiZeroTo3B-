const https = require('https');

function postToIoTnxt() {
    var packet = { "id": "test", "data": { "x": 1, "y": 2 } }
    const postData = JSON.stringify(packet);
    const options = {
        hostname: 'TENANTPREFIX.iotnxt.io',
        port: 443,
        path: '/api/v3/data/post',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from("api:key-YOURAPIKEY").toString('base64'),
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    // CREATE REQUEST OBJECT
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => { console.log(`BODY: ${chunk}`); });
        res.on('end', () => { console.log('No more data in response.'); });
    });

    req.on('error', (e) => { console.error(`problem with request: ${e.message}`); });
    req.write(postData);
    req.end();
}

postToIoTnxt();