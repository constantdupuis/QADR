const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path');


class APIServer
{
    constructor(imagesPath, port, viewsPath)
    {
        this.imagesPath = imagesPath;
        this.port = port;
        this.viewsPath = viewsPath;

        this.app = express();
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(bodyParser.json());

        this.app.engine('hbs', engine());
        this.app.set('view engine','hbs');
        //this.app.set('views',this.viewsPath);
        this.app.set('views', path.join(process.cwd(), 'src', 'main', 'views'));

        console.log(`cwd in apiServer : ${process.cwd()}`);
        console.log('__dirname in apiServer ' + __dirname);
        
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer);

        this.app.get('/', function(req, res){
            res.send('GET request to homepage');
        });

        // test serving images from the filesystem
        this.app.use('/images', express.static(this.imagesPath));
        this.app.use('/static', express.static(path.join(process.cwd(), 'src', 'main', 'static')));

        // this.app.use((req, res, next) =>{
        //     res.status(404).render('404', {pageTitle : "Page Not Found"});
        // });

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