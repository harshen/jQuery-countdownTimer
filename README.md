# [jQuery CountdownTimer Plugin](https://www.npmjs.com/package/countdowntimer/)

[![Build Status](https://travis-ci.org/harshen/jQuery-countdownTimer.svg)](https://travis-ci.org/harshen/jQuery-countdownTimer/ "Travis CI")
[![Dependencies Status](https://david-dm.org/harshen/jQuery-countdownTimer/status.svg)](https://david-dm.org/harshen/jQuery-countdownTimer/ "Dependency Status")
[![Dev Dependency Status](https://david-dm.org/harshen/jQuery-countdownTimer/dev-status.svg)](https://david-dm.org/harshen/jQuery-countdownTimer/#info=devDependencies "Dev Dependency Status")

## <a id="Introduction"></a>Introduction

**CountdownTimer** is a reverse count down jQuery plugin for displaying countdown as per need with its different configuration options. It is a perfect match for any coupon, auction site or product launch page. It also displays current time and comes with timezone and many regional languages support.

- [Website](https://harshen.github.io/jQuery-countdownTimer/)

## [Help the project](https://www.paypal.me/harshenpandey/)

This project is looking for help! [You can donate through Paypal](https://www.paypal.me/harshenpandey/)
and help spread the word. If you've used the plugin, or plan to use, consider a donation - any amount will help.


## Table of contents

- [Features](#features)
- [Main](#main)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [Usage examples](#usage-examples)
- [Browser support](#browser-support)
- [Dependencies](#dependencies)
- [Support](#support)
- [License](#license)

## Features

- Supports jQuery v1.5+
- Supports 27 [options](#options)
- Supports 5 [methods](#methods)
- Supports more than 50 regional languages
- Supports different timezones
- Supports different sizes
- Supports Pause / Resume Timer
- Supports Start / Stop Timer
- Supports time expire callback
- Supports custom styling
- Cross-browser support

[⬆ back to top](#table-of-contents)

## Main

```text
dist/
├── js/
|   ├── jQuery.countdownTimer.js   (37.16 kB)
|   ├── jQuery.countdownTimer.min.js   (compressed - 18.28 kB)
|   ├── localisation/
|       └── jQuery.countdownTimer-[region-code].js (regional language support js files)
├── css/
    └── jQuery.countdownTimer.css
```

[⬆ back to top](#table-of-contents)

## Getting Started

### Install

```shell
npm install countdowntimer
```

### Include files

Include jQuery, the plugin and its css file on a page.

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="js/jQuery.countdownTimer.js"></script>
<!-- Good alternative is to include minified file jQuery.countdownTimer.min.js -->
<link rel="stylesheet" type="text/css" href="css/jQuery.countdownTimer.css" />
<!-- For regional language support, include below file -->
<!--<script type="text/javascript" src="js/localisation/jQuery.countdownTimer-[region-code].js"></script>-->
```

### Usage

Add a div and span element.

```html
<div id="countdowntimer"><span id="future_date"></span></div>
```
Initialize the `countdowntimer` method with the required options on the span element id.

```js
<script type="text/javascript">
	  $(function(){
	    $("#future_date").countdowntimer({
	      dateAndTime : "2020/01/01 00:00:00",
	      size : "lg"
	    });
	  });
</script>
```

#### FAQ

How to set countdown time in hours, minutes seconds?

> Just specify `hours` `minutes` `seconds` options with the required time while calling the plugin method.

How to remove seconds from the timer?

> Use `displayFormat` option as for example displayFormat: "YODHM".

How to reset the timer?

> Use the plugins stop function or `stopButton` option and provide button id to it.

How to modify countdowntimer display with our own styling?

> Use `size, borderColor, fontColor, backgroundColor` options. Moreover `regexpMatchFormat and regexpReplaceWith` provide custom display formatting as per need.

#### Notes

- Don't use timer options (hours, minutes, seconds), dateAndTime and currentTime simultaneously as all these options display different time.

- `regexpMatchFormat and regexpReplaceWith` will not function if used simultaneously with `timeSeparator, labelsFormat and/or displayFormat` options as regex options provide custom display formatting.
> If you are using regexp options, use them with size.

- `pauseButton, stopButton` options and plugins pause and stop methods can be used for user defined timer (i.e. setting hours, minutes and/or seconds options). It cannot be used for `startDate, dateAndTime and currentTime` options as these times depend on either a future date or current date-time.

- `labelsFormat` has entirely different display. If used with `size and/or timeSeparator`, it gains priority over the latter two and they won't function.
  
[⬆ back to top](#table-of-contents)

## Options

### Overview

Following are the different options provided for initialising the `countdowntimer` method with their default values.

```js
hours                    : 0                                // Set hours.
minutes                  : 0                                // Set minutes.
seconds                  : 60                               // Set seconds.
startDate                : new Date()                       // Set a start date.
dateAndTime              : new Date("1970/01/01 00:00:00")  // Set end date for start date.
currentTime              : false                            // Show current time.
size                     : "sm"                             // Set timer size.
borderColor              : "#F0068E"                        // Set timer border Color.
fontColor                : "#FFFFFF"                        // Set timer font Color.
backgroundColor          : "#000000"                        // Set timer background Color.
timeSeparator            : ":"                              // Set time separator.
tickInterval             : 1                                // Set timer interval.
timeUp                   : null                             // Provide time expire callback function.
expiryUrl                : null                             // Provide url to load on expire.
regexpMatchFormat        : null                             // Provide regular expression format to match.
regexpReplaceWith        : null                             // Provide regular expression string to replace regexpMatchFormat.
pauseButton              : null                             // Provide pause button id.
stopButton               : null                             // Provide stop button id.
beforeExpiryTime         : null                             // Set a time before expire.
beforeExpiryTimeFunction : null                             // Provide callback function at before expire time.
padZeroes                : true                             // Pad zeroes to digits if < 10.
displayFormat            : "HMS"                            // Timer display format.
labelsFormat             : false                            // Timer display with labels.
timeZone                 : null                             // Set target date timezone.

**Regional Options**

digits                   : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
labels                   : ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds']
isRTL                    : false
```
### Details

#### hours

- Type: `Number`
- Default: `0`
- Provide the hours as a number to countdown to zero. It can take positive values including 0. Can be used with minutes and/or seconds. If used with them, minutes and seconds take values from 0 to 59.

#### minutes

- Type: `Number`
- Default: `0`
- Provide the minutes as a number to countdown to zero. It can take positive values including 0. Can be used with hours and/or seconds. If used with them, minutes and seconds take values from 0 to 59.

#### seconds

- Type: `Number`
- Default: `60`
- Provide the seconds as a number to countdown to zero. It can take positive values including 0. Can be used with hours and/or minutes. If used with them, minutes and seconds take values from 0 to 59.

#### startDate

- Type: `Javascript Date`
- Default: `new Date()`
- Provide the startDate as Javascript Date to countdown till dateAndTime. startDate takes value in format "YYYY/MM/DD HH:MM:SS" where HH is a 24 - hours format. If startDate occurs in future, timer will show zeroes till startDate is equal to current date time. It can also be set to server date and time as given below.

```js
<?php echo date('Y/m/d H:i:s'); ?>
```

#### dateAndTime

- Type: `Javascript Date`
- Default: `new Date("1970/01/01 00:00:00")`
- Provide the dateAndTime as Javascript Date for startDate to countdown. dateAndTime takes value in format "YYYY/MM/DD HH:MM:SS" where HH is a 24 - hours format. If no startDate is provided, dateAndTime will take the startDate as current date time to countdown. It can also be set to server date and time as given below.

```js
<?php echo date('Y/m/d H:i:s'); ?>
```

#### currentTime

- Type: `Boolean`
- Default: `false`
- Show current local time or target region time (by using `timeZone`). Shows time in a 24 - hour format. Default display is of format HH:MM:SS.

#### size

- Type: `String`
- Default: `sm`
- The size option defines the countdowntimer size and can be set to below values (use bootstrap sizes notation).

  * xl - Extra large

  * lg - Large

  * md - Medium

  * sm - Small

  * xs - Extra small

#### borderColor

- Type: `String`
- Default: `#F0068E`
- Set the border color of the countdowntimer with this option.

#### fontColor

- Type: `String`
- Default: `#FFFFFF`
- Set the font color of the countdowntimer with this option.

#### backgroundColor

- Type: `String`
- Default: `#000000`
- Set the background color of the countdowntimer with this option.

#### timeSeparator

- Type: `String`
- Default: `:`
- Set the separator between digits of different time periods of the countdowntimer with this option.

#### tickInterval

- Type: `Number`
- Default: `1`
- Set the interval in seconds and timer will update the display as per the interval. Note that the time period resolution is limited to the minimum value displayed in your format. So, if you are not showing seconds, you should only use intervals that are multiples of a minute (eg - tickInterval : 60).

#### timeUp

- Type: `Function`
- Default: `null`
- The name of the callback function that is invoked when the countdown reaches zero. Within the function `this` refers to the division that holds the widget. No parameters are passed in. Provide the name to this option without quotes.

#### expiryUrl

- Type: `String`
- Default: `null`
- The Url to load when the countdowntimer reaches zero. Provide it in quotes.

#### regexpMatchFormat

- Type: `String`
- Default: `null`
- Set the Regular expression format to be matched and replaced with regexpReplaceWith option for advanced formatting of timer display.

#### regexpReplaceWith

- Type: `String`
- Default: `null`
- The replacement text to replace the regular expression match given in regexpMatchFormat option.

#### pauseButton

- Type: `String`
- Default: `null`
- Set the ID of the button which will Pause / Resume the timer. Provide ID in quotes. The text of button toggles between "Pause" and "Resume".

#### stopButton

- Type: `String`
- Default: `null`
- Set the ID of the button which will Stop / Start the timer. It stops and resets the timer to the timer options (hours, minutes, seconds) set while calling the plugin function. Provide ID in quotes. The text of button toggles between "Stop" and "Start".

#### beforeExpiryTime

- Type: `String`
- Default: `null`
- The time before expiry when beforeExpiryTimeFunction needs to be called. Format:- "DD:HH:MM:SS" (eg - beforeExpiryTime : "01:02:03:05").

#### beforeExpiryTimeFunction

- Type: `Function`
- Default: `null`
- The name of the callback function that is invoked before the countdown reaches zero at a time set in beforeExpiryTime option. Within the function `this` refers to the division that holds the widget. No parameters are passed in. Provide the name to this option without quotes.

#### padZeroes

- Type: `Boolean`
- Default: `true`
- Pads zero to digits of different time periods if less than two digits. Set to false to remove zeroes.

#### displayFormat

- Type: `String`
- Default: `HMS`
- Set the display format for countdowntimer. Use the following characters (in order, or out of order) to indicate which time periods you want to display.

	* Y - Years
	* O - Months
	* D - Days
	* H - Hours
	* M - Minutes
	* S - Seconds
 
 - If any time period is not displayed, its time value is added to its superior.
 
 - Usage examples (In order)
	
   * YODHMS
   * ODHMS
   * DHMS
   * HMS
   * MS
   * S
   * M
   * H
   * D
   * O
   * Y
 
 - You can also use the characters out of given order.
 
#### labelsFormat
 
- Type: `Boolean`
- Default: `false`
- Gives enhanced display to countdowntimer by adding time period labels. Can be used with regionalOptions to provide regional language support.

#### timeZone

- Type: `Number`
- Default: `null`
- Set the target region timezone with this option. When used, it will countdown with respect to the time in that region. Set hours or minutes in it (works for both UTC + val and UTC - val). Can be used with startDate, dateAndTime and currentTime options.

- Usage examples
  
	* Time Zone of Los Angeles (Pacific Daylight Time) UTC-7

		* timeZone : -7
		* timeZone : -420
		
	* Time Zone of Singapore (SGT) UTC+8
	
		* timeZone : +8
		* timeZone : +480
		
#### digits
 
- Type: `String Array`
- Default: `['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']`
- Included in regionalOptions is digits array for timer display in regional language digits. For regionalOptions to function, include the localisation js file after the plugin js file.

#### labels
 
- Type: `String Array`
- Default: `['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds']`
- Included in regionalOptions is labels array for timer display in regional language time period labels. For regionalOptions to function, include the localisation js file after the plugin js file.

#### isRTL
 
- Type: `Boolean`
- Default: `false`
- Set to true for languages that read right-to-left, or false for left-to-right. Included in regionalOptions. For regionalOptions to function, include the localisation js file after the plugin js file.

[⬆ back to top](#table-of-contents)

## Methods

#### pause

- Use it to Pause / Resume the user defined countdowntimer (hours, minutes, seconds timer).

	```js
	jQuery("#hms_timer").countdowntimer("pause", "pause");
	jQuery("#hms_timer").countdowntimer("pause", "resume");
	```

#### stop

- Use it to Stop / Start the user defined countdowntimer (hours, minutes, seconds timer). When stopped, timer resets to defined values.

	```js
	jQuery("#hms_timer").countdowntimer("stop", "stop");
	jQuery("#hms_timer").countdowntimer("stop", "start");
	```

#### destroy

- Use it to destroy the countdowntimer.

	```js
	jQuery("#hms_timer").countdowntimer("destroy");
	```

[⬆ back to top](#table-of-contents)

## Usage examples

Following are the different code samples for using `countdowntimer` method.

* Reverse countdown till a specific future date from today. (for eg:- 2020/01/01 00:00:00)
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
			dateAndTime : "2020/01/01 00:00:00"‚
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
			hours : 3‚
			minutes : 10‚
			seconds : 10‚
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
			hours : 3‚
			minutes : 10‚
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
			minutes : 20‚
			seconds : 10‚
			size : "lg"
		});
	});
	```

* Reverse countdown to zero from time set to hours and seconds.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			hours : 2‚
			seconds : 10‚
			size : "lg"
		});
	});
	```

* Reverse countdown to zero from time set to only hours.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			hours : 2‚
			size : "lg",
			tickInterval : 60
		});
	});
	```

* Reverse countdown to zero from time set to only minutes.
	
	```js
	$(function(){
		$("#cdt").countdowntimer({
			minutes : 2‚
			size : "lg"
		});
	});
	```

* Reverse countdown to zero from time set to only seconds.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			seconds : 25‚
			size : "lg"
		});
	});
	```

* Display current time.

	```js
	$(function(){
		$("#cdt").countdowntimer({
			currentTime : true‚
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

[⬆ back to top](#table-of-contents)

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

[⬆ back to top](#table-of-contents)

## Dependencies

jQuery greater than or equal to version 1.5.

[⬆ back to top](#table-of-contents)

## Support

Please post bug reports and other contributions (enhancements, features) to the GitHub issue tracker.

[⬆ back to top](#table-of-contents)

## License

Copyright © [Harshen Pandey](https://remote.com/harshen)

Licensed under the [MIT](https://github.com/harshen/jQuery-countdownTimer/blob/master/LICENSE.md) 
and [GPLv3](https://github.com/harshen/jQuery-countdownTimer/blob/master/LICENSE-GPL.md) license.

[⬆ back to top](#table-of-contents)
