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
            client.sendMessage(msg.from, "Escribe el numero del cuento que quieres escuchar\n1.- Cuento de navidad\n 2.- El niño que queria ser pajaro\n3.- La astronauta");
            break;
        case "1":
            //mandar el primer cuento en formato opus
            const media = MessageMedia.fromFilePath('./media/navidad.opus');
            client.sendMessage(msg.from, "1.- Cuento de navidad");
            client.sendMessage(msg.from, media);
            break;
        case "2":
            //mandar el segundo cuento en formato opus
            const media2 = MessageMedia.fromFilePath('./media/ninopajaro.opus');
            client.sendMessage(msg.from, "2.- El niño que queria ser pajaro");
            client.sendMessage(msg.from, media2);
            break;
        case "3":
            //mandar el tercer cuento en formato opus
            const media3 = MessageMedia.fromFilePath('./media/astronauta.opus');
            client.sendMessage(msg.from, "3.- La astronauta");
            client.sendMessage(msg.from, media3);
        default:
            client.sendMessage(msg.from, "No entiendo el mensaje, escribe: hola o lista para conocer el listado de cuentos disponibles");
            break;
    }
});

client.initialize();

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});