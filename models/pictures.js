const fs = require('fs');
const path = require('path');

class Pictures
{
    constructor()
    {
        this.allowedExtentions = ['jpg','png','gif'];
        this.basePath = './data/images';
        this.curSection = 'Illustrations';
        this.sections = [];
        this.curImages = [];
        this.imageCursor = 0;

        this.#createCache();
    }

    sections()
    {
        return this.sections;
    }

    images()
    {
        return this.curImages;
    }

    resetCursor()
    {
        this.imageCursor = 0;
    }

    nextImage()
    {
        let ret = this.curImages[this.imageCursor];
        this.imageCursor++;

        return ret;
    }

    setSection( newSection)
    {
        if( newSection != this.curSection)
        {

        }
    }

    async #createCache()
    {
        await this.#getSections();
        await this.#loadImages();

        console.log('Sections :');
        this.sections.forEach( (value, index) =>{
            console.log('Section ' + index + ' ' + value);
        });
        
        // console.log('Loaded images :');
        // this.curImages.forEach( (value, index) =>{
        //     console.log('image ' + index + ' ' + value);
        // });

        //this.#readFiles(this.basePath);

        // const baseDir = fs.opendirSync(this.path);
        // let fileNfo;
        // while((fileNfo = baseDir.readSync()) !== null)
        // {
        //     if( fileNfo.isDirectory())
        //         console.log('Folder : ' + fileNfo.name);
        //     else if(fileNfo.isFile())
        //         console.log('File   : ' + fileNfo.name);
        // }
    }

    async #getSections()
    {
        this.sections = [];
        const files = await fs.promises.opendir(this.basePath);
        for await (const file of files) {
            if( file.isDirectory())
            {
                this.sections.push(file.name);
            }
        }
    }

    async #loadImages()
    {
        this.curImages = [];
        let curPath = path.join(this.basePath, this.curSection);
        console.log('Load pictures from [' + curPath + ']');
        await this.#loadImagesRecursive(curPath);
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

    async #readFiles(directory)
    {
        const files = await fs.promises.opendir(directory);
        for await (const file of files) {
            if( file.isDirectory())
            {
                let cur = path.join(directory, file.name);
                console.log('Folder : ' +  cur);
                await this._readFiles(cur);
            }
            else if(file.isFile())
            {
                let cur = path.join(directory, file.name);
                console.log('File : ' + cur);
            }
        }
    }
}

module.exports = Pictures;