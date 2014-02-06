L.Click2InitHook = function () {
    var that = this;
    /*
     * The main problem here is that we don't actually know when will the 
     * doubleclick be triggered. The difference between two clicks may be 300 
     * milliseconds od 800 milliseconds. We can only hope that 550 is a OK 
     * default value :)
     */
    var TIMEOUT = 300;

    if(!that.delayedClickTimeout)
        that.delayedClickTimeout = TIMEOUT;

    that._delayedClickTimeouts = [];
    that._clickTimes = [];

    var removeOldClickTimes = function() {
        var newClickTimes = [];
        for(var i = 0; i < that._clickTimes.length; i++) {
            var time = that._clickTimes[i];
            if(Date.now() - that._clickTimes[i] < that.delayedClickTimeout) {
                newClickTimes.push(time);
            }
        }
        that._clickTimes = newClickTimes;
    };

    this.on('click', function(event) {
        that._clickTimes.push(Date.now());
        removeOldClickTimes();
        event.clicks = that._clickTimes.length;
        that.fire('click2', event);


        if(event.clicks == 1) {
            var delayedClickFunction = function() {
                that.fire('delayedclick', event);
            }

            // 50 milliseconds later so that a an eventual doubleclick can 
            // cancel this in time:
            var timeout = setTimeout(delayedClickFunction,
                                     50 + that.delayedClickTimeout);

            that._delayedClickTimeouts.push(timeout);
        } else if(event.clicks >= 2) {
            for(var i in that._delayedClickTimeouts) {
                clearTimeout(that._delayedClickTimeouts[i]);
            }
        }
    });

    this.on('dblclick', function(event) {
        that._delayedClickCandidate = false;
    });
};

L.Marker.addInitHook(L.Click2InitHook);
L.Path.addInitHook(L.Click2InitHook);
L.FeatureGroup.addInitHook(L.Click2InitHook);
