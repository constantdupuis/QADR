const Store = require('electron-store');

class AppConfig
{
    #IMAGES_PATH_PARAM_NAME = 'imagesPath'; // where the slide show pictures are located on the system
    #SLIDE_SHOW_INTERVAL_PARAM_NAME = 'slideShowInterval'; // interval between image switch
    #IMAGE_SECTION_PARAM_NAME = 'imageSection'; // which image ssection to show, empty '' mean all, otherwise the name of a subfolder of #IMAGES_PATH_PARAM_NAME

    #isConfigOk = false;
    #errorMsg  = '';

    constructor()
    {
        this.store = new Store();
        this.#checkConfig();
    }

    isConfigOk()
    {
        return this.#isConfigOk;
    }

    errorMessage()
    {
        return this.#errorMsg;
    }

    #checkConfig()
    {
        this.#errorMsg  = '';
        this.#isConfigOk = true;
        
        if( !this.store.get(this.#IMAGES_PATH_PARAM_NAME))
        {
            console.log('AppConfig::checkConfig - ERROR : Images path NOT set');
            this.#errorMsg += 'ERROR : Images path NOT set.\n';
            this.#isConfigOk = false;
        }

        if( !this.store.get(this.#SLIDE_SHOW_INTERVAL_PARAM_NAME))
        {
            console.log(`AppConfig::checkConfig - Slide show interval param [${this.#SLIDE_SHOW_INTERVAL_PARAM_NAME}] set to default : 10000`);
            this.store.set(this.#SLIDE_SHOW_INTERVAL_PARAM_NAME, 10000);
        }

        if( !this.store.get(this.#IMAGE_SECTION_PARAM_NAME))
        {
            //console.log('AppConfig::checkConfig - Image section set to ALL');
            this.store.set(this.#IMAGE_SECTION_PARAM_NAME, '');
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

    setSlideShowInterval(newValue)
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

    toString()
    {
        let str = `Configuration is : ${this.#isConfigOk?'OK':'NOK'}\n`;
        str += ` - ${this.#IMAGES_PATH_PARAM_NAME} = [${this.store.get( this.#IMAGES_PATH_PARAM_NAME)}]\n`;
        str += ` - ${this.#SLIDE_SHOW_INTERVAL_PARAM_NAME} = [${this.store.get( this.#SLIDE_SHOW_INTERVAL_PARAM_NAME)}]\n`;
        str += ` - ${this.#IMAGE_SECTION_PARAM_NAME} = [${this.store.get( this.#IMAGE_SECTION_PARAM_NAME)}]\n`;
        
        return str;
    }
}

module.exports = AppConfig;