---
title: Overview
permalink: /docs/overview/
---


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

timeUp                   : null                             // Provide time expire callback
                                                            // function.
															
expiryUrl                : null                             // Provide url to load on 
                                                            // expire.
															
regexpMatchFormat        : null                             // Provide regular expression
                                                            // format to match.
															
regexpReplaceWith        : null                             // Provide regular expression 
                                                            // string to replace 
                                                            // regexpMatchFormat.
															
pauseButton              : null                             // Provide pause button id.

stopButton               : null                             // Provide stop button id.

beforeExpiryTime         : null                             // Set a time before expire.

beforeExpiryTimeFunction : null                             // Provide callback function 
                                                            // at before expire time.
															
padZeroes                : true                             // Pad zeroes to digits 
                                                            // if < 10.

displayFormat            : "HMS"                            // Timer display format.

labelsFormat             : false                            // Timer display with labels.

timeZone                 : null                             // Set target date timezone.


**Regional Options**

digits                   : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

labels                   : ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds']

isRTL                    : false
```
