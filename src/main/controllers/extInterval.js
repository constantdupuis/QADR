class ExtInterval
{

    constructor(interval, timerCallback)
    {
        this.callback = timerCallback;
        this.isSlideShowRunning = false;
        this.intervalDuration = interval;
        this.intervalId = 0;
        this.paused = false;
    }

    start() {
        if(this.isSlideShowRunning == true ) return;

        this.intervalId = setInterval(() => {
            if( !this.paused) this.callback();
        }, this.intervalDuration);
        
        this.isSlideShowRunning = true;
    }

    pause() {
        this.pause = true;
    }

    resume(){
        this.pause = false;
    }

    stop()  {
        if( this.isSlideShowRunning == false) return;
        clearInterval(this.intervalId);
        this.isSlideShowRunning = false;
    }

    changeInterval( newIntervalDuration) 
    {
        this.intervalDuration = newIntervalDuration();
        this.stop();
        this.start();
    }

    isPaused()
    {
        return this.pause;
    }
}

module.exports = ExtInterval;