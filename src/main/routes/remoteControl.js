const express = require('express');

const RemoteParametersModel = require('../models/remoteParameters');
const SectionStatus = require('../models/sectionStatus');

class RemoteControlRouter{
    constructor( repository)
    {
        this.router = express.Router();
        this.repo = repository;

        this.router.get('/remote', (req, res) => {
            console.log('RemoteControlRouter::get[/remote]');
            
            // let data = new RemoteParametersModel();
            // data.section = this.repo.remoteParameters.getSection();
            // data.sections = this.repo.remoteParameters.getSections();
            // data.slideShowInterval = this.repo.remoteParameters.getSlideShowInterval();
            // res.send(JSON.stringify(data));

            let sectionsStatus = [];
            let currentSection = this.repo.remoteParameters.getSection();
               
            sectionsStatus.push( new SectionStatus('All', currentSection === 'All') );

            let sections = this.repo.remoteParameters.getSections();
            sections.forEach(element => {
                sectionsStatus.push( new SectionStatus(element, currentSection === element));
            });

            res.render('remoteConfig', {
                currentSection : this.repo.remoteParameters.getSection(),
                sections : this.repo.remoteParameters.getSections(),
                slideShowInterval : this.repo.remoteParameters.getSlideShowInterval(),
                sectionsStatus : sectionsStatus,
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