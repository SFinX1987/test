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
	
	$scope.WannaBanana = function(){
		var alertPopup = $ionicPopup.alert({
				title: 'Whooopsie...',
				template:'Do you wanna banana?'
			})
	};
})

.controller('UpcomingCtrl', function($scope, Meetings, $ionicPopover, $ionicPopup, $ionicFilterBar) {
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
  
  $ionicPopover.fromTemplateUrl('templates/popup-main.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
	$scope.AviEgzim = function(){
		var alertPopup = $ionicPopup.alert({
				title: 'עוד לא מימשתי את זה!!!',
				template:'אבי, הגזמת...'
			})
	};
	
	var filterBarInstance;

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.upcomingMeetings,
        update: function (filteredItems, filterText) {
          $scope.upcomingMeetings = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        },
		expression: function (filterText, value, index, array) { 
			var lowerFilterText = filterText.toLowerCase();
			return value.name.toLowerCase().includes(lowerFilterText) || value.description.toLowerCase().includes(lowerFilterText) || value.creator.name.toLowerCase().includes(lowerFilterText) || value.location.toLowerCase().includes(lowerFilterText); 
		}
      });
    };

})
.controller('UpcomingDetailCtrl', function($scope, $stateParams, Meetings, $ionicPopup, $ionicPopover) {
  $scope.meeting = Meetings.get($stateParams.meetingId);
  $scope.ColorNeedARide = 'gray';
    
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
  
	$scope.needARidePressed = function(){
		if($scope.ColorNeedARide == 'gray'){
			$scope.ColorNeedARide = 'green';
		}
		else{
			$scope.ColorNeedARide = 'gray';
		}
	};
	
	$scope.AviEgzim = function(){
		var alertPopup = $ionicPopup.alert({
				title: 'עוד לא מימשתי את זה!!!',
				template:'אבי, הגזמת...'
			})
	};
	
	$ionicPopover.fromTemplateUrl('templates/popup-upcoming-detail.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	}); 
	
	$scope.getPeopleCountByStatus = function(meeting, status){
	  var result = 0;
	  meeting.participants.forEach(function(participant, index){
	    if(participant.status == status){
			result++;
		}
	  });
	  return result;
	};
})

.controller('PastCtrl', function($scope, Meetings,  $ionicPopup, $ionicPopover, $ionicFilterBar) {
	$scope.pastMeetings = Meetings.past();
	
	$scope.AviEgzim = function(){
		var alertPopup = $ionicPopup.alert({
				title: 'עוד לא מימשתי את זה!!!',
				template:'אבי, הגזמת...'
			})
	};
	
  $ionicPopover.fromTemplateUrl('templates/popup-main.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
	var filterBarInstance;

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.pastMeetings,
        update: function (filteredItems, filterText) {
          $scope.pastMeetings = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        },
		expression: function (filterText, value, index, array) { 
			var lowerFilterText = filterText.toLowerCase();
			return value.name.toLowerCase().includes(lowerFilterText) || value.description.toLowerCase().includes(lowerFilterText) || value.creator.name.toLowerCase().includes(lowerFilterText) || value.location.toLowerCase().includes(lowerFilterText); 
		}
      });
    };

})

.controller('AddCtrl', function ($scope, $state, Meetings, $ionicPopup, $timeout) {
	$scope.data = {};
	$scope.data.startTime = new Date();
	$scope.data.startTime.setHours(12 , 00, 00, 00)
	$scope.data.duration = new Date();
	$scope.data.duration.setHours(2 , 00, 00, 00)
	$scope.data.repeat = "No repeat";
	$scope.data.minParticipants = 1;
	$scope.data.location = "";
  
	$scope.add = function(name, description, datetime) {
    Meetings.add($scope.data.name, $scope.data.description, $scope.data.startTime, null, $scope.data.location);
	
	$state.go('tab.upcoming');
	};
	
	 $scope.disableTap = function(){
    container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('Autocomplete').blur();
		});
	};
})

.controller('ChatCtrl', function ($scope, $stateParams, $timeout, Chat, Settings) {
	
  $scope.data = {};
  $scope.data.message = "";
  $scope.messages = Chat.getMessages();
  
  $scope.messageIsMine = function(phoneNumber){
    return Settings.getPhoneNumber() === phoneNumber;
  };

  $scope.getBubbleClass = function(phoneNumber){
    var classname = 'from-them';
    if($scope.messageIsMine(phoneNumber)){
      classname = 'from-me';
    }
    return classname;
  };

  $scope.sendMessage = function(text){
    Chat.send(Settings.getName(), Settings.getPhoto(), Settings.getPhoneNumber(),text);
    $scope.data.message = "";
  };
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}
