/*
 
 * Author - Harshen Amarnath Pandey
 * Version - 1.0.5
 * Release - 09th June 2014
 * Copyright (c) 2014 - 2018 Harshen Pandey
 */

(function ($) {

    $.fn.countdowntimer = function (options) {
        return this.each(function () {
            countdown($(this), options);
        });
    };

    /**
     * Replaces content by optional regular expression specified via options
     * regexpMatchFormat and regexpReplaceWith.
     * @param Object $this
     * @param String content
     */
    function html($this, content) {
        var processedContent = content;

        if (typeof window['regexpMatchFormat_' + $this.attr('id')] !== 'undefined' &&
                typeof window['regexpReplaceWith_' + $this.attr('id')] !== 'undefined') {
            var regexp = new RegExp(window['regexpMatchFormat_' + $this.attr('id')]);
            processedContent = content.replace(regexp,
                    window['regexpReplaceWith_' + $this.attr('id')]);
        }

        $this.html(processedContent);
    }

    //Definition of private function countdown.
    function countdown($this, options) {
        var opts = $.extend({}, $.fn.countdowntimer.defaults, options);
        var $this = $this;
        $this.addClass("style");
        var size = "";
        var borderColor = "";
        var fontColor = "";
        var backgroundColor = "";
        size = opts.size;
        borderColor = opts.borderColor;
        fontColor = opts.fontColor;
        backgroundColor = opts.backgroundColor;

        var regexpMatchFormat = "";
        var regexpReplaceWith = "";
        if (options.regexpMatchFormat != undefined && options.regexpReplaceWith != undefined) {
            window['regexpMatchFormat_' + $this.attr('id')] = options.regexpMatchFormat;
            window['regexpReplaceWith_' + $this.attr('id')] = options.regexpReplaceWith;
        }

        if (options.borderColor != undefined || options.fontColor != undefined || options.backgroundColor != undefined) {
            var customStyle = {
                "background": backgroundColor,
                "color": fontColor,
                "border-color": borderColor
            }
            $this.css(customStyle);
        } else {
            $this.addClass("colorDefinition");
        }

        if (options.size != undefined) {
            switch (size) {
                case "xl" :
                    $this.addClass("size_xl");
                    break;
                case "lg" :
                    $this.addClass("size_lg");
                    break;
                case "md" :
                    $this.addClass("size_md");
                    break;
                case "sm" :
                    $this.addClass("size_sm");
                    break;
                case "xs" :
                    $this.addClass("size_xs");
                    break;
            }
        } else if (size == "sm") {
            $this.addClass("size_sm");
        }

        if (options.startDate == undefined && options.dateAndTime == undefined && options.currentTime == undefined && (options.hours != undefined || options.minutes != undefined || options.seconds != undefined)) {

            if (options.hours != undefined && options.minutes == undefined && options.seconds == undefined) {
                hours_H = "";
                minutes_H = "";
                seconds_H = "";
                timer_H = "";
                window['hours_H' + $this.attr('id')] = opts.hours;
                window['minutes_H' + $this.attr('id')] = opts.minutes;
                window['seconds_H' + $this.attr('id')] = opts.seconds;
                onlyHours($this, opts);
                window['timer_H' + $this.attr('id')] = setInterval(function () {
                    onlyHours($this, opts)
                }, opts.tickInterval * 1000);
            } else if (options.hours == undefined && options.minutes != undefined && options.seconds == undefined) {
                hours_M = "";
                minutes_M = "";
                seconds_M = "";
                timer_M = "";
                window['hours_M' + $this.attr('id')] = opts.hours;
                window['minutes_M' + $this.attr('id')] = opts.minutes;
                window['seconds_M' + $this.attr('id')] = opts.seconds;
                onlyMinutes($this, opts);
                window['timer_M' + $this.attr('id')] = setInterval(function () {
                    onlyMinutes($this, opts)
                }, opts.tickInterval * 1000);
            } else if (options.hours == undefined && options.minutes == undefined && options.seconds != undefined) {
                hours_S = "";
                minutes_S = "";
                seconds_S = "";
                timer_S = "";
                window['hours_S' + $this.attr('id')] = opts.hours;
                window['minutes_S' + $this.attr('id')] = opts.minutes;
                window['seconds_S' + $this.attr('id')] = opts.seconds;
                onlySeconds($this, opts);
                window['timer_S' + $this.attr('id')] = setInterval(function () {
                    onlySeconds($this, opts)
                }, opts.tickInterval * 1000);
            } else if (options.hours != undefined && options.minutes != undefined && options.seconds == undefined) {
                hours_HM = "";
                minutes_HM = "";
                seconds_HM = "";
                timer_HM = "";
                window['hours_HM' + $this.attr('id')] = opts.hours;
                window['minutes_HM' + $this.attr('id')] = opts.minutes;
                window['seconds_HM' + $this.attr('id')] = opts.seconds;
                hoursMinutes($this, opts);
                window['timer_HM' + $this.attr('id')] = setInterval(function () {
                    hoursMinutes($this, opts)
                }, opts.tickInterval * 1000);
            } else if (options.hours == undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_MS = "";
                minutes_MS = "";
                seconds_MS = "";
                timer_MS = "";
                window['hours_MS' + $this.attr('id')] = opts.hours;
                window['minutes_MS' + $this.attr('id')] = opts.minutes;
                window['seconds_MS' + $this.attr('id')] = opts.seconds;
                minutesSeconds($this, opts);
                window['timer_MS' + $this.attr('id')] = setInterval(function () {
                    minutesSeconds($this, opts)
                }, opts.tickInterval * 1000);
            } else if (options.hours != undefined && options.minutes == undefined && options.seconds != undefined) {
                hours_HS = "";
                minutes_HS = "";
                seconds_HS = "";
                timer_HS = "";
                window['hours_HS' + $this.attr('id')] = opts.hours;
                window['minutes_HS' + $this.attr('id')] = opts.minutes;
                window['seconds_HS' + $this.attr('id')] = opts.seconds;
                hoursSeconds($this, opts);
                window['timer_HS' + $this.attr('id')] = setInterval(function () {
                    hoursSeconds($this, opts)
                }, opts.tickInterval * 1000);
            } else if (options.hours != undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_HMS = "";
                minutes_HMS = "";
                seconds_HMS = "";
                timer_HMS = "";
                window['hours_HMS' + $this.attr('id')] = opts.hours;
                window['minutes_HMS' + $this.attr('id')] = opts.minutes;
                window['seconds_HMS' + $this.attr('id')] = opts.seconds;
                hoursMinutesSeconds($this, opts);
                window['timer_HMS' + $this.attr('id')] = setInterval(function () {
                    hoursMinutesSeconds($this, opts)
                }, opts.tickInterval * 1000);
            }

        } else if (options.startDate != undefined && options.dateAndTime != undefined && options.currentTime == undefined) {
            startDate = "";
            endDate = "";
            timer_startDate = "";
            window['startDate' + $this.attr('id')] = new Date(opts.startDate);
            window['endDate' + $this.attr('id')] = new Date(opts.dateAndTime);
            var type = "withStart";
            givenDate($this, opts, type);
            window['timer_startDate' + $this.attr('id')] = setInterval(function () {
                givenDate($this, opts, type)
            }, opts.tickInterval * 1000);
        } else if (options.startDate == undefined && options.dateAndTime != undefined && options.currentTime == undefined) {
            startTime = "";
            dateTime = "";
            timer_givenDate = "";
            var hour = opts.startDate.getHours() < 10 ? '0' + opts.startDate.getHours() : opts.startDate.getHours();
            var minutes = opts.startDate.getMinutes() < 10 ? '0' + opts.startDate.getMinutes() : opts.startDate.getMinutes();
            var seconds = opts.startDate.getSeconds() < 10 ? '0' + opts.startDate.getSeconds() : opts.startDate.getSeconds();
            var month = (opts.startDate.getMonth() + 1) < 10 ? '0' + (opts.startDate.getMonth() + 1) : (opts.startDate.getMonth() + 1);
            var date = opts.startDate.getDate() < 10 ? '0' + opts.startDate.getDate() : opts.startDate.getDate();
            var year = opts.startDate.getFullYear();
            window['startTime' + $this.attr('id')] = new Date(year + '/' + month + '/' + date + ' ' + hour + ':' + minutes + ':' + seconds);
            window['dateTime' + $this.attr('id')] = new Date(opts.dateAndTime);
            var type = "withnoStart";
            givenDate($this, opts, type);
            window['timer_givenDate' + $this.attr('id')] = setInterval(function () {
                givenDate($this, opts, type)
            }, opts.tickInterval * 1000);
        } else if (options.currentTime != undefined) {
            currentTime = "";
            timer_currentDate = "";
            window['currentTime' + $this.attr('id')] = opts.currentTime;
            currentDate($this, opts);
            window['timer_currentDate' + $this.attr('id')] = setInterval(function () {
                currentDate($this, opts)
            }, opts.tickInterval * 1000);
        } else {
            countSeconds = "";
            timer_secondsTimer = "";
            window['countSeconds' + $this.attr('id')] = opts.seconds;
            window['timer_secondsTimer' + $this.attr('id')] = setInterval(function () {
                secondsTimer($this)
            }, 1000);
        }
    }
    ;

    //Function for only hours are set when invoking plugin.
    function onlyHours($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_H' + id] == opts.minutes && window['seconds_H' + id] == opts.seconds && window['hours_H' + id] == opts.hours) {
            if (window['hours_H' + id].toString().length < 2) {
                window['hours_H' + id] = "0" + window['hours_H' + id];
            }
            $this.html(window['hours_H' + id] + opts.timeSeparator + "00" + opts.timeSeparator + "00");
            window['seconds_H' + id] = 60 - opts.tickInterval;
            window['minutes_H' + id] = 59;
            if (window['hours_H' + id] != 0) {
                window['hours_H' + id]--;
            } else {
                delete window['hours_H' + id];
                delete window['minutes_H' + id];
                delete window['seconds_H' + id];
                clearInterval(window['timer_H' + id]);
                timeUp($this, opts);
            }
        } else {
            if (window['hours_H' + id].toString().length < 2) {
                window['hours_H' + id] = "0" + window['hours_H' + id];
            }
            if (window['minutes_H' + id].toString().length < 2) {
                window['minutes_H' + id] = "0" + window['minutes_H' + id];
            }
            if (window['seconds_H' + id].toString().length < 2) {
                window['seconds_H' + id] = "0" + window['seconds_H' + id];
            }
            $this.html(window['hours_H' + id] + opts.timeSeparator + window['minutes_H' + id] + opts.timeSeparator + window['seconds_H' + id]);
            window['seconds_H' + id] -= opts.tickInterval;
            if (window['minutes_H' + id] != 0 && window['seconds_H' + id] < 0) {
                window['minutes_H' + id]--;
                window['seconds_H' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_H' + id] == 0 && window['seconds_H' + id] < 0 && window['hours_H' + id] != 0)
            {
                window['hours_H' + id]--;
                window['minutes_H' + id] = 59;
                window['seconds_H' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_H' + id] == 0 && window['seconds_H' + id] < 0 && window['hours_H' + id] == 0)
            {
                delete window['hours_H' + id];
                delete window['minutes_H' + id];
                delete window['seconds_H' + id];
                clearInterval(window['timer_H' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    //Function for only minutes are set when invoking plugin.
    function onlyMinutes($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_M' + id] == opts.minutes && window['seconds_M' + id] == opts.seconds) {
            if (window['minutes_M' + id].toString().length < 2) {
                window['minutes_M' + id] = "0" + window['minutes_M' + id];
            }
            $this.html(window['minutes_M' + id] + opts.timeSeparator + "00");
            window['seconds_M' + id] = 60 - opts.tickInterval;
            if (window['minutes_M' + id] != 0) {
                window['minutes_M' + id]--;
            } else {
                delete window['hours_M' + id];
                delete window['minutes_M' + id];
                delete window['seconds_M' + id];
                clearInterval(window['timer_M' + id]);
                timeUp($this, opts);
            }
        } else {
            if (window['minutes_M' + id].toString().length < 2) {
                window['minutes_M' + id] = "0" + window['minutes_M' + id];
            }
            if (window['seconds_M' + id].toString().length < 2) {
                window['seconds_M' + id] = "0" + window['seconds_M' + id];
            }
            $this.html(window['minutes_M' + id] + opts.timeSeparator + window['seconds_M' + id]);
            window['seconds_M' + id] -= opts.tickInterval;
            if (window['minutes_M' + id] != 0 && window['seconds_M' + id] < 0) {
                window['minutes_M' + id]--;
                window['seconds_M' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_M' + id] == 0 && window['seconds_M' + id] < 0)
            {
                delete window['hours_M' + id];
                delete window['minutes_M' + id];
                delete window['seconds_M' + id];
                clearInterval(window['timer_M' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    //Function for only seconds are set when invoking plugin.
    function onlySeconds($this, opts) {
        var id = $this.attr('id');
        if (window['seconds_S' + id].toString().length < 2) {
            window['seconds_S' + id] = "0" + window['seconds_S' + id];
        }
        $this.html(window['seconds_S' + id] + " " + "sec");
        window['seconds_S' + id] -= opts.tickInterval;
        if (window['seconds_S' + id] < 0)
        {
            delete window['hours_S' + id];
            delete window['minutes_S' + id];
            delete window['seconds_S' + id];
            clearInterval(window['timer_S' + id]);
            timeUp($this, opts);
        }
        id = null;
    }

    //Function for hours and minutes are set when invoking plugin.
    function hoursMinutes($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_HM' + id] == opts.minutes && window['hours_HM' + id] == opts.hours) {
            if (window['hours_HM' + id].toString().length < 2) {
                window['hours_HM' + id] = "0" + window['hours_HM' + id];
            }
            if (window['minutes_HM' + id].toString().length < 2) {
                window['minutes_HM' + id] = "0" + window['minutes_HM' + id];
            }
            $this.html(window['hours_HM' + id] + opts.timeSeparator + window['minutes_HM' + id] + opts.timeSeparator + "00");
            if (window['hours_HM' + id] != 0 && window['minutes_HM' + id] == 0) {
                window['hours_HM' + id]--;
                window['minutes_HM' + id] = 59;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HM' + id] == 0 && window['minutes_HM' + id] != 0) {
                window['seconds_HM' + id] = 60 - opts.tickInterval;
                window['minutes_HM' + id]--;
            } else {
                window['seconds_HM' + id] = 60 - opts.tickInterval;
                window['minutes_HM' + id]--;
            }
            if (window['hours_HM' + id] == 0 && window['minutes_HM' + id] == 0 && window['seconds_HM' + id] == 60)
            {
                delete window['hours_HM' + id];
                delete window['minutes_HM' + id];
                delete window['seconds_HM' + id];
                clearInterval(window['timer_HM' + id]);
                timeUp($this, opts);
            }
        } else {
            if (window['hours_HM' + id].toString().length < 2) {
                window['hours_HM' + id] = "0" + window['hours_HM' + id];
            }
            if (window['minutes_HM' + id].toString().length < 2) {
                window['minutes_HM' + id] = "0" + window['minutes_HM' + id];
            }
            if (window['seconds_HM' + id].toString().length < 2) {
                window['seconds_HM' + id] = "0" + window['seconds_HM' + id];
            }
            $this.html(window['hours_HM' + id] + opts.timeSeparator + window['minutes_HM' + id] + opts.timeSeparator + window['seconds_HM' + id]);
            window['seconds_HM' + id] -= opts.tickInterval;
            if (window['minutes_HM' + id] != 0 && window['seconds_HM' + id] < 0) {
                window['minutes_HM' + id]--;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HM' + id] == 0 && window['seconds_HM' + id] < 0 && window['hours_HM' + id] != 0)
            {
                window['hours_HM' + id]--;
                window['minutes_HM' + id] = 59;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HM' + id] == 0 && window['seconds_HM' + id] < 0 && window['hours_HM' + id] == 0)
            {
                delete window['hours_HM' + id];
                delete window['minutes_HM' + id];
                delete window['seconds_HM' + id];
                clearInterval(window['timer_HM' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    //Function for minutes and seconds are set when invoking plugin.
    function minutesSeconds($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_MS' + id] == opts.minutes && window['seconds_MS' + id] == opts.seconds) {
            if (window['minutes_MS' + id].toString().length < 2) {
                window['minutes_MS' + id] = "0" + window['minutes_MS' + id];
            }
            if (window['seconds_MS' + id].toString().length < 2) {
                window['seconds_MS' + id] = "0" + window['seconds_MS' + id];
            }
            $this.html(window['minutes_MS' + id] + opts.timeSeparator + window['seconds_MS' + id]);
            if (window['minutes_MS' + id] != 0 && window['seconds_MS' + id] == 0) {
                window['minutes_MS' + id]--;
                window['seconds_MS' + id] = 60 - opts.tickInterval;
            } else if (window['minutes_MS' + id] == 0 && window['seconds_MS' + id] == 0) {
                delete window['hours_MS' + id];
                delete window['minutes_MS' + id];
                delete window['seconds_MS' + id];
                clearInterval(window['timer_MS' + id]);
                timeUp($this, opts);
            } else {
                window['seconds_MS' + id] -= opts.tickInterval;
            }
        } else {
            if (window['minutes_MS' + id].toString().length < 2) {
                window['minutes_MS' + id] = "0" + window['minutes_MS' + id];
            }
            if (window['seconds_MS' + id].toString().length < 2) {
                window['seconds_MS' + id] = "0" + window['seconds_MS' + id];
            }
            $this.html(window['minutes_MS' + id] + opts.timeSeparator + window['seconds_MS' + id]);
            window['seconds_MS' + id] -= opts.tickInterval;
            if (window['minutes_MS' + id] != 0 && window['seconds_MS' + id] < 0) {
                window['minutes_MS' + id]--;
                window['seconds_MS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_MS' + id] == 0 && window['seconds_MS' + id] < 0)
            {
                delete window['hours_MS' + id];
                delete window['minutes_MS' + id];
                delete window['seconds_MS' + id];
                clearInterval(window['timer_MS' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    //Function for hours and seconds are set when invoking plugin.
    function hoursSeconds($this, opts) {
        var id = $this.attr('id');
        if (window['seconds_HS' + id] == opts.seconds && window['hours_HS' + id] == opts.hours) {
            if (window['hours_HS' + id].toString().length < 2) {
                window['hours_HS' + id] = "0" + window['hours_HS' + id];
            }
            if (window['seconds_HS' + id].toString().length < 2) {
                window['seconds_HS' + id] = "0" + window['seconds_HS' + id];
            }
            $this.html(window['hours_HS' + id] + opts.timeSeparator + "00" + opts.timeSeparator + window['seconds_HS' + id]);
            if (window['hours_HS' + id] == 0 && window['seconds_HS' + id] == 0) {
                delete window['hours_HS' + id];
                delete window['minutes_HS' + id];
                delete window['seconds_HS' + id];
                clearInterval(window['timer_HS' + id]);
                timeUp($this, opts);
            } else if (window['hours_HS' + id] != 0 && window['seconds_HS' + id] == 0) {
                window['hours_HS' + id]--;
                window['minutes_HS' + id] = 59;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            } else {
                window['seconds_HS' + id] -= opts.tickInterval;
            }
        } else {
            if (window['hours_HS' + id].toString().length < 2) {
                window['hours_HS' + id] = "0" + window['hours_HS' + id];
            }
            if (window['minutes_HS' + id].toString().length < 2) {
                window['minutes_HS' + id] = "0" + window['minutes_HS' + id];
            }
            if (window['seconds_HS' + id].toString().length < 2) {
                window['seconds_HS' + id] = "0" + window['seconds_HS' + id];
            }
            $this.html(window['hours_HS' + id] + opts.timeSeparator + window['minutes_HS' + id] + opts.timeSeparator + window['seconds_HS' + id]);
            window['seconds_HS' + id] -= opts.tickInterval;
            if (window['minutes_HS' + id] != 0 && window['seconds_HS' + id] < 0) {
                window['minutes_HS' + id]--;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HS' + id] == 0 && window['seconds_HS' + id] < 0 && window['hours_HS' + id] != 0)
            {
                window['hours_HS' + id]--;
                window['minutes_HS' + id] = 59;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HS' + id] == 0 && window['seconds_HS' + id] < 0 && window['hours_HS' + id] == 0)
            {
                delete window['hours_HS' + id];
                delete window['minutes_HS' + id];
                delete window['seconds_HS' + id];
                clearInterval(window['timer_HS' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    //Function for hours, minutes and seconds are set when invoking plugin.
    function hoursMinutesSeconds($this, opts) {
        var id = $this.attr('id');
        if (window['minutes_HMS' + id] == opts.minutes && window['seconds_HMS' + id] == opts.seconds && window['hours_HMS' + id] == opts.hours) {
            if (window['hours_HMS' + id].toString().length < 2) {
                window['hours_HMS' + id] = "0" + window['hours_HMS' + id];
            }
            if (window['minutes_HMS' + id].toString().length < 2) {
                window['minutes_HMS' + id] = "0" + window['minutes_HMS' + id];
            }
            if (window['seconds_HMS' + id].toString().length < 2) {
                window['seconds_HMS' + id] = "0" + window['seconds_HMS' + id];
            }
            $this.html(window['hours_HMS' + id] + opts.timeSeparator + window['minutes_HMS' + id] + opts.timeSeparator + window['seconds_HMS' + id]);
            if (window['hours_HMS' + id] == 0 && window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] == 0) {
                delete window['hours_HMS' + id];
                delete window['minutes_HMS' + id];
                delete window['seconds_HMS' + id];
                clearInterval(window['timer_HMS' + id]);
                timeUp($this, opts);
            } else if (window['hours_HMS' + id] != 0 && window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] == 0) {
                window['hours_HMS' + id]--;
                window['minutes_HMS' + id] = 59;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HMS' + id] == 0 && window['minutes_HMS' + id] != 0 && window['seconds_HMS' + id] == 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HMS' + id] != 0 && window['minutes_HMS' + id] != 0 && window['seconds_HMS' + id] == 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else {
                window['seconds_HMS' + id] -= opts.tickInterval;
            }
        } else {
            if (window['hours_HMS' + id].toString().length < 2) {
                window['hours_HMS' + id] = "0" + window['hours_HMS' + id];
            }
            if (window['minutes_HMS' + id].toString().length < 2) {
                window['minutes_HMS' + id] = "0" + window['minutes_HMS' + id];
            }
            if (window['seconds_HMS' + id].toString().length < 2) {
                window['seconds_HMS' + id] = "0" + window['seconds_HMS' + id];
            }
            $this.html(window['hours_HMS' + id] + opts.timeSeparator + window['minutes_HMS' + id] + opts.timeSeparator + window['seconds_HMS' + id]);
            window['seconds_HMS' + id] -= opts.tickInterval;
            if (window['minutes_HMS' + id] != 0 && window['seconds_HMS' + id] < 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] < 0 && window['hours_HMS' + id] != 0)
            {
                window['hours_HMS' + id]--;
                window['minutes_HMS' + id] = 59;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HMS' + id] == 0 && window['seconds_HMS' + id] < 0 && window['hours_HMS' + id] == 0)
            {
                delete window['hours_HMS' + id];
                delete window['minutes_HMS' + id];
                delete window['seconds_HMS' + id];
                clearInterval(window['timer_HMS' + id]);
                timeUp($this, opts);
            }
        }
        id = null;
    }

    //Function for reverse timer to given date.
    function givenDate($this, opts, type) {
        var id = $this.attr('id');
        var endDate = (type == "withnoStart") ? window['dateTime' + id] : window['endDate' + id];
        var startDate = (type == "withnoStart") ? window['startTime' + id] : window['startDate' + id];
        var days = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
        var hours = Math.floor(((endDate - startDate) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        var minutes = Math.floor(((endDate - startDate) % (24 * 60 * 60 * 1000)) / (60 * 1000)) % 60;
        var seconds = Math.floor(((endDate - startDate) % (24 * 60 * 60 * 1000)) / 1000) % 60 % 60;

        if ((endDate - startDate) > 0) {
            if (days.toString().length < 2) {
                days = "0" + days;
            }
            if (hours.toString().length < 2) {
                hours = "0" + hours;
            }
            if (minutes.toString().length < 2) {
                minutes = "0" + minutes;
            }
            if (seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
            $this.html(days + opts.timeSeparator + hours + opts.timeSeparator + minutes + opts.timeSeparator + seconds);
            (type == "withnoStart") ? (window['startTime' + id].setSeconds(window['startTime' + id].getSeconds() + opts.tickInterval)) : (window['startDate' + id].setSeconds(window['startDate' + id].getSeconds() + opts.tickInterval));
        } else {
            $this.html("00" + opts.timeSeparator + "00" + opts.timeSeparator + "00" + opts.timeSeparator + "00");
            if (type == "withnoStart") {
                delete window['dateTime' + id];
                delete window['startTime' + id];
                clearInterval(window['timer_givenDate' + id]);
            } else if (type == "withStart") {
                delete window['startDate' + id];
                delete window['endDate' + id];
                clearInterval(window['timer_startDate' + id]);
            }
            timeUp($this, opts);
        }
        id = null;
    }

    //Function for displaying current time.
    function currentDate($this, opts) {
        if (window['currentTime' + $this.attr('id')] == true) {
            var today = new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds()

            if (hours.toString().length < 2) {
                hours = "0" + hours;
            }
            if (minutes.toString().length < 2) {
                minutes = "0" + minutes;
            }
            if (seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
            $this.html(hours + opts.timeSeparator + minutes + opts.timeSeparator + seconds);
        } else {
            alert('Set Current Time option.');
        }
    }

    //Default function called when no options are set.
    function secondsTimer($this) {
        var id = $this.attr('id');
        if (window['countSeconds' + id].toString().length < 2) {
            window['countSeconds' + id] = "0" + window['countSeconds' + id];
        }
        $this.html(window['countSeconds' + id] + " " + "sec");
        window['countSeconds' + id]--;
        if (window['countSeconds' + id] == -1)
        {
            delete window['countSeconds' + id];
            clearInterval(window['timer_secondsTimer' + id]);
        }
        id = null;
    }

    //Function for calling the given function name when time is expired.
    function timeUp($this, opts) {
        if (opts.timeUp != null) {
            if ($.isFunction(opts.timeUp) == true) {
                opts.timeUp.apply($this, []);
            }
        }
    }

    //Giving default value for options.
    $.fn.countdowntimer.defaults = {
        hours: 0,
        minutes: 0,
        seconds: 60,
        startDate: new Date(),
        dateAndTime: new Date("0000/00/00 00:00:00"),
        currentTime: false,
        size: "sm",
        borderColor: "#F0068E",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        timeSeparator: ":",
        tickInterval: 1,
        timeUp: null
    };

}(jQuery));
