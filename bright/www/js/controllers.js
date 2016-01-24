angular.module('starter.controllers', [])

.controller('lightCtrl', function($scope, $cordovaCalendar, $timeout) {
	var d = new Date();
	var date = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth();
	var hour = d.getHours();
	var min = d.getMinutes();
	var events;
setTimeout(function(){
  $cordovaCalendar.listEventsInRange(
    new Date(year, month, date, hour, min, 0, 0, 0),
    new Date(year, month, date+1, 0, 0, 0, 0, 0)
  ).then(function (result) {
  	var events = JSON.stringify(result, null, '\t');
  }, function (err) {
    alert(err);
  });
}, 1000);

	$scope.toggleLight = function(){
		$('#circle').toggleClass('large');
		$('#innerCircle').toggleClass('large');
		if($('#lightBut').hasClass('on')) {
			$('#toggleLightForm>input').val('off');
			$('#toggleLightForm').submit();
		}
		else {
			$('#toggleLightForm>input').val('on');	
			$('#toggleLightForm').submit();
		}
		$('#lightBut').toggleClass('on');
		$('#lightBut').toggleClass('animated bounceIn short');
	}

	$('#toggleLightForm').submit(function() {
		console.log('hey'); ////
		var value = $('#toggleLightForm>input').val();

		$.ajax({
            type: 'POST',
            url: 'https://api.particle.io/v1/devices/54ff6b066678574933101167/light?access_token=5ef11b735841432e0d6597e2b010e96fcbeceba5',
            data: { args: value}
        });
		return false;
	});


})

.controller('alarmCtrl', function($scope, $timeout) {
	$scope.alarms = [];



	$scope.addAlarm = function(){
		$('#addAlarm.myModal').removeClass('hidden').animate({top: '0px'},300);
		$('.saveAlarmBut').removeClass('hidden');
		$('.cancelAlarmBut').removeClass('hidden');
	}

	$scope.cancelAlarm = function() {
		$('#addAlarm.myModal').animate({top: '-200px'},300);
		$('.saveAlarmBut').addClass('hidden');
		$('.cancelAlarmBut').addClass('hidden');
	}

	$scope.saveAlarm = function() {
		$('#addAlarm.myModal').animate({top: '-200px'},300);
		$('.saveAlarmBut').addClass('hidden');
		$('.cancelAlarmBut').addClass('hidden');	
		var temp = { name_: "", time_: ""};
		temp.name_ = $('#alarmName').val();
		$('#alarmName').val('New Alarm');
		temp.time_ = $('#alarmTime').val();
		$('#alarmTime').val('12:00');
		$scope.alarms.push(temp);

		sendAlarm(temp.time_);
	}

	$scope.deleteAlarm = function(id) {
		$('#a_'+id).slideUp();
		$timeout(function(){
			$('#a_'+id).remove();
		},600);
	}

	function sendAlarm(time){
		time = time.split(':');
		time = time[0] + time [1];
		$.ajax({
        	type: 'POST',
        	url: 'https://api.particle.io/v1/devices/54ff6b066678574933101167/alarm?access_token=5ef11b735841432e0d6597e2b010e96fcbeceba5',
        	data: { args: time}
    	});
	}

})

.controller('scheduleCtrl', function($scope) {
    $scope.saveSchedule = function(){
    	var startTime = $('.startLightBut>input').val();
    	var endTime = $('.stopLightBut>input').val();
		$.ajax({
	    	type: 'POST',
	    	url: 'https://api.particle.io/v1/startTime/54ff6b066678574933101167/schedule?access_token=5ef11b735841432e0d6597e2b010e96fcbeceba5',
	    	data: { args: startTime}
		});

		$.ajax({
	    	type: 'POST',
	    	url: 'https://api.particle.io/v1/endTime/54ff6b066678574933101167/schedule?access_token=5ef11b735841432e0d6597e2b010e96fcbeceba5',
	    	data: { args: endTime}
		});
	}

});
