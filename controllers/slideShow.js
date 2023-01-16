class SlideShow
{

    constructor(interval, timerCallback)
    {
        this.callback = timerCallback;
        this.loopRunning = false;
        this.interval = interval;
    }

    start() {
        this.loopRunning = true;
        this.#loop();
    }

    pause() {

    }

    resume(){

    }

    stop()  {
        this.loopRunning = false;
    }

    async #loop()
    {
        while(this.loopRunning)
        {
            await this.#sleep(this.interval);
            this.callback();
        }
    }

    #sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = SlideShow;