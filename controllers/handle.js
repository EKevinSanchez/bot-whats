const {Client, LegacySessionAuth, LocalAuth} = require('whatsapp-web.js');
const http = require('http');
const https = require('https');
const fs = require('fs');
const qr = require('qr-image');

const generateImage = (base64, cb = () => {}) => {
    let qr_svg = qr.image(base64, { type : 'svg', margin : 4});
    qr_svg.pipe(require('fs').createWriteStream('./media/qr-code.svg'));
    console.log('QR Code generated');
    cb();
}

module.exports = { generateImage };