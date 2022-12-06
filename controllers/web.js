const fs = require('fs');

const getQr = (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    fs.createReadStream(`${__dirname}/../media/qr-code.svg`).pipe(res);
}

module.exports = {getQr};