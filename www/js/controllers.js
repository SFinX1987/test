angular.module('starter.controllers', [])


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
	$scope.datetimeValue.setHours(12 , 00, 00, 00)
  
	$scope.add = function(name, description, datetime) {
    Chats.add(name, description, datetime, null);
	
	$state.go('tab.upcoming');
  };
});

