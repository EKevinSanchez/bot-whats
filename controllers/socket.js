module.exports = (socket) => {
    return {
        sendQr: (qr) => {
            socket.emit('connection_qr', {
                qr
            });
        }
    }
}