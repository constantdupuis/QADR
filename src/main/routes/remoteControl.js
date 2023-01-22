const express = require('express');

const RemoteParametersModel = require('../models/remoteParameters');

class RemoteControlRouter{
    constructor( repository)
    {
        this.router = express.Router();
        this.repo = repository;

        this.router.get('/remoteCtrl/config', (req, res) => {
            console.log('RemoteControlRouter::get[/remoteCtrl/config]');
            // let data = new RemoteParametersModel();
            // data.section = this.repo.remoteParameters.getSection();
            // data.sections = this.repo.remoteParameters.getSections();
            // data.slideShowInterval = this.repo.remoteParameters.getSlideShowInterval();
            // res.send(JSON.stringify(data));
            res.render('remoteConfig', {
                currentSection : (this.repo.remoteParameters.getSection() == '' ? 'All' : this.repo.remoteParameters.getSection()),
                sections : this.repo.remoteParameters.getSections(),
                slideShowInterval : this.repo.remoteParameters.getSlideShowInterval(),
                layout: false
            });
        });
    }

    getRouter()
    {
        return this.router;
    }
}


module.exports = RemoteControlRouter;