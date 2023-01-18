const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");


class APIServer
{
    constructor(imagesPath, port)
    {
        this.imagesPath = imagesPath;
        this.port = port;

        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer);

        this.app.get('/', function(req, res){
            res.send('GET request to homepage');
        });

        // test serving images from the filesystem
        this.app.use('/images', express.static(this.imagesPath));

        this.io.on("connection", (socket) => {
            console.log('Made socket connection');

            socket.on('message',  (data) => {
                console.log(data);
                socket.emit('response', 'reply to ' + data);
            })
        });

        this.httpServer.listen(this.port, () => {
            console.log('CentralServer::constructor - Web server started and listen on port *:' + this.port);
        });
    }

    addRoutes( routes)
    {
        this.app.use(routes);
    }
}

module.exports = APIServer;