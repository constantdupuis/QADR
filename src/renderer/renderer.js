const image0 = document.getElementById('image0');

//console.log('Should connect to : http://' + window.electronAPI.server + ':' + window.electronAPI.port);

window.electronAPI.handleImageChanges((event, imgUrl) => {

    //console.log('Load image [' + imgUrl + ']');
    // fade-out current image
    image0.classList.remove('fade-in');
    image0.classList.add('fade-out');

    //delay next image fade-in
    setTimeout(() => {
        image0.classList.remove('fade-out');
        image0.classList.add('fade-in');
        image0.src = imgUrl;
    }, 2000); // BAD this is hard coded and related to animation duration in CSS file :-(
    
    // To reply to the sender
    //event.sender.send('<message>', "data");
});

window.electronAPI.rendererReady();