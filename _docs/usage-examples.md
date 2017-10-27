---
title: Usage Examples
permalink: /docs/usage-examples/
---

Following are the different code samples for using `countdowntimer` method.

* Reverse countdown till a specific future date from today. (for eg:- 2020/01/01 00:00:00)
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
            dateAndTime : "2020/01/01 00:00:00",
			labelsFormat : true,
			displayFormat : "YODHMS",
			padZeroes : false,
			timeZone : -7,
			beforeExpiryTime : "01:01:05:05",
			beforeExpiryTimeFunction :  beforeExpiryFunc,
			timeUp : timeIsUp,
			expiryUrl : "https://www.npmjs.com/package/countdowntimer"
		});
		function beforeExpiryFunc() {
			//Your code
		}
		function timeIsUp() {
			//Your code
		}								
	});
	```
	
* Reverse countdown to zero from time set to hours, minutes & seconds.
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
            hours : 3,
			minutes : 10,
            seconds : 10,
			displayFormat : "HM",
            size : "lg",
			timeSeparator : "/",
			pauseButton : "pbtnId",
			stopButton : "sbtnId"
		});
	});
	```

* Reverse countdown to zero from time set to hours and minutes.
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
            hours : 3,
			minutes : 10,
            size : "lg"
		});
		function urfunc() {
			if(yourcond === true) {
				jQuery("#cdt").countdowntimer("pause", "pause");
			} else {
				jQuery("#cdt").countdowntimer("pause", "resume");
			} 
			if(yourothercond === true) {
				jQuery("#cdt").countdowntimer("stop", "stop");	
			} else {
				jQuery("#cdt").countdowntimer("stop", "start");
			}
			jQuery("#cdt").countdowntimer("destroy");
		}
	});
	```
	
* Reverse countdown to zero from time set to minutes and seconds.
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
			minutes : 20,
            seconds : 10,
            size : "lg"
		});
	});
	```

* Reverse countdown to zero from time set to hours and seconds.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			hours : 2,
            seconds : 10,
            size : "lg"
		});
	});
	```

* Reverse countdown to zero from time set to only hours.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			hours : 2,
            size : "lg",
			tickInterval : 60
		});
	});
	```

* Reverse countdown to zero from time set to only minutes.
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
			minutes : 2,
            size : "lg"
		});
	});
	```

* Reverse countdown to zero from time set to only seconds.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			seconds : 25,
            size : "lg"
		});
	});
	```

* Display current time.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			currentTime : true,
            size : "lg",
			borderColor : "#5D09FA",
			backgroundColor : "#FAF209",
			fontColor : "#FA0909",
			timeZone : -420
		});
	});
	```

* Reverse countdown between a given start date (which can be server date and time or any given date) and end date.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			startDate : "2017/10/10 12:00:00",
			dateAndTime : "2020/10/10 12:00:00",
            size : "lg"
		});
	});
	```
 
* For taking startDate as current server date and time.

	```js
        $(function(){
		$("#cdt").countdowntimer({
			startDate : "<?php echo date('Y/m/d H:i:s'); ?>",
			dateAndTime : "2020/10/10 12:00:00",
            size : "lg",
			regexpMatchFormat : "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
			regexpReplaceWith : "$1<sup>years</sup> / $2<sup>months</sup> / $3<sup>days</sup> / $4<sup>hours</sup> / $5<sup>minutes</sup> / $6<sup>seconds</sup>"
		});
	});
	```

* If no options are provided, by default timer of 60 seconds is displayed in small size.

	```js
	$(function(){
		$("#cdt").countdowntimer({
		});
	});
	```

