/*

 * Author - Harshen Amarnath Pandey
 * Version - 1.0.4
 * Release - 13th January 2014
 * Copyright (c) 2014 - 2018 Harshen Pandey
*/

(function( $ ) {

    $.fn.countdowntimer = function( options ) {
        return this.each( function() {
            countdown( $(this), options );
        });
    };

    //Definition of private function countdown.
    function countdown( $this , options ) {
        var opts = $.extend( {}, $.fn.countdowntimer.defaults, options );
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
        
        if(options.borderColor != undefined || options.fontColor != undefined || options.backgroundColor != undefined) {
            var customStyle = {
                "background": backgroundColor,
                "color" : fontColor,
                "border-color" : borderColor
            }
            $this.css(customStyle);
        } else {
            $this.addClass("colorDefinition");
        }
        
        if(options.size != undefined) {
            switch(size) {
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
        } else if(size == "sm") {
            $this.addClass("size_sm");
        }

        if(options.dateAndTime == undefined && options.currentTime == undefined && (options.hours != undefined || options.minutes != undefined || options.seconds != undefined)) {

            if(options.hours != undefined && options.minutes == undefined && options.seconds == undefined) {
                hours_H = "";
                minutes_H = "";
                seconds_H = "";
                timer_H = "";
                window.hours_H = opts.hours;
                window.minutes_H = opts.minutes;
                window.seconds_H = opts.seconds;
                window.timer_H = setInterval(function(){
                    onlyHours($this, opts)
                },1000);
            } else if(options.hours == undefined && options.minutes != undefined && options.seconds == undefined) {
                hours_M = "";
                minutes_M = "";
                seconds_M = "";
                timer_M = "";
                window.hours_M = opts.hours;
                window.minutes_M = opts.minutes;
                window.seconds_M = opts.seconds;
                window.timer_M = setInterval(function(){
                    onlyMinutes($this, opts)
                },1000);
            } else if(options.hours == undefined && options.minutes == undefined && options.seconds != undefined) {
                hours_S = "";
                minutes_S = "";
                seconds_S = "";
                timer_S = "";
                window.hours_S = opts.hours;
                window.minutes_S = opts.minutes;
                window.seconds_S = opts.seconds;
                window.timer_S = setInterval(function(){
                    onlySeconds($this, opts)
                },1000);
            } else if(options.hours != undefined && options.minutes != undefined && options.seconds == undefined) {
                hours_HM = "";
                minutes_HM = "";
                seconds_HM = "";
                timer_HM = "";
                window.hours_HM = opts.hours;
                window.minutes_HM = opts.minutes;
                window.seconds_HM = opts.seconds;
                window.timer_HM = setInterval(function(){
                    hoursMinutes($this, opts)
                },1000);
            } else if(options.hours == undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_MS = "";
                minutes_MS = "";
                seconds_MS = "";
                timer_MS = "";
                window.hours_MS = opts.hours;
                window.minutes_MS = opts.minutes;
                window.seconds_MS = opts.seconds;
                window.timer_MS = setInterval(function(){
                    minutesSeconds($this, opts)
                },1000);
            } else if(options.hours != undefined && options.minutes == undefined && options.seconds != undefined) {
                hours_HS = "";
                minutes_HS = "";
                seconds_HS = "";
                timer_HS = "";
                window.hours_HS = opts.hours;
                window.minutes_HS = opts.minutes;
                window.seconds_HS = opts.seconds;
                window.timer_HS = setInterval(function(){
                    hoursSeconds($this, opts)
                },1000);
            } else if(options.hours != undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_HMS = "";
                minutes_HMS = "";
                seconds_HMS = "";
                timer_HMS = "";
                window.hours_HMS = opts.hours;
                window.minutes_HMS = opts.minutes;
                window.seconds_HMS = opts.seconds;
                window.timer_HMS = setInterval(function(){
                    hoursMinutesSeconds($this, opts)
                },1000);
            }

        } else if(options.dateAndTime != undefined && options.currentTime == undefined) {
            dateTime = "";
            timer_givenDate = "";
            window.dateTime = opts.dateAndTime;
            window.timer_givenDate = setInterval(function(){
                givenDate($this)
            },1000);
        } else if(options.currentTime != undefined) {
            currentTime = "";
            timer_currentDate = "";
            window.currentTime = opts.currentTime;
            window.timer_currentDate = setInterval(function(){
                currentDate($this)
            },1000);
        } else {
            countSeconds = "";
            timer_secondsTimer = "";
            window.countSeconds = opts.seconds;
            window.timer_secondsTimer = setInterval(function(){
                secondsTimer($this)
            },1000);
        }
    };

    //Function for only hours are set when invoking plugin.
    function onlyHours($this, opts) {
        if(window.minutes_H == opts.minutes && window.seconds_H == opts.seconds && window.hours_H == opts.hours) {
            if(window.hours_H.toString().length < 2) {
                window.hours_H = "0" + window.hours_H;
            }
            $this.html(window.hours_H+":"+"00"+":"+"00");
            window.seconds_H = 59;
            window.minutes_H = 59;
            if(window.hours_H != 0) {
                window.hours_H--;
            } else {
                delete window.hours_H;
                delete window.minutes_H;
                delete window.seconds_H;
                clearInterval(window.timer_H);
            }
        } else {
            if(window.hours_H.toString().length < 2) {
                window.hours_H = "0" + window.hours_H;
            }
            if(window.minutes_H.toString().length < 2) {
                window.minutes_H = "0" + window.minutes_H;
            }
            if(window.seconds_H.toString().length < 2) {
                window.seconds_H = "0" + window.seconds_H;
            }
            $this.html(window.hours_H+":"+window.minutes_H+":"+window.seconds_H);
            window.seconds_H--;
            if (window.minutes_H!=0 && window.seconds_H < 0){
                window.minutes_H--;
                window.seconds_H = 59
            }
            if(window.minutes_H==0 && window.seconds_H==-1 && window.hours_H != 0)
            {
                window.hours_H--;
                window.minutes_H = 59;
                window.seconds_H = 59;
            }
            if(window.minutes_H==0 && window.seconds_H==-1 && window.hours_H == 0)
            {
                delete window.hours_H;
                delete window.minutes_H;
                delete window.seconds_H;
                clearInterval(window.timer_H);
            }
        }
    }

    //Function for only minutes are set when invoking plugin.
    function onlyMinutes($this, opts) {
        if(window.minutes_M == opts.minutes && window.seconds_M == opts.seconds) {
            if(window.minutes_M.toString().length < 2) {
                window.minutes_M = "0" + window.minutes_M;
            }
            $this.html(window.minutes_M+":"+"00");
            window.seconds_M = 59;
            if(window.minutes_M != 0) {
                window.minutes_M--;
            } else {
                delete window.hours_M;
                delete window.minutes_M;
                delete window.seconds_M;
                clearInterval(window.timer_M);
            }
        } else {
            if(window.minutes_M.toString().length < 2) {
                window.minutes_M = "0" + window.minutes_M;
            }
            if(window.seconds_M.toString().length < 2) {
                window.seconds_M = "0" + window.seconds_M;
            }
            $this.html(window.minutes_M+":"+window.seconds_M);
            window.seconds_M--;
            if (window.minutes_M!=0 && window.seconds_M < 0){
                window.minutes_M--;
                window.seconds_M = 59
            }
            if(window.minutes_M==0 && window.seconds_M==-1)
            {
                delete window.hours_M;
                delete window.minutes_M;
                delete window.seconds_M;
                clearInterval(window.timer_M);
            }
        }
    }

    //Function for only seconds are set when invoking plugin.
    function onlySeconds($this, opts) {
        if(window.seconds_S.toString().length < 2) {
            window.seconds_S = "0" + window.seconds_S;
        }
        $this.html(window.seconds_S+" "+"sec");
        window.seconds_S--;
        if(window.seconds_S==-1)
        {
            delete window.hours_S;
            delete window.minutes_S;
            delete window.seconds_S;
            clearInterval(window.timer_S);
        }
    }

    //Function for hours and minutes are set when invoking plugin.
    function hoursMinutes($this, opts) {
        if(window.minutes_HM == opts.minutes && window.hours_HM == opts.hours) {
            if(window.hours_HM.toString().length < 2) {
                window.hours_HM = "0" + window.hours_HM;
            }
            if(window.minutes_HM.toString().length < 2) {
                window.minutes_HM = "0" + window.minutes_HM;
            }
            $this.html(window.hours_HM+":"+window.minutes_HM+":"+"00");
            if(window.hours_HM != 0 && window.minutes_HM == 0) {
                window.hours_HM--;
                window.minutes_HM = 59;
                window.seconds_HM = 59;
            } else if(window.hours_HM == 0 && window.minutes_HM != 0) {
                window.seconds_HM = 59;
                window.minutes_HM--;
            } else {
                window.seconds_HM = 59;
                window.minutes_HM--;
            }
            if(window.hours_HM == 0 && window.minutes_HM == 0 && window.seconds_HM == 60)
            {
                delete window.hours_HM;
                delete window.minutes_HM;
                delete window.seconds_HM;
                clearInterval(window.timer_HM);
            }
        } else {
            if(window.hours_HM.toString().length < 2) {
                window.hours_HM = "0" + window.hours_HM;
            }
            if(window.minutes_HM.toString().length < 2) {
                window.minutes_HM = "0" + window.minutes_HM;
            }
            if(window.seconds_HM.toString().length < 2) {
                window.seconds_HM = "0" + window.seconds_HM;
            }
            $this.html(window.hours_HM+":"+window.minutes_HM+":"+window.seconds_HM);
            window.seconds_HM--;
            if (window.minutes_HM!=0 && window.seconds_HM < 0){
                window.minutes_HM--;
                window.seconds_HM = 59
            }
            if(window.minutes_HM==0 && window.seconds_HM==-1 && window.hours_HM != 0)
            {
                window.hours_HM--;
                window.minutes_HM = 59;
                window.seconds_HM = 59;
            }
            if(window.minutes_HM==0 && window.seconds_HM==-1 && window.hours_HM == 0)
            {
                delete window.hours_HM;
                delete window.minutes_HM;
                delete window.seconds_HM;
                clearInterval(window.timer_HM);
            }
        }
    }

    //Function for minutes and seconds are set when invoking plugin.
    function minutesSeconds($this, opts) {
        if(window.minutes_MS == opts.minutes && window.seconds_MS == opts.seconds) {
            if(window.minutes_MS.toString().length < 2) {
                window.minutes_MS = "0" + window.minutes_MS;
            }
            if(window.seconds_MS.toString().length < 2) {
                window.seconds_MS = "0" + window.seconds_MS;
            }
            $this.html(window.minutes_MS+":"+window.seconds_MS);
            if(window.minutes_MS != 0 && window.seconds_MS == 0) {
                window.minutes_MS--;
                window.seconds_MS = 59;
            } else if(window.minutes_MS == 0 && window.seconds_MS == 0) {
                delete window.hours_MS;
                delete window.minutes_MS;
                delete window.seconds_MS;
                clearInterval(window.timer_MS);
            } else {
                window.seconds_MS--;
            }
        } else {
            if(window.minutes_MS.toString().length < 2) {
                window.minutes_MS = "0" + window.minutes_MS;
            }
            if(window.seconds_MS.toString().length < 2) {
                window.seconds_MS = "0" + window.seconds_MS;
            }
            $this.html(window.minutes_MS+":"+window.seconds_MS);
            window.seconds_MS--;
            if (window.minutes_MS!=0 && window.seconds_MS < 0){
                window.minutes_MS--;
                window.seconds_MS = 59
            }
            if(window.minutes_MS==0 && window.seconds_MS==-1)
            {
                delete window.hours_MS;
                delete window.minutes_MS;
                delete window.seconds_MS;
                clearInterval(window.timer_MS);
            }
        }
    }

    //Function for hours and seconds are set when invoking plugin.
    function hoursSeconds($this, opts) {
        if(window.seconds_HS == opts.seconds && window.hours_HS == opts.hours) {
            if(window.hours_HS.toString().length < 2) {
                window.hours_HS = "0" + window.hours_HS;
            }
            if(window.seconds_HS.toString().length < 2) {
                window.seconds_HS = "0" + window.seconds_HS;
            }
            $this.html(window.hours_HS+":"+"00"+":"+window.seconds_HS);
            if(window.hours_HS == 0 && window.seconds_HS == 0) {
                delete window.hours_HS;
                delete window.minutes_HS;
                delete window.seconds_HS;
                clearInterval(window.timer_HS);
            } else if(window.hours_HS != 0 && window.seconds_HS == 0) {
                window.hours_HS--;
                window.minutes_HS = 59;
                window.seconds_HS = 59;
            } else {
                window.seconds_HS--;
            }
        } else {
            if(window.hours_HS.toString().length < 2) {
                window.hours_HS = "0" + window.hours_HS;
            }
            if(window.minutes_HS.toString().length < 2) {
                window.minutes_HS = "0" + window.minutes_HS;
            }
            if(window.seconds_HS.toString().length < 2) {
                window.seconds_HS = "0" + window.seconds_HS;
            }
            $this.html(window.hours_HS+":"+window.minutes_HS+":"+window.seconds_HS);
            window.seconds_HS--;
            if (window.minutes_HS!=0 && window.seconds_HS < 0){
                window.minutes_HS--;
                window.seconds_HS = 59
            }
            if(window.minutes_HS==0 && window.seconds_HS==-1 && window.hours_HS != 0)
            {
                window.hours_HS--;
                window.minutes_HS = 59;
                window.seconds_HS = 59;
            }
            if(window.minutes_HS==0 && window.seconds_HS==-1 && window.hours_HS == 0)
            {
                delete window.hours_HS;
                delete window.minutes_HS;
                delete window.seconds_HS;
                clearInterval(window.timer_HS);
            }
        }
    }

    //Function for hours, minutes and seconds are set when invoking plugin.
    function hoursMinutesSeconds($this, opts) {
        if(window.minutes_HMS == opts.minutes && window.seconds_HMS == opts.seconds && window.hours_HMS == opts.hours) {
            if(window.hours_HMS.toString().length < 2) {
                window.hours_HMS = "0" + window.hours_HMS;
            }
            if(window.minutes_HMS.toString().length < 2) {
                window.minutes_HMS = "0" + window.minutes_HMS;
            }
            if(window.seconds_HMS.toString().length < 2) {
                window.seconds_HMS = "0" + window.seconds_HMS;
            }
            $this.html(window.hours_HMS+":"+window.minutes_HMS+":"+window.seconds_HMS);
            if(window.hours_HMS == 0 && window.minutes_HMS == 0 && window.seconds_HMS == 0) {
                delete window.hours_HMS;
                delete window.minutes_HMS;
                delete window.seconds_HMS;
                clearInterval(window.timer_HMS);
            } else if(window.hours_HMS != 0 && window.minutes_HMS == 0 && window.seconds_HMS == 0) {
                window.hours_HMS--;
                window.minutes_HMS = 59;
                window.seconds_HMS = 59;
            } else if(window.hours_HMS == 0 && window.minutes_HMS != 0 && window.seconds_HMS == 0) {
                window.minutes_HMS--;
                window.seconds_HMS = 59;
            } else if(window.hours_HMS != 0 && window.minutes_HMS != 0 && window.seconds_HMS == 0) {
                window.minutes_HMS--;
                window.seconds_HMS = 59;
            } else {
                window.seconds_HMS--;
            }
        } else {
            if(window.hours_HMS.toString().length < 2) {
                window.hours_HMS = "0" + window.hours_HMS;
            }
            if(window.minutes_HMS.toString().length < 2) {
                window.minutes_HMS = "0" + window.minutes_HMS;
            }
            if(window.seconds_HMS.toString().length < 2) {
                window.seconds_HMS = "0" + window.seconds_HMS;
            }
            $this.html(window.hours_HMS+":"+window.minutes_HMS+":"+window.seconds_HMS);
            window.seconds_HMS--;
            if (window.minutes_HMS!=0 && window.seconds_HMS < 0){
                window.minutes_HMS--;
                window.seconds_HMS = 59
            }
            if(window.minutes_HMS==0 && window.seconds_HMS==-1 && window.hours_HMS != 0)
            {
                window.hours_HMS--;
                window.minutes_HMS = 59;
                window.seconds_HMS = 59;
            }
            if(window.minutes_HMS==0 && window.seconds_HMS==-1 && window.hours_HMS == 0)
            {
                delete window.hours_HMS;
                delete window.minutes_HMS;
                delete window.seconds_HMS;
                clearInterval(window.timer_HMS);
            }
        }
    }

    //Function for reverse timer to given date.
    function givenDate($this) {
        var futureDate = new Date(window.dateTime);
        var today=new Date();
        var days=Math.floor((futureDate-today)/(24*60*60*1000));
        var hours=Math.floor(((futureDate-today)%(24*60*60*1000))/(60*60*1000));
        var minutes=Math.floor(((futureDate-today)%(24*60*60*1000))/(60*1000))%60;
        var seconds=Math.floor(((futureDate-today)%(24*60*60*1000))/1000)%60%60;

        if((futureDate - today) > 0) {
            if(days.toString().length < 2) {
                days = "0" + days;
            }
            if(hours.toString().length < 2) {
                hours = "0" + hours;
            }
            if(minutes.toString().length < 2) {
                minutes = "0" + minutes;
            }
            if(seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
            $this.html(days+":"+hours+":"+minutes+":"+seconds);
        } else {
            $this.html("00:00:00:00");
            delete window.dateTime;
            clearInterval(window.timer_givenDate);
        }
    }

    //Function for displaying current time.
    function currentDate($this) {
        if(window.currentTime == true) {
            var today=new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds()

            if(hours.toString().length < 2) {
                hours = "0" + hours;
            }
            if(minutes.toString().length < 2) {
                minutes = "0" + minutes;
            }
            if(seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
            $this.html(hours+":"+minutes+":"+seconds);
        } else {
            alert('Set Current Time option.');
        }
    }

    //Default function called when no options are set.
    function secondsTimer($this) {
        if(window.countSeconds.toString().length < 2) {
            window.countSeconds = "0" + window.countSeconds;
        }
        $this.html(window.countSeconds+" "+"sec");
        window.countSeconds--;
        if(window.countSeconds==-1)
        {
            delete window.countSeconds;
            clearInterval(window.timer_secondsTimer);
        }
    }
    
    //Giving default value for options.
    $.fn.countdowntimer.defaults = {
        hours   : 0,
        minutes : 0,
        seconds : 60,
        dateAndTime : new Date("0000/00/00 00:00:00"),
        currentTime : false,
        size : "sm",
        borderColor : "#F0068E",
        fontColor : "#FFFFFF",
        backgroundColor : "#000000"
    };

}(jQuery));
