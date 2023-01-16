const mainImage = document.getElementById('mainImage')

console.log('Should connect to : http://' + window.electronAPI.server + ':' + window.electronAPI.port);

window.electronAPI.handleImageChanges((event, imgUrl) =>{
    console.log('Requested to load image [' + imgUrl + ']');
    mainImage.src = imgUrl;
    // To reply to the sender
    //event.sender.send('<message>', "data");
});

window.electronAPI.ready();