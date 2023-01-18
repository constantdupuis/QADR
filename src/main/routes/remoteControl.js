const express = require('express');

class RemoteControlRouter{
    constructor( picturesStorage)
    {
        this.router = express.Router();
        this.picturesStorage = picturesStorage;

        this.router.get('/remoteCtrl/config', (req, res) => {
            console.log('picturesStorage');
            console.log(this.picturesStorage);
            res.send(JSON.stringify({'interval': 10000, 'sections': this.picturesStorage.getSections() }));
        });
    }

    getRouter()
    {
        return this.router;
    }
}


module.exports = RemoteControlRouter;