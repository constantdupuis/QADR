const Store = require('electron-store');

class AppConfig
{
    #IMAGES_PATH_PARAM_NAME = 'imagesPath'; // where the slide show pictures are located on the system
    #SLIDE_SHOW_INTERVAL_PARAM_NAME = 'slideShowInterval'; // interval between image switch
    #IMAGE_SECTION_PARAM_NAME = 'imageSection'; // which image ssection to show, empty '' mean all, otherwise the name of a subfolder of #IMAGES_PATH_PARAM_NAME

    isConfigOk = false;

    constructor()
    {
        this.store = new Store();
        this.#checkConfig();
    }

    #checkConfig()
    {
        isConfigOk = true;
        if( !store.get(this.#IMAGES_PATH_PARAM_NAME))
        {
            console.log('ERROR : Images path NOT set');
            isConfigOk = false;
        }

        if( !store.get(this.#SLIDE_SHOW_INTERVAL_PARAM_NAME))
        {
            console.log(`Slide show interval param [${this.#SLIDE_SHOW_INTERVAL_PARAM_NAME}] set to default : 10000`);
            store.set(this.#SLIDE_SHOW_INTERVAL_PARAM_NAME, 10000);
        }

        if( !store.get(this.#IMAGE_SECTION_PARAM_NAME))
        {
            console.log('Image section set to ALL');
            store.set(this.#IMAGE_SECTION_PARAM_NAME, '');
        }
    }

    getImagesPath()
    {
        return this.store.get(this.#IMAGES_PATH_PARAM_NAME);
    }

    setImagesPath(newValue)
    {
        return this.store.set(this.#IMAGES_PATH_PARAM_NAME, newValue);
    }

    getSlideShowInterval()
    {
        return this.store.get(this.#SLIDE_SHOW_INTERVAL_PARAM_NAME);
    }

    getSlideShowInterval(newValue)
    {
        return this.store.set(this.#SLIDE_SHOW_INTERVAL_PARAM_NAME, newValue);
    }

    getSection()
    {
        return this.store.get(this.#IMAGE_SECTION_PARAM_NAME);
    }

    setSection(newValue)
    {
        return this.store.set(this.#IMAGE_SECTION_PARAM_NAME, newValue);
    }
}

module.exports = AppConfig;