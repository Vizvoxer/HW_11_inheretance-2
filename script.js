function SetClock(offset = 0, fullTime = true) {
    this.clockContainer = document.createElement("div");
    this.fullTime = fullTime;
    var that = this;

    this.clockContainer.classList.add("clock");
    document.querySelector("body").appendChild(this.clockContainer);

    function displayTime() {
        var date = new Date();
        var localDate = date.getTime();
        var localOffset = date.getTimezoneOffset() * 60000;
        var utc = localDate + localOffset;
        var targetDate = utc + 3600000 * offset;
        var offsetDate = new Date(targetDate);
        var timeData = {
            hours: offsetDate.getHours().toString(),
            minutes: offsetDate.getMinutes().toString(),
            seconds: offsetDate.getSeconds().toString()
        };

        for (el in timeData) {
            if (timeData[el].length === 1) {
                timeData[el] = 0 + timeData[el];
            }
        }

        that.formTimeString(timeData.hours, timeData.minutes, timeData.seconds);
    }

    this.clockContainer.addEventListener(
        "click",
        this.toggleTimeFormat.bind(this)
    );

    setInterval(displayTime, 1000);
}

SetClock.prototype.formTimeString = function(h, m, s) {
    if (this.fullTime) {
        this.clockContainer.innerHTML = h + ":" + m + ":" + s;
    } else {
        this.clockContainer.innerHTML = h + ":" + m;
    }
};

SetClock.prototype.toggleTimeFormat = function() {
    this.fullTime = !this.fullTime;
};

var ukrainianTime = new SetClock(3);

var notFullClock = new SetClock(null, false);

var UTCFullClock = new SetClock();

var UTCShortClock = new SetClock();

UTCShortClock.fullTime = false;
