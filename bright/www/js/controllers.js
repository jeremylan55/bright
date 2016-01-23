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
  	alert(events);
  }, function (err) {
    alert(err);
  });
}, 1000);
})

.controller('alarmCtrl', function($scope) {
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
	}
})

.controller('scheduleCtrl', function($scope) {
    
});
