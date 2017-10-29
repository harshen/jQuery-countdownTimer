
/* jQuery.countdownTimer.tests.js*/

$(function() {

    var clock = sinon.useFakeTimers(new Date(2016, 7 - 1, 1, 12, 0, 0, 0).getTime());
    $.noRequestAnimationFrame = true; // Use setInterval which is faked by Sinon

    QUnit.test('Set defaults', function(assert) {
        assert.expect(2);
        assert.equal($.fn.countdowntimer.defaults.currentTime, false, 'Initial currentTime');
        $.extend($.fn.countdowntimer, {
            currentTime: true
        });
        assert.equal($.fn.countdowntimer.currentTime, true, 'Changed currentTime');
    });

    QUnit.test('CountdownTimer tickInterval', function(assert) {
        assert.expect(3);
        $('#countd').countdowntimer({
            hours: 1,
            minutes: 10,
            seconds: 30,
            tickInterval: 10
        });
        assert.equal($('#countd').text(), "01:10:30", 'Initial time value');
        clock.tick(5000); //Interval of 5 sec
        assert.equal($('#countd').text(), "01:10:30", 'Time value unchanged after 5 sec');
        clock.tick(5000);
        assert.equal($('#countd').text(), "01:10:20", 'Time value changed after 10 sec');
    });

    QUnit.test('CountdownTimer beforeExpiry', function(assert) {
        assert.expect(3);
        var bforeexpiry = false;

        function Expiry() {
            bforeexpiry = true;
        }
        $('#countd').countdowntimer({
            hours: 1,
            minutes: 10,
            seconds: 30,
            beforeExpiryTime: "00:01:10:25",
            beforeExpiryTimeFunction: Expiry
        });
        assert.equal($('#countd').text(), "01:10:30", 'Initial time value');
        clock.tick(5000); //Interval of 5 sec
        assert.equal($('#countd').text(), "01:10:25", 'Before Expiry time value reached');
        assert.equal(bforeexpiry, true, 'Before Expiry function called');
    });

    QUnit.test('CountdownTimer timeUp', function(assert) {
        assert.expect(3);
        var expiry = false;

        function timeIsUp() {
            expiry = true;
        }
        $('#countd').countdowntimer({
            seconds: 5,
            timeUp: timeIsUp
        });
        assert.equal($('#countd').text(), "00:00:05", 'Initial time value');
        clock.tick(5000); //Interval of 5 sec
        assert.equal($('#countd').text(), "00:00:00", 'Expiry time value reached');
        assert.equal(expiry, true, 'Expiry function called');
    });

    QUnit.test('CountdownTimer destroy', function(assert) {
        assert.expect(5);
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20
        });
        assert.equal($('#countd').text(), "10:20:00", 'Initially countdownTimer Instance present');
        assert.equal($('#countd').hasClass('style'), true, 'Initially countdownTimer base class present');
        clock.tick(5000);
        assert.equal($('#countd').text(), "10:19:55", 'countdownTimer Running');
        $('#countd').countdowntimer('destroy');
        clock.tick(1000);
        assert.equal($('#countd').text(), "", 'countdownTimer Instance gone');
        assert.equal($('#countd').hasClass('style'), false, 'countdownTimer base class gone');
    });


    QUnit.test('CountdownTimer padZeroes', function(assert) {
        assert.expect(3);
        $('#countd').countdowntimer({
            hours: 1,
            minutes: 10,
            seconds: 05
        });
        assert.equal($('#countd').text(), "01:10:05", 'Default padZeroes');
        $('#countd').countdowntimer({
            hours: 1,
            minutes: 10,
            seconds: 05,
            padZeroes: false
        });
        assert.equal($('#countd').text(), "1:10:5", 'Remove padZeroes');
        $('#countd').countdowntimer({
            hours: 1,
            minutes: 10,
            seconds: 05,
            padZeroes: true
        });
        assert.equal($('#countd').text(), "01:10:05", 'Set padZeroes');
    });

    QUnit.test('CountdownTimer Pause / Resume', function(assert) {
        assert.expect(5);
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20
        });
        assert.equal($('#countd').text(), "10:20:00", 'Initial countdownTimer value');
        clock.tick(5000);
        $('#countd').countdowntimer('pause', 'pause');
        assert.equal($('#countd').text(), "10:19:55", 'countdownTimer paused here');
        clock.tick(5000);
        assert.equal($('#countd').text(), "10:19:55", 'countdownTimer still paused');
        $('#countd').countdowntimer('pause', 'resume');
        clock.tick(5000);
        assert.equal($('#countd').text(), "10:19:50", 'countdownTimer resumed');
        clock.tick(1000);
        assert.equal($('#countd').text(), "10:19:49", 'countdownTimer running');
    });

    QUnit.test('CountdownTimer Stop / Start', function(assert) {
        assert.expect(5);
        $('#countd').countdowntimer({
            hours: 10
        });
        assert.equal($('#countd').text(), "10:00:00", 'Initial countdownTimer value');
        clock.tick(5000);
        assert.equal($('#countd').text(), "09:59:55", 'countdownTimer Running');
        clock.tick(5000);
        $('#countd').countdowntimer('stop', 'stop');
        assert.equal($('#countd').text(), "10:00:00", 'countdownTimer stopped - Reset');
        clock.tick(5000);
        $('#countd').countdowntimer('stop', 'start');
        assert.equal($('#countd').text(), "10:00:00", 'countdownTimer started again - Initial value');
        clock.tick(1000);
        assert.equal($('#countd').text(), "09:59:59", 'countdownTimer Running');
    });

    QUnit.test('CountdownTimer Content', function(assert) {
        assert.expect(11);
        $('#countd').countdowntimer({
            seconds: 20
        });
        assert.equal($('#countd').text(), '00:00:20', 'Only Seconds countdownTimer');
        $('#countd').countdowntimer({
            minutes: 20
        });
        assert.equal($('#countd').text(), '00:20:00', 'Only Minutes countdownTimer');
        $('#countd').countdowntimer({
            hours: 20
        });
        assert.equal($('#countd').text(), '20:00:00', 'Only Hours countdownTimer');
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20
        });
        assert.equal($('#countd').text(), '10:20:00', 'Hours Minutes countdownTimer');
        $('#countd').countdowntimer({
            minutes: 10,
            seconds: 20
        });
        assert.equal($('#countd').text(), '00:10:20', 'Minutes Seconds countdownTimer');
        $('#countd').countdowntimer({
            hours: 10,
            seconds: 20
        });
        assert.equal($('#countd').text(), '10:00:20', 'Hours Seconds countdownTimer');
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20,
            seconds: 30
        });
        assert.equal($('#countd').text(), '10:20:30', 'Hours Minutes Seconds countdownTimer');
        $('#countd').countdowntimer({});
        assert.equal($('#countd').text(), '60 sec', 'Default countdownTimer');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00'
        });
        var diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'HMS', null);
        assert.equal($('#countd').text(), diff, 'Past Start Date - Future End Date countdownTimer Default Display');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'YODHMS'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'YODHMS', null);
        assert.equal($('#countd').text(), diff, 'Past Start Date - Future End Date countdownTimer Format YODHMS');
        $('#countd').countdowntimer({
            startDate: "2019/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00'
        });
        assert.equal($('#countd').text(), "00:00:00", 'Future Start Date - Future End Date countdownTimer');
    });

    QUnit.test('CountdownTimer Timezones', function(assert) {
        assert.expect(4);
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            timeZone: -7,
            displayFormat: 'YODHMS'
        });
        var dif = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'YODHMS', -7);
        assert.equal($('#countd').text(), dif, 'countdownTimer for Timezone Los Angeles(UTC-7) given in hours');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            timeZone: -420,
            displayFormat: 'YODHMS'
        });
        var dif1 = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'YODHMS', -420);
        assert.equal($('#countd').text(), dif1, 'countdownTimer for Timezone Los Angeles(UTC-420) given in minutes');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            timeZone: +8,
            displayFormat: 'YODHMS'
        });
        var dif2 = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'YODHMS', +8);
        assert.equal($('#countd').text(), dif2, 'countdownTimer for Timezone Singapore(UTC+8) given in hours');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            timeZone: +480,
            displayFormat: 'YODHMS'
        });
        var dif3 = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'YODHMS', +480);
        assert.equal($('#countd').text(), dif3, 'countdownTimer for Timezone Singapore(UTC+480) given in minutes');
    });

    QUnit.test('CountdownTimer Options', function(assert) {
        assert.expect(24);
        var datetime = new Date("1970/01/01 00:00:00");
        assert.equal($.fn.countdowntimer.defaults.hours, 0, 'Default Hours');
        assert.equal($.fn.countdowntimer.defaults.minutes, 0, 'Default Minutes');
        assert.equal($.fn.countdowntimer.defaults.seconds, 60, 'Default Seconds');
        assert.equal($.fn.countdowntimer.defaults.dateAndTime, datetime.toString(), 'Default dateAndTime');
        assert.equal($.fn.countdowntimer.defaults.currentTime, false, 'Default currentTime');
        assert.equal($.fn.countdowntimer.defaults.size, "sm", 'Default size');
        assert.equal($.fn.countdowntimer.defaults.borderColor, "#F0068E", 'Default borderColor');
        assert.equal($.fn.countdowntimer.defaults.fontColor, "#FFFFFF", 'Default fontColor');
        assert.equal($.fn.countdowntimer.defaults.backgroundColor, "#000000", 'Default backgroundColor');
        assert.equal($.fn.countdowntimer.defaults.timeSeparator, ":", 'Default timeSeparator');
        assert.equal($.fn.countdowntimer.defaults.tickInterval, 1, 'Default tickInterval');
        assert.equal($.fn.countdowntimer.defaults.timeUp, null, 'Default timeUp');
        assert.equal($.fn.countdowntimer.defaults.expiryUrl, null, 'Default expiryUrl');
        assert.equal($.fn.countdowntimer.defaults.regexpMatchFormat, null, 'Default regexpMatchFormat');
        assert.equal($.fn.countdowntimer.defaults.regexpReplaceWith, null, 'Default regexpReplaceWith');
        assert.equal($.fn.countdowntimer.defaults.pauseButton, null, 'Default pauseButton');
        assert.equal($.fn.countdowntimer.defaults.stopButton, null, 'Default stopButton');
        assert.equal($.fn.countdowntimer.defaults.beforeExpiryTime, null, 'Default beforeExpiryTime');
        assert.equal($.fn.countdowntimer.defaults.beforeExpiryTimeFunction, null, 'Default beforeExpiryTimeFunction');
        assert.equal($.fn.countdowntimer.defaults.padZeroes, true, 'Default padZeroes');
        assert.equal($.fn.countdowntimer.defaults.displayFormat, "HMS", 'Default displayFormat');
        assert.equal($.fn.countdowntimer.defaults.labelsFormat, false, 'Default labelsFormat');
        assert.equal($.fn.countdowntimer.defaults.timeZone, null, 'Default timeZone');
        assert.deepEqual($.fn.countdowntimer.regionalOptions, {
            digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            labels: ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds'],
            isRTL: false
        }, 'Default regionalOptions');
    });

    QUnit.test('CountdownTimer Display Options', function(assert) {
        assert.expect(16);
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20,
            seconds: 30,
            size: "xl"
        });
        assert.equal($('#countd').hasClass("size_xl"), true, 'Size xl');
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20,
            seconds: 30,
            size: "lg"
        });
        assert.equal($('#countd').hasClass("size_lg"), true, 'Size lg');
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20,
            seconds: 30,
            size: "md"
        });
        assert.equal($('#countd').hasClass("size_md"), true, 'Size md');
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20,
            seconds: 30,
            size: "sm"
        });
        assert.equal($('#countd').hasClass("size_sm"), true, 'Size sm');
        $('#countd').countdowntimer({
            hours: 10,
            minutes: 20,
            seconds: 30,
            size: "xs"
        });
        assert.equal($('#countd').hasClass("size_xs"), true, 'Size xs');
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            padZeroes: true
        });
        assert.equal($('#countd').text(), "08:07:09", 'Padzeroes to CountdownTimer');
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            padZeroes: false
        });
        assert.equal($('#countd').text(), "8:7:9", "Don't Padzeroes to CountdownTimer");
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            borderColor : "rgb(93, 9, 250)"
        });
        assert.equal($('#countd').css("borderTopColor"), "rgb(93, 9, 250)", "Set borderTopColor to CountdownTimer");
        assert.equal($('#countd').css("borderRightColor"), "rgb(93, 9, 250)", "Set borderRightColor to CountdownTimer");
        assert.equal($('#countd').css("borderBottomColor"), "rgb(93, 9, 250)", "Set borderBottomColor to CountdownTimer");
        assert.equal($('#countd').css("borderLeftColor"), "rgb(93, 9, 250)", "Set borderLeftColor to CountdownTimer");
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            fontColor: "rgb(250, 9, 9)"
        });
        assert.equal($('#countd').css("color"), "rgb(250, 9, 9)", "Set fontColor to CountdownTimer");
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            backgroundColor: "rgb(250, 242, 9)"
        });
        assert.equal($('#countd').css("background-color"), "rgb(250, 242, 9)", "Set backgroundColor to CountdownTimer");
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            timeSeparator: "/"
        });
        assert.equal($('#countd').text(), "08/07/09", "Set timeSeparator to CountdownTimer");
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            labelsFormat: true
        });
        assert.equal($('#countd').hasClass("labelformat"), true, "Set labelsFormat to CountdownTimer");
        $('#countd').countdowntimer({
            hours: 8,
            minutes: 7,
            seconds: 9,
            regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "$1:$2:$3"
        });
        assert.equal($('#countd').text(), "08:07:09", "Set regexpMatchFormat, regexpReplaceWith to CountdownTimer");
    });

    QUnit.test('CountdownTimer displayFormat', function(assert) {
        assert.expect(11);
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'YODHMS'
        });
        var diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'YODHMS', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format YODHMS');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'ODHMS'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'ODHMS', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format ODHMS');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'DHMS'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'DHMS', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format DHMS');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'HMS'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'HMS', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format HMS');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'MS'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'MS', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format MS');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'S'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'S', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format S');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'M'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'M', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format M');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'H'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'H', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format H');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'D'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'D', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format D');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'O'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'O', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format O');
        $('#countd').countdowntimer({
            startDate: "2016/01/01 00:00:00",
            dateAndTime: '2020/01/01 00:00:00',
            displayFormat: 'Y'
        });
        diff = dateDifference("2016/01/01 00:00:00", '2020/01/01 00:00:00', 'Y', null);
        assert.equal($('#countd').text(), diff, 'countdownTimer Display Format Y');
    });

    function dateDifference(start, end, disform, tz) {
        start = new Date(start);
        end = new Date(end);
        var hour = start.getHours();
        var minutes = start.getMinutes();
        var seconds = start.getSeconds();
        var month = (start.getMonth() + 1);
        var date = start.getDate();
        var year = start.getFullYear();
        var startd = new Date(year + '/' + month + '/' + date + ' ' + hour + ':' + minutes + ':' + seconds);
        end = (tz !== null ? (new Date((end.getTime() + (end.getTimezoneOffset() * 60000)) + (60000 * (Math.abs(tz) < 30 ? tz * 60 : tz)))) : end);
        var curdate = ((end - startd) / 1000);
        var disp = disFormat(disform);
        var f = disp.split('');
        var y = (f[0] === "!" ? Math.floor(curdate / 31536000) : 0);
        var o = (f[1] === "!" ? Math.floor((curdate / 2628000) - ((y * 31536000) / 2628000)) : 0);
        var d = (f[2] === "!" ? Math.floor((curdate / 86400) - ((o * 2628000) / 86400) - ((y * 31536000) / 86400)) : 0);
        var h = (f[3] === "!" ? Math.floor((curdate / 3600) - ((o * 2628000) / 3600) - ((y * 31536000) / 3600) - ((d * 86400) / 3600)) : 0);
        var m = (f[4] === "!" ? Math.floor((curdate / 60) - ((h * 3600) / 60) - ((d * 86400) / 60) - ((o * 2628000) / 60) - ((y * 31536000) / 60)) : 0);
        var s = (f[5] === "!" ? Math.floor(curdate - (m * 60) - (h * 3600) - (d * 86400) - (o * 2628000) - (y * 31536000)) : 0);
        var time = $.grep([y, o, d, h, m, s], function(arr, i) {
            return (arr >= 0 && f[i] === "!");
        }).join(":");
        time = time.split(":");
        for (var i = 0; i < time.length; i++) {
            if (time[i].toString().length < 2) {
                time[i] = "0" + time[i];
            }
        }
        time = time.join(":").toString();
        return time;
    }

    function disFormat(disform) {
        var format = [];
        format[0] = (disform.match('Y') ? '!' : '#');
        format[1] = (disform.match('O') ? '!' : '#');
        format[2] = (disform.match('D') ? '!' : '#');
        format[3] = (disform.match('H') ? '!' : '#');
        format[4] = (disform.match('M') ? '!' : '#');
        format[5] = (disform.match('S') ? '!' : '#');
        disform = format.join('');
        return disform;
    }

});
