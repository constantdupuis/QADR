class RemoteParameters
{
    constructor( pictureStorage, appConfig )
    {
        this.pictureStorage = pictureStorage;
        this.appConfig = appConfig;
    }

    getSections()
    {
        return this.pictureStorage.getSections();
    }

    getSection()
    {
        return this.appConfig.getSection();
    }

    setSection(newSection)
    {
        if( this.pictureStorage.setSection(newSection))
        {
            this.appConfig.setSection(newSection);
        }
        else
        {
            console.log(`RemoteParameters::setSection - ERROR fail to set new section to ${newSection}`);
        }
    }

    getSlideShowInterval()
    {
        return this.appConfig.getSlideShowInterval();
    }

    setSlideShowInterval(newValue)
    {
        return this.appConfig.setSlideShowInterval(newValue);
    }
}

module.exports = RemoteParameters;