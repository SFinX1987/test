angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
 
    $scope.login = function() {
		LoginService.loginUser($scope.data.PhoneNumber, $scope.data.Code).success(function(data){
			$state.go('contact-settings');
		}).error(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template:'Please check your credentials...'
			})
		})
    }
	$scope.facebookLogin = function(){
		$state.go('contact-settings');
	}
})

.controller('ContactSettingsCtrl', function($scope, Meetings, $ionicPopup, $state) {
  $scope.data = {};
 
    $scope.save = function() {
		if(isEmpty($scope.data.FirstName) || isEmpty($scope.data.LastName) || isEmpty($scope.data.PhoneNumber)){
			var alertPopup = $ionicPopup.alert({
				title: 'Action failed!',
				template:'Please fill all fields...'
			})
		}
		else{
			Meetings.saveContactSettings($scope.data.FirstName, $scope.data.LastName, $scope.data.PhoneNumber);
			$state.go('tab.upcoming');
		}
    }
})

.controller('UpcomingCtrl', function($scope, Meetings) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.upcomingMeetings = Meetings.upcoming();
  $scope.remove = function(meeting) {
    Meetings.remove(meeting);
  };
})
.controller('UpcomingDetailCtrl', function($scope, $stateParams, Meetings) {
  $scope.meeting = Meetings.get($stateParams.meetingId);
  
    
	setButtonsColorAccordingToStatus = function(status){
	    $scope.ColorGoing = 'gray';
	    $scope.ColorNotGoing = 'gray';
	    $scope.ColorNotSure = 'gray';
		switch(status) {
		case 0:
			$scope.ColorNotGoing = 'red';
			break;
		case 1:
			$scope.ColorNotSure = 'blue';
			break;
		case 2:
			$scope.ColorGoing = 'green';
			break;
		default:
			$scope.ColorNotSure = 'blue';
	  }
	}
	
  setButtonsColorAccordingToStatus($scope.meeting.me.status);
	
	$scope.setStatus = function(newStatus) {
		Meetings.setStatus($scope.meeting.id, newStatus);
		$scope.meeting = Meetings.get($stateParams.meetingId);
		setButtonsColorAccordingToStatus($scope.meeting.me.status);
	};
  
})

.controller('PastCtrl', function($scope, Meetings) {
	$scope.pastMeetings = Meetings.past();
})

.controller('AddCtrl', function ($scope, $state, Meetings, $ionicPopup, $timeout) {
	$scope.data = {};
	$scope.data.StartTime = new Date();
	$scope.data.StartTime.setHours(12 , 00, 00, 00)
	$scope.data.Duration = new Date();
	$scope.data.Duration.setHours(2 , 00, 00, 00)
	$scope.data.Repeat = "No repeat";
	$scope.data.MinParticipants = 1;
	$scope.data.Locations = [];
  
	$scope.add = function(name, description, datetime) {
    Meetings.add($scope.data.Name, $scope.data.Description, $scope.data.StartTime, null, $scope.data.Location);
	
	$state.go('tab.upcoming');
	};
	
	$scope.showLocationPopup = function() { 
	  
	  // An elaborate, custom popup
	  var myPopup = $ionicPopup.show({
		template: '<ion-google-place placeholder="Location" ng-model="data.Location"/>',
		title: 'Enter Location',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Add</b>',
			type: 'button-positive',
			onTap: function(e) {
			  if (!$scope.data.Location) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.data.Locations.push({
					text: $scope.data.Location,
					id: $scope.data.Locations.length
				});
			  }
			}
		  }
		]
	  });
	};
});



function isEmpty(str) {
    return (!str || 0 === str.length);
}
