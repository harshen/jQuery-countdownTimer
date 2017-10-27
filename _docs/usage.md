---
title: Usage
permalink: /docs/usage/
---


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
