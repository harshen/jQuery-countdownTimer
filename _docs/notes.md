---
title: Notes
permalink: /docs/notes/
---

- Don't use timer options (hours, minutes, seconds), dateAndTime and currentTime simultaneously as all these options display different time.

- `regexpMatchFormat and regexpReplaceWith` will not function if used simultaneously with `timeSeparator, labelsFormat and/or displayFormat` options as regex options provide custom display formatting.
> If you are using regexp options, use them with size.

- `pauseButton, stopButton` options and plugins pause and stop methods can be used for user defined timer (i.e. setting hours, minutes and/or seconds options). It cannot be used for `startDate, dateAndTime and currentTime` options as these times depend on either a future date or current date-time.

- `labelsFormat` has entirely different display. If used with `size and/or timeSeparator`, it gains priority over the latter two and they won't function.

