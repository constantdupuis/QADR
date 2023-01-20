const express = require('express');

const RemoteParametersModel = require('../models/remoteParameters');

class RemoteControlRouter{
    constructor( repository)
    {
        this.router = express.Router();
        this.repo = repository;

        this.router.get('/remoteCtrl/config', (req, res) => {
            console.log('RemoteControlRouter::get[/remoteCtrl/config]');
            let data = new RemoteParametersModel();
            data.section = this.repo.remoteParameters.getSection();
            data.sections = this.repo.remoteParameters.getSections();
            data.slideShowInterval = this.repo.remoteParameters.getSlideShowInterval();
            res.send(JSON.stringify(data));
        });
    }

    getRouter()
    {
        return this.router;
    }
}


module.exports = RemoteControlRouter;