---
title: Methods
permalink: /docs/methods/
---

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
