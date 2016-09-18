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
})

.controller('ContactSettingsCtrl', function($scope, Chats, $ionicPopup, $state) {
  $scope.data = {};
 
    $scope.save = function() {
		if(isEmpty($scope.data.FirstName) || isEmpty($scope.data.LastName) || isEmpty($scope.data.PhoneNumber)){
			var alertPopup = $ionicPopup.alert({
				title: 'Action failed!',
				template:'Please fill all fields...'
			})
		}
		else{
			Chats.saveContactSettings($scope.data.FirstName, $scope.data.LastName, $scope.data.PhoneNumber);
			$state.go('tab.upcoming');
		}
    }
})

.controller('UpcomingCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.upcomingChats = Chats.upcoming();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('PastCtrl', function($scope, Chats) {
	$scope.pastChats = Chats.past();
})

.controller('AddCtrl', function ($scope, $state, Chats) {
	
	$scope.datetimeValue = new Date();
	$scope.datetimeValue.setHours(14 , 00, 00, 00)
  
	$scope.add = function(name, description, datetime) {
    Chats.add(name, description, datetime, null);
	
	$state.go('tab.upcoming');
  };
});



function isEmpty(str) {
    return (!str || 0 === str.length);
}
