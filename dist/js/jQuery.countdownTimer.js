/*! CountdownTimer for jQuery @version2.0.1 (https://harshen.github.io/jQuery-countdownTimer/).
 *  Written by Harshen Pandey (https://remote.com/harshen) January 2014.
 *  @license MIT (https://github.com/harshen/jQuery-countdownTimer/blob/master/LICENSE.md)
 *  and GPLv3 (https://github.com/harshen/jQuery-countdownTimer/blob/master/LICENSE-GPL.md).
 *  @release - 29/10/2017
 *  Copyright (c) 2017 - 2020 Harshen Pandey
 *  Please attribute the author if you use it.
 */
/* jQuery.countdownTimer.js*/

(function($) {
    "use strict";

    var methods = {
        init: function(options) {
            return this.each(function() {
                countdown($(this), options);
            });
        },
        destroy: function() {
            this.data('countdowntimer', $.extend(true, {}, $.fn.countdowntimer.defaults, {
                destroy: true
            }));
        },
        pause: function(options) {
            this.data('countdowntimer', $.extend(true, {}, $.fn.countdowntimer.defaults, {
                pause: options
            }));
            pauseTimer($(this), $(this).data('typefunc').type, $(this).data('opts').opts, $(this).data('typefunc').func);
        },
        stop: function(options) {
            this.data('countdowntimer', $.extend(true, {}, $.fn.countdowntimer.defaults, {
                stop: options
            }));
            stopTimer($(this), $(this).data('typefunc').type, $(this).data('opts').opts, $(this).data('typefunc').func);
        }
    };

    $.fn.countdowntimer = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            this.data('countdowntimer', $.extend(true, {}, $.fn.countdowntimer.defaults, methodOrOptions));
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.countdownTimer');
        }
    };

    //Definition of private function countdown.
    function countdown($this, options) {
        var opts = $.extend({}, $.fn.countdowntimer.defaults, options);
        $.extend(true, opts, $.fn.countdowntimer.regionalOptions, options);
        $this.data('opts', {
            opts: opts
        });
        $this.addClass("style");
        var size = opts.size;
        var borderColor = opts.borderColor;
        var fontColor = opts.fontColor;
        var backgroundColor = opts.backgroundColor;
        if (options.regexpMatchFormat !== undefined && options.regexpReplaceWith !== undefined && options.timeSeparator === undefined && options.labelsFormat === undefined) {
            window['regexpMatchFormat_' + $this.attr('id')] = options.regexpMatchFormat;
            window['regexpReplaceWith_' + $this.attr('id')] = options.regexpReplaceWith;
        }
        if (options.displayFormat !== undefined) {
            var format = [];
            format[0] = (opts.displayFormat.match('Y') ? '!' : '#');
            format[1] = (opts.displayFormat.match('O') ? '!' : '#');
            format[2] = (opts.displayFormat.match('D') ? '!' : '#');
            format[3] = (opts.displayFormat.match('H') ? '!' : '#');
            format[4] = (opts.displayFormat.match('M') ? '!' : '#');
            format[5] = (opts.displayFormat.match('S') ? '!' : '#');
            opts.displayFormat = format.join('');
        } else {
            opts.displayFormat = "###!!!";
        }
        if (options.borderColor !== undefined || options.fontColor !== undefined || options.backgroundColor !== undefined) {
            var customStyle = {
                "background": backgroundColor,
                "color": fontColor,
                "border-color": borderColor
            };
            $this.css(customStyle);
        } else {
            $this.addClass("colorDefinition");
        }
        if (opts.labelsFormat === false) {
            if (options.size !== undefined) {
                switch (size) {
                    case "xl":
                        $this.addClass("size_xl");
                        break;
                    case "lg":
                        $this.addClass("size_lg");
                        break;
                    case "md":
                        $this.addClass("size_md");
                        break;
                    case "sm":
                        $this.addClass("size_sm");
                        break;
                    case "xs":
                        $this.addClass("size_xs");
                        break;
                }
            } else if (size === "sm") {
                $this.addClass("size_sm");
            }
        }
        if (opts.isRTL === true) {
            $this.addClass("lang-rtl");
        }
        if (options.startDate === undefined && options.dateAndTime === undefined && options.currentTime === undefined && (options.hours !== undefined || options.minutes !== undefined || options.seconds !== undefined)) {
            if (options.hours !== undefined && options.minutes === undefined && options.seconds === undefined) {
                setTimerInterval($this, "H", opts, onlyHours, options);
            } else if (options.hours === undefined && options.minutes !== undefined && options.seconds === undefined) {
                setTimerInterval($this, "M", opts, onlyMinutes, options);
            } else if (options.hours === undefined && options.minutes === undefined && options.seconds !== undefined) {
                setTimerInterval($this, "S", opts, onlySeconds, options);
            } else if (options.hours !== undefined && options.minutes !== undefined && options.seconds === undefined) {
                setTimerInterval($this, "HM", opts, hoursMinutes, options);
            } else if (options.hours === undefined && options.minutes !== undefined && options.seconds !== undefined) {
                setTimerInterval($this, "MS", opts, minutesSeconds, options);
            } else if (options.hours !== undefined && options.minutes === undefined && options.seconds !== undefined) {
                setTimerInterval($this, "HS", opts, hoursSeconds, options);
            } else if (options.hours !== undefined && options.minutes !== undefined && options.seconds !== undefined) {
                setTimerInterval($this, "HMS", opts, hoursMinutesSeconds, options);
            }
        } else if (options.startDate !== undefined && options.dateAndTime !== undefined && options.currentTime === undefined) {
            window['startDate' + $this.attr('id')] = new Date(opts.startDate);
            window['endDate' + $this.attr('id')] = (opts.timeZone !== null ? setTimezone(new Date(opts.dateAndTime), opts.timeZone) : new Date(opts.dateAndTime));
            var typeStart = "withStart";
            if (options.beforeExpiryTime !== undefined) {
                window['beforeExpiry_' + typeStart + $this.attr('id')] = opts.beforeExpiryTime;
            }
            givenDate($this, opts, typeStart);
            window['timer_startDate' + $this.attr('id')] = setInterval(function() {
                givenDate($this, opts, typeStart);
            }, opts.tickInterval * 1000);
        } else if (options.startDate === undefined && options.dateAndTime !== undefined && options.currentTime === undefined) {
            var hour = opts.startDate.getHours();
            var minutes = opts.startDate.getMinutes();
            var seconds = opts.startDate.getSeconds();
            var month = (opts.startDate.getMonth() + 1);
            var date = opts.startDate.getDate();
            var year = opts.startDate.getFullYear();
            var timeStart = new Date(year + '/' + month + '/' + date + ' ' + hour + ':' + minutes + ':' + seconds);
            window['startTime' + $this.attr('id')] = timeStart;
            window['dateTime' + $this.attr('id')] = (opts.timeZone !== null ? setTimezone(new Date(opts.dateAndTime), opts.timeZone) : new Date(opts.dateAndTime));
            var typeNostart = "withnoStart";
            if (options.beforeExpiryTime !== undefined) {
                window['beforeExpiry_' + typeNostart + $this.attr('id')] = opts.beforeExpiryTime;
            }
            givenDate($this, opts, typeNostart);
            window['timer_givenDate' + $this.attr('id')] = setInterval(function() {
                givenDate($this, opts, typeNostart);
            }, opts.tickInterval * 1000);
        } else if (options.currentTime !== undefined && opts.currentTime === true) {
            currentDate($this, opts);
            window['timer_currentDate' + $this.attr('id')] = setInterval(function() {
                currentDate($this, opts);
            }, opts.tickInterval * 1000);
        } else {
            window['countSeconds' + $this.attr('id')] = opts.seconds;
            secondsTimer($this, opts);
            window['timer_secondsTimer' + $this.attr('id')] = setInterval(function() {
                secondsTimer($this, opts);
            }, 1000);
        }
    }

    function setTimerInterval($this, timerType, opts, funcName, options) {
        $this.data('typefunc', {
            type: timerType,
            func: funcName
        });
        window['hours_' + timerType + $this.attr('id')] = opts.hours;
        window['minutes_' + timerType + $this.attr('id')] = opts.minutes;
        window['seconds_' + timerType + $this.attr('id')] = opts.seconds;
        if (options.beforeExpiryTime !== undefined) {
            window['beforeExpiry_' + timerType + $this.attr('id')] = opts.beforeExpiryTime;
        }
        if (options.pauseButton !== undefined) {
            pauseTimer($this, timerType, opts, funcName);
        }
        if (options.stopButton !== undefined) {
            stopTimer($this, timerType, opts, funcName);
        }
        funcName($this, opts);
        window['timer_' + timerType + $this.attr('id')] = setInterval(function() {
            funcName($this, opts);
        }, opts.tickInterval * 1000);
    }

    function setTimezone(datetime, offset) {
        var newTime = (new Date((datetime.getTime() + (datetime.getTimezoneOffset() * 60000)) + (60000 * (Math.abs(offset) < 30 ? offset * 60 : offset))));
        return newTime;
    }

    //Function for only hours are set when invoking plugin.
    function onlyHours($this, opts) {
        var id = $this.attr('id');
        var time = "";
        if (window['minutes_H' + id] === opts.minutes && window['seconds_H' + id] === opts.seconds && window['hours_H' + id] === opts.hours) {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_H' + id], 0, 0);
            html($this, time, opts);
            if (typeof window['beforeExpiry_H' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'H');
            }
            window['seconds_H' + id] = 60 - opts.tickInterval;
            window['minutes_H' + id] = 59;
            if (window['hours_H' + id] !== 0) {
                window['hours_H' + id]--;
            } else {
                clearTimerInterval($this, "H", opts);
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, "H", opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_H' + id], window['minutes_H' + id], window['seconds_H' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_H' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'H');
            }
            window['seconds_H' + id] -= opts.tickInterval;
            if (window['minutes_H' + id] !== 0 && window['seconds_H' + id] < 0) {
                window['minutes_H' + id]--;
                window['seconds_H' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_H' + id] === 0 && window['seconds_H' + id] < 0 && window['hours_H' + id] !== 0) {
                window['hours_H' + id]--;
                window['minutes_H' + id] = 59;
                window['seconds_H' + id] = 60 - opts.tickInterval;
            }
            if ((window['minutes_H' + id] === 0 && window['seconds_H' + id] < 0 && window['hours_H' + id] === 0) || $this.data('countdowntimer').destroy === true) {
                clearTimerInterval($this, "H", opts);
            }
        }
        id = null;
    }

    //Function for only minutes are set when invoking plugin.
    function onlyMinutes($this, opts) {
        var id = $this.attr('id');
        var time = "";
        if (window['minutes_M' + id] === opts.minutes && window['seconds_M' + id] === opts.seconds) {
            time = prepareTime($this, opts, 0, 0, 0, 0, window['minutes_M' + id], 0);
            html($this, time, opts);
            if (typeof window['beforeExpiry_M' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'M');
            }
            window['seconds_M' + id] = 60 - opts.tickInterval;
            if (window['minutes_M' + id] !== 0) {
                window['minutes_M' + id]--;
            } else {
                clearTimerInterval($this, "M", opts);
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, "M", opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, 0, window['minutes_M' + id], window['seconds_M' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_M' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'M');
            }
            window['seconds_M' + id] -= opts.tickInterval;
            if (window['minutes_M' + id] !== 0 && window['seconds_M' + id] < 0) {
                window['minutes_M' + id]--;
                window['seconds_M' + id] = 60 - opts.tickInterval;
            }
            if ((window['minutes_M' + id] === 0 && window['seconds_M' + id] < 0) || $this.data('countdowntimer').destroy === true) {
                clearTimerInterval($this, "M", opts);
            }
        }
        id = null;
    }

    //Function for only seconds are set when invoking plugin.
    function onlySeconds($this, opts) {
        var id = $this.attr('id');
        var time = "";
        time = prepareTime($this, opts, 0, 0, 0, 0, 0, window['seconds_S' + id]);
        html($this, time, opts);
        if (typeof window['beforeExpiry_S' + id] !== 'undefined') {
            beforeExpiryTime($this, opts, time, 'S');
        }
        window['seconds_S' + id] -= opts.tickInterval;
        if ((window['seconds_S' + id] < 0) || ($this.data('countdowntimer').destroy === true)) {
            clearTimerInterval($this, "S", opts);
        }
        id = null;
    }

    //Function for hours and minutes are set when invoking plugin.
    function hoursMinutes($this, opts) {
        var id = $this.attr('id');
        var time = "";
        if (window['minutes_HM' + id] === opts.minutes && window['hours_HM' + id] === opts.hours) {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_HM' + id], window['minutes_HM' + id], 0);
            html($this, time, opts);
            if (typeof window['beforeExpiry_HM' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'HM');
            }
            if (window['hours_HM' + id] !== 0 && window['minutes_HM' + id] === 0) {
                window['hours_HM' + id]--;
                window['minutes_HM' + id] = 59;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HM' + id] === 0 && window['minutes_HM' + id] !== 0) {
                window['seconds_HM' + id] = 60 - opts.tickInterval;
                window['minutes_HM' + id]--;
            } else {
                window['seconds_HM' + id] = 60 - opts.tickInterval;
                window['minutes_HM' + id]--;
            }
            if (window['hours_HM' + id] === 0 && window['minutes_HM' + id] === 0 && window['seconds_HM' + id] == 60) {
                clearTimerInterval($this, "HM", opts);
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, "HM", opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_HM' + id], window['minutes_HM' + id], window['seconds_HM' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_HM' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'HM');
            }
            window['seconds_HM' + id] -= opts.tickInterval;
            if (window['minutes_HM' + id] !== 0 && window['seconds_HM' + id] < 0) {
                window['minutes_HM' + id]--;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HM' + id] === 0 && window['seconds_HM' + id] < 0 && window['hours_HM' + id] !== 0) {
                window['hours_HM' + id]--;
                window['minutes_HM' + id] = 59;
                window['seconds_HM' + id] = 60 - opts.tickInterval;
            }
            if ((window['minutes_HM' + id] === 0 && window['seconds_HM' + id] < 0 && window['hours_HM' + id] === 0) || $this.data('countdowntimer').destroy === true) {
                clearTimerInterval($this, "HM", opts);
            }
        }
        id = null;
    }

    //Function for minutes and seconds are set when invoking plugin.
    function minutesSeconds($this, opts) {
        var id = $this.attr('id');
        var time = "";
        if (window['minutes_MS' + id] === opts.minutes && window['seconds_MS' + id] === opts.seconds) {
            time = prepareTime($this, opts, 0, 0, 0, 0, window['minutes_MS' + id], window['seconds_MS' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_MS' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'MS');
            }
            if (window['minutes_MS' + id] !== 0 && window['seconds_MS' + id] === 0) {
                window['minutes_MS' + id]--;
                window['seconds_MS' + id] = 60 - opts.tickInterval;
            } else if (window['minutes_MS' + id] === 0 && window['seconds_MS' + id] === 0) {
                clearTimerInterval($this, "MS", opts);
            } else {
                window['seconds_MS' + id] -= opts.tickInterval;
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, "MS", opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, 0, window['minutes_MS' + id], window['seconds_MS' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_MS' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'MS');
            }
            window['seconds_MS' + id] -= opts.tickInterval;
            if (window['minutes_MS' + id] !== 0 && window['seconds_MS' + id] < 0) {
                window['minutes_MS' + id]--;
                window['seconds_MS' + id] = 60 - opts.tickInterval;
            }
            if ((window['minutes_MS' + id] === 0 && window['seconds_MS' + id] < 0) || $this.data('countdowntimer').destroy === true) {
                clearTimerInterval($this, "MS", opts);
            }
        }
        id = null;
    }

    //Function for hours and seconds are set when invoking plugin.
    function hoursSeconds($this, opts) {
        var id = $this.attr('id');
        var time = "";
        if (window['seconds_HS' + id] === opts.seconds && window['hours_HS' + id] === opts.hours) {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_HS' + id], 0, window['seconds_HS' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_HS' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'HS');
            }
            if (window['hours_HS' + id] === 0 && window['seconds_HS' + id] === 0) {
                clearTimerInterval($this, "HS", opts);
            } else if (window['hours_HS' + id] !== 0 && window['seconds_HS' + id] === 0) {
                window['hours_HS' + id]--;
                window['minutes_HS' + id] = 59;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            } else {
                window['seconds_HS' + id] -= opts.tickInterval;
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, "HS", opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_HS' + id], window['minutes_HS' + id], window['seconds_HS' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_HS' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'HS');
            }
            window['seconds_HS' + id] -= opts.tickInterval;
            if (window['minutes_HS' + id] !== 0 && window['seconds_HS' + id] < 0) {
                window['minutes_HS' + id]--;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HS' + id] === 0 && window['seconds_HS' + id] < 0 && window['hours_HS' + id] !== 0) {
                window['hours_HS' + id]--;
                window['minutes_HS' + id] = 59;
                window['seconds_HS' + id] = 60 - opts.tickInterval;
            }
            if ((window['minutes_HS' + id] === 0 && window['seconds_HS' + id] < 0 && window['hours_HS' + id] === 0) || $this.data('countdowntimer').destroy === true) {
                clearTimerInterval($this, "HS", opts);
            }
        }
        id = null;
    }

    //Function for hours, minutes and seconds are set when invoking plugin.
    function hoursMinutesSeconds($this, opts) {
        var id = $this.attr('id');
        var time = "";
        if (window['minutes_HMS' + id] === opts.minutes && window['seconds_HMS' + id] === opts.seconds && window['hours_HMS' + id] === opts.hours) {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_HMS' + id], window['minutes_HMS' + id], window['seconds_HMS' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_HMS' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'HMS');
            }
            if (window['hours_HMS' + id] === 0 && window['minutes_HMS' + id] === 0 && window['seconds_HMS' + id] === 0) {
                clearTimerInterval($this, "HMS", opts);
            } else if (window['hours_HMS' + id] !== 0 && window['minutes_HMS' + id] === 0 && window['seconds_HMS' + id] === 0) {
                window['hours_HMS' + id]--;
                window['minutes_HMS' + id] = 59;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HMS' + id] === 0 && window['minutes_HMS' + id] !== 0 && window['seconds_HMS' + id] === 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else if (window['hours_HMS' + id] !== 0 && window['minutes_HMS' + id] !== 0 && window['seconds_HMS' + id] === 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            } else {
                window['seconds_HMS' + id] -= opts.tickInterval;
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, "HMS", opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, window['hours_HMS' + id], window['minutes_HMS' + id], window['seconds_HMS' + id]);
            html($this, time, opts);
            if (typeof window['beforeExpiry_HMS' + id] !== 'undefined') {
                beforeExpiryTime($this, opts, time, 'HMS');
            }
            window['seconds_HMS' + id] -= opts.tickInterval;
            if (window['minutes_HMS' + id] !== 0 && window['seconds_HMS' + id] < 0) {
                window['minutes_HMS' + id]--;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            }
            if (window['minutes_HMS' + id] === 0 && window['seconds_HMS' + id] < 0 && window['hours_HMS' + id] !== 0) {
                window['hours_HMS' + id]--;
                window['minutes_HMS' + id] = 59;
                window['seconds_HMS' + id] = 60 - opts.tickInterval;
            }
            if ((window['minutes_HMS' + id] === 0 && window['seconds_HMS' + id] < 0 && window['hours_HMS' + id] === 0) || $this.data('countdowntimer').destroy === true) {
                clearTimerInterval($this, "HMS", opts);
            }
        }
        id = null;
    }

    //Function for reverse timer to given date.
    function givenDate($this, opts, type) {
        var id = $this.attr('id');
        var endDate = (type === "withnoStart") ? window['dateTime' + id] : window['endDate' + id];
        var startDate = (type === "withnoStart") ? window['startTime' + id] : window['startDate' + id];
        var totalSeconds = ((endDate - startDate) / 1000);
        var time = "";
        if ((endDate - startDate) > 0) {
            if (type === "withStart" && (startDate > (new Date()))) {
                time = prepareTime($this, opts, 0, 0, 0, 0, 0, 0);
                html($this, time, opts);
            } else {
                time = prepareTime($this, opts, 0, 0, 0, 0, 0, totalSeconds);
                html($this, time, opts);
                if (typeof window['beforeExpiry_' + type + id] !== 'undefined') {
                    beforeExpiryTime($this, opts, time, type);
                }
                var setSecondsInterval = ((type == "withnoStart") ? (window['startTime' + id].setSeconds(window['startTime' + id].getSeconds() + opts.tickInterval)) : (window['startDate' + id].setSeconds(window['startDate' + id].getSeconds() + opts.tickInterval)));
            }
            if ($this.data('countdowntimer').destroy === true) clearTimerInterval($this, type, opts);
        } else {
            time = prepareTime($this, opts, 0, 0, 0, 0, 0, 0);
            html($this, time, opts);
            clearTimerInterval($this, type, opts);
        }
        id = null;
    }

    //Function for displaying current time.
    function currentDate($this, opts) {
        var time = "";
        var today = (opts.timeZone !== null ? setTimezone(new Date(), opts.timeZone) : new Date());
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        time = prepareTime($this, opts, 0, 0, 0, hours, minutes, seconds);
        html($this, time, opts);
    }

    //Default function called when no options are set.
    function secondsTimer($this, opts) {
        var id = $this.attr('id');
        if (window['countSeconds' + id].toString().length < 2) {
            window['countSeconds' + id] = "0" + window['countSeconds' + id];
        }
        $this.html(window['countSeconds' + id] + " " + "sec");
        window['countSeconds' + id]--;
        if (window['countSeconds' + id] == -1) {
            delete window['countSeconds' + id];
            clearInterval(window['timer_secondsTimer' + id]);
        }
        id = null;
    }

    //Function for calling the given function name when time is expired.
    function timeUp($this, opts) {
        if (opts.timeUp !== null) {
            if ($.isFunction(opts.timeUp) === true) {
                opts.timeUp.apply($this, []);
            }
        }
        if (opts.expiryUrl !== null) {
            window.location = opts.expiryUrl;
        }
    }

    //Function for calling the given function name before expiry time.
    function beforeExpiryTime($this, opts, time, type) {
        var id = $this.attr('id');
        var bforeExpTime = window['beforeExpiry_' + type + id];
        bforeExpTime = bforeExpTime.split(":");
        time = time.split(opts.timeSeparator);
        if (time[0] === "0" && time[1] === "0") {
            for (var m = 0; m < (time.length - 2); m++) {
                time[m] = (time[m + 2] < 10 ? "0" + time[m + 2] : time[m + 2]);
            }
            time.splice(4, 2);
            if (bforeExpTime[0] === time[0] && bforeExpTime[1] === time[1] && bforeExpTime[2] === time[2] && bforeExpTime[3] === time[3]) {
                if (opts.beforeExpiryTimeFunction !== null) {
                    if ($.isFunction(opts.beforeExpiryTimeFunction) === true) {
                        opts.beforeExpiryTimeFunction.apply($this, []);
                    }
                }
            }
        }
    }

    function prepareTime($this, opts, years, months, days, hours, minutes, seconds) {
        if (typeof(years) === 'undefined') years = 0;
        if (typeof(months) === 'undefined') months = 0;
        if (typeof(days) === 'undefined') days = 0;
        if (typeof(hours) === 'undefined') hours = 0;
        if (typeof(minutes) === 'undefined') minutes = 0;
        if (typeof(seconds) === 'undefined') seconds = 0;
        var s = (Math.round(years * 31536000 * 100) / 100) + (Math.round(months * 2628000 * 100) / 100) + (Math.round(days * 86400 * 100) / 100) + (Math.round(hours * 3600 * 100) / 100) + (Math.round(minutes * 60 * 100) / 100) + (Math.round(seconds * 100) / 100);
        var format = opts.displayFormat.split('');
        var yearsFormat = (format[0] === "!" ? (Math.floor(s / 31536000)) : 0);
        var monthsFormat = (format[1] === "!" ? (Math.round(Math.floor((s / 2628000) - ((yearsFormat * 31536000) / 2628000)))) : 0);
        var daysFormat = (format[2] === "!" ? (Math.round(Math.floor((s / 86400) - ((monthsFormat * 2628000) / 86400) - ((yearsFormat * 31536000) / 86400)))) : 0);
        var hoursFormat = (format[3] === "!" ? (Math.round(Math.floor((s / 3600) - ((monthsFormat * 2628000) / 3600) - ((yearsFormat * 31536000) / 3600) - ((daysFormat * 86400) / 3600)))) : 0);
        var minutesFormat = (format[4] === "!" ? (Math.round(Math.floor((s / 60) - ((hoursFormat * 3600) / 60) - ((daysFormat * 86400) / 60) - ((monthsFormat * 2628000) / 60) - ((yearsFormat * 31536000) / 60)))) : 0);
        var secondsFormat = (format[5] === "!" ? (Math.round(Math.floor(s - (minutesFormat * 60) - (hoursFormat * 3600) - (daysFormat * 86400) - (monthsFormat * 2628000) - (yearsFormat * 31536000)))) : 0);
        var time = yearsFormat + opts.timeSeparator + monthsFormat + opts.timeSeparator + daysFormat + opts.timeSeparator + hoursFormat + opts.timeSeparator + minutesFormat + opts.timeSeparator + secondsFormat;
        return time;
    }

    //Function for displaying the timer.
    function html($this, time, opts) {
        var format = opts.displayFormat.split('');
        time = time.split(opts.timeSeparator);
        time = $.grep([time[0], time[1], time[2], time[3], time[4], time[5]], function(arr, i) {
            return (arr >= 0 && format[i] === "!");
        }).join(opts.timeSeparator);
        time = time.split(opts.timeSeparator);
        for (var i = 0; i < time.length; i++) {
            if (time[i].toString().length < 2 && opts.padZeroes === true) {
                time[i] = "0" + time[i];
            }
        }
        time = time.join(opts.timeSeparator).toString();
        for (var k = 0; k < 10; k++) {
            var replace = k.toString();
            var re = new RegExp(replace, "g");
            time = time.replace(re, opts.digits[k]);
        }
        if (opts.labelsFormat === true && typeof window['regexpMatchFormat_' + $this.attr('id')] === 'undefined' &&
            typeof window['regexpReplaceWith_' + $this.attr('id')] === 'undefined') {
            $this.addClass("labelformat");
            time = time.split(opts.timeSeparator);
            var labelTime = "<span class='timerDisplay label" + time.length + "'>";
            var labelarr = [];
            for (var j = 0; j < 6; j++) {
                if (format[j] === "!")
                    labelarr.push(opts.labels[j]);
            }
            for (var a = time.length; a > 0; a--) {
                var itr = time.length - a;
                labelTime += "<span class='displaySection'><span class='numberDisplay'>" + time[itr] + "</span><span class='periodDisplay'>" + labelarr[itr] + "</span></span>";
            }
            time = labelTime += "</span>";
        } else if (opts.labelsFormat === false && typeof window['regexpMatchFormat_' + $this.attr('id')] !== 'undefined' &&
            typeof window['regexpReplaceWith_' + $this.attr('id')] !== 'undefined') {
            var regexp = new RegExp(window['regexpMatchFormat_' + $this.attr('id')]);
            time = time.replace(regexp,
                window['regexpReplaceWith_' + $this.attr('id')]);
        }
        $this.html(time);
    }

    //Function to Pause/Resume Timer.
    function pauseTimer($this, timerType, opts, func) {
        if ($this.data('countdowntimer').pause === 'pause') {
            clearInterval(window['timer_' + timerType + $this.attr('id')]);
        } else if ($this.data('countdowntimer').pause === 'resume') {
            window['timer_' + timerType + $this.attr('id')] = setInterval(function() {
                func($this, opts);
            }, opts.tickInterval * 1000);
        }
        $("#" + opts.pauseButton).click(function() {
            if ($(this).val() != "resume") {
                $("#" + opts.pauseButton).val("resume").text("Resume");
                clearInterval(window['timer_' + timerType + $this.attr('id')]);
            } else if ($(this).val() == "resume") {
                $("#" + opts.pauseButton).val("pause").text("Pause");
                window['timer_' + timerType + $this.attr('id')] = setInterval(function() {
                    func($this, opts);
                }, opts.tickInterval * 1000);
            }
        });
    }

    //Function to Start/Stop Timer.
    function stopTimer($this, timerType, opts, func) {
        if ($this.data('countdowntimer').stop === 'stop') {
            clearInterval(window['timer_' + timerType + $this.attr('id')]);
            window['hours_' + timerType + $this.attr('id')] = opts.hours;
            window['minutes_' + timerType + $this.attr('id')] = opts.minutes;
            window['seconds_' + timerType + $this.attr('id')] = opts.seconds;
            func($this, opts);
        } else if ($this.data('countdowntimer').stop === 'start') {
            window['timer_' + timerType + $this.attr('id')] = setInterval(function() {
                func($this, opts);
            }, opts.tickInterval * 1000);
        }
        $("#" + opts.stopButton).click(function() {
            if ($(this).val() != "start") {
                $("#" + opts.stopButton).val("start").text("Start");
                clearInterval(window['timer_' + timerType + $this.attr('id')]);
                window['hours_' + timerType + $this.attr('id')] = opts.hours;
                window['minutes_' + timerType + $this.attr('id')] = opts.minutes;
                window['seconds_' + timerType + $this.attr('id')] = opts.seconds;
                func($this, opts);
            } else if ($(this).val() == "start") {
                $("#" + opts.stopButton).val("stop").text("Stop");
                window['timer_' + timerType + $this.attr('id')] = setInterval(function() {
                    func($this, opts);
                }, opts.tickInterval * 1000);
            }
        });
    }

    function clearTimerInterval($this, timerType, opts) {
        var id = $this.attr('id');
        if (timerType === "withnoStart") {
            delete window['dateTime' + id];
            delete window['startTime' + id];
            clearInterval(window['timer_givenDate' + id]);
        } else if (timerType === "withStart") {
            delete window['startDate' + id];
            delete window['endDate' + id];
            clearInterval(window['timer_startDate' + id]);
        } else {
            delete window['hours_' + timerType + id];
            delete window['minutes_' + timerType + id];
            delete window['seconds_' + timerType + id];
            clearInterval(window['timer_' + timerType + id]);
        }
        if ($this.data('countdowntimer').destroy === true) {
            $this.empty().removeClass();
        } else {
            timeUp($this, opts);
        }
    }

    //Giving default value for options.
    $.fn.countdowntimer.defaults = {
        hours: 0,
        minutes: 0,
        seconds: 60,
        startDate: new Date(),
        dateAndTime: new Date("1970/01/01 00:00:00"),
        currentTime: false,
        size: "sm",
        borderColor: "#F0068E",
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        timeSeparator: ":",
        tickInterval: 1,
        timeUp: null,
        expiryUrl: null,
        regexpMatchFormat: null,
        regexpReplaceWith: null,
        pauseButton: null,
        stopButton: null,
        beforeExpiryTime: null,
        beforeExpiryTimeFunction: null,
        padZeroes: true,
        displayFormat: "HMS",
        labelsFormat: false,
        timeZone: null
    };

    $.fn.countdowntimer.regionalOptions = {
        digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        labels: ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds'],
        isRTL: false
    };

}(jQuery));
