const PictureStorage = require('./picturesStorage');
const RemoteParameters = require('./remoteParameters');
const AppConfig = require('./appConfig');

class Repository
{
    pictureStorage;
    remoteParameters;

    constructor( appConfig )
    {
        this.pictureStorage = new PictureStorage(appConfig.getImagesPath());
        this.remoteParameters = new RemoteParameters(this.pictureStorage, appConfig);
    }
}

module.exports = Repository;