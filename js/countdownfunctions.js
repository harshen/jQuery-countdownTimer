$(function() {
	$('#future_date_format').countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		displayFormat : "YODHMS",
		labelsFormat: true
	});
	
	$('#future_date').countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "md",
		regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
		regexpReplaceWith: "$1y / $2m / $3d $4:$5:$6",
		displayFormat : "YODHMS",
		fontColor : "#b8ffff",
		borderColor : "#0008ff"
	});
	
	$("#specfuture_date").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "sm",
		displayFormat : "YODHMS",
		regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
      	regexpReplaceWith: "$1<sup class='displayformat'>years</sup> / $2<sup class='displayformat'>months</sup> / $3<sup class='displayformat'>days</sup> / $4<sup class='displayformat'>hours</sup> / $5<sup class='displayformat'>minutes</sup> / $6<sup class='displayformat'>seconds</sup>"
	});
	
	$("#startend_date").countdowntimer({
		startDate : "2016/01/01 00:00:00",
		dateAndTime : "2022/01/01 00:00:00",
		size : "lg",
		displayFormat : "YODHMS"
	});
	
	$("#hms_timer").countdowntimer({
		hours : 03,
		minutes : 10,
		seconds : 10,
		size : "lg",
		pauseButton : "pauseBtnhms",
		stopButton : "stopBtnhms"
	});
	
	$("#hm_timer").countdowntimer({
         hours : 03,
		 minutes : 10,
         labelsFormat : true
	});
	
	$("#ms_timer").countdowntimer({
		 minutes : 10,
		 seconds : 40,
		 size : "lg",
         timeSeparator : "-",
         tickInterval : 10,
         displayFormat : "MS"
	});
	
	$("#hs_timer").countdowntimer({
		 hours : 03,
		 seconds : 40,
		 size : "lg",
         displayFormat : "HM"
	});
	
	$("#s_timer").countdowntimer({
		 seconds : 400,
		 size : "lg",
         displayFormat : "S"
	});
	
	$("#h_timer").countdowntimer({
		 hours : 10,
		 size : "lg",
		 padZeroes : false
	});
	
	$("#current_timer").countdowntimer({
		 currentTime : true,
		 size : "lg",
		 borderColor : "#5D09FA",
		 backgroundColor : "#FAF209",
		 fontColor : "#FA0909",
		 timeZone: -420
	});
	
	$("#label_timer").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		labelsFormat : true,
		displayFormat : "YODHMS"
	});
	
	$("#xl_timer").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "xl",
		displayFormat : "YODHMS"
	});
	
	$("#lg_timer").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "lg",
		displayFormat : "YODHMS"
	});
	
	$("#md_timer").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "md",
		displayFormat : "YODHMS"
	});
	
	$("#sm_timer").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "sm",
		displayFormat : "YODHMS"
	});
	
	$("#xs_timer").countdowntimer({
		dateAndTime : "2022/01/01 00:00:00",
		size : "xs",
		displayFormat : "YODHMS"
	});
	
	$("#m_timer").countdowntimer({
		minutes : 10,
		size : "lg",
		displayFormat : "MS"
	});
	
	$("#destroyBtn").click(function(){
		$("#m_timer").countdowntimer('destroy');
	});
	
});
