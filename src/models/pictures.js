const sf = require('fs');
const path = require('path');

class Pictures
{
    constructor()
    {
        this.path = '/home/cdupuis/Pictures/ForPhotoframe';
        this.subFolder = 'Famille';

        this._creatCache();
    }

    _creatCache()
    {
        let fullPath = path.join(this.path, this.subFolder);
        console.log('Load pictures from [' + fullPath + ']');
    }
}

module.exports = Pictures;