---
title: Details
permalink: /docs/details/
---


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
