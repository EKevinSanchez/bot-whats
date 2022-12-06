const qrcode = require('qrcode-terminal');
const cors = require('cors');
const express = require('express');
const { Client, MessageMedia} = require('whatsapp-web.js');
const { generateImage } = require('./controllers/handle');
const app = express();
app.use(cors());
app.use(express.json());

const server = require('http').Server(app);

const port = process.env.PORT || 3000;
app.use('/', require('./routes/web'));

const client = new Client();

client.on('qr', qr => generateImage(qr, () => {
    qrcode.generate(qr, {small: true});

    console.log(`Ver QR en la /qr`);
    socketEvents.sendQr(qr);
}))

/* client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
}); */

client.on('ready', () => {
    console.log('Client inicio sescion !');
});

client.on('message', msg => {
    switch (msg.body) {
        case "hola":
            client.sendMessage(msg.from, "Hola, como estas? Para conocer el listado de cuentos disponibles, escribe: lista");
            break;
    
        case "lista":
            client.sendMessage(msg.from, "1.- primer cuento\n 2.- segundo cuento");
            break;
        case "1":
            //mandar el primer cuento en formato opus
            const media = MessageMedia.fromFilePath('./media/voicenote.opus');
            client.sendMessage(msg.from, "1.- primer cuento");
            client.sendMessage(msg.from, media);
            break;
        case "2":
            //mandar el segundo cuento en formato opus
            const media2 = MessageMedia.fromFilePath('./media/voicenote2.opus');
            client.sendMessage(msg.from, "2.- segundo cuento");
            client.sendMessage(msg.from, media2);
        default:
            break;
    }
});

client.initialize();

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});