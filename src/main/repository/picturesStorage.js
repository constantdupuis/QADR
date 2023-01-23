const fs = require('fs');
const path = require('path');

class PicturesStorage
{
    constructor(baseImagesPath)
    {
        this.allowedExtentions = ['jpg','png','gif'];
        this.basePath = baseImagesPath;
        this.curSection = 'All';
        this.sections = [];
        this.curImages = [];
        this.imageCursor = 0;

        this.#createInitialCache();
    }

    getSections()
    {
        return this.sections;
    }

    getImages()
    {
        return this.curImages;
    }

    resetCursor()
    {
        this.imageCursor = 0;
    }

    getNextImage()
    {
        let ret = this.curImages[this.imageCursor];
        this.imageCursor++;
        this.imageCursor = this.imageCursor % this.curImages.length;

        return ret;
    }

    async setSection( newSection)
    {
        if( newSection != this.curSection && this.getSections.includes(newSection))
        {
            this.curSection = newSection;
            await this.#loadImages();
            return true;
        }
        return false;
    }

    async #createInitialCache()
    {
        await this.#loadSections();
        await this.#loadImages();

        console.log('Sections :');
        this.sections.forEach( (value, index) =>{
            console.log(' - section ' + index + ' ' + value);
        });
        
        console.log('Loaded images :');
        this.curImages.forEach( (value, index) =>{
            console.log(' - image ' + index + ' ' + value);
        });
    }

    async #loadSections()
    {
        this.sections = [];
        const files = await fs.promises.opendir(this.basePath);
        for await (const file of files) {
            if( file.isDirectory())
            {
                this.sections.push(file.name);
            }
        }
        this.sections.sort();
    }

    async #loadImages()
    {
        this.curImages = [];
        
        let curPath = '';
        if( this.curSection == 'All')
        {
            curPath = path.join(this.basePath);
        }
        else
        {
            curPath = path.join(this.basePath, this.curSection);
        }

        console.log('Load pictures from [' + curPath + ']');
        await this.#loadImagesRecursive(curPath);
        this.curImages.sort();
    }

    async #loadImagesRecursive(curPath)
    {
        const files = await fs.promises.opendir(curPath);
        for await (const file of files) {
            if( file.isFile() )
            {
                let ext = this.#getFileExtension(file.name).toLowerCase();
                //console.log('File extention : ' + ext);
                if( this.allowedExtentions.includes(ext))
                {
                    //console.log('Add file : ' + file.name);
                    this.curImages.push(path.join(curPath,file.name));
                }
            }
            else if (file.isDirectory())
            {
                //console.log('Navigate to : ' + file.name);
                await this.#loadImagesRecursive(path.join(curPath, file.name));
            }
                
        }
    }

    #getFileExtension(filename){
        //console.log('Get File extention for : ' + filename);
        // get file extension
        const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
        return extension;
    }
}

module.exports = PicturesStorage;