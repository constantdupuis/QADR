const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");


class CentralServer
{
    constructor()
    {
        this.port = 3000;
        this.app =  express();
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer);

        console.log('CentralServer::constructor - Start web server');

        this.app.get('/', function(req, res){
            res.send('GET request to homepage');
        });

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
}

module.exports = CentralServer;