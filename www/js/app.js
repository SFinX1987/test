// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ion-datetime-picker', 'jett.ionic.filter.bar','ngAutocomplete'])

.run(function($ionicPlatform, $rootScope) {
      
  $rootScope.go = function() {
      window.open("http://github.com/katemihalikova/ion-datetime-picker", "_blank");
  };
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
	controller: 'LoginCtrl'
  })
  
  .state('contact-settings', {
    url: '/contact-settings',
    templateUrl: 'templates/contact-settings.html',
	controller: 'ContactSettingsCtrl'
  })
    .state('add-meeting', {
      url: '/add',
	  templateUrl: 'templates/add-meeting.html',
	  controller: 'AddCtrl'
    })
  
  .state('tab.upcoming', {
    url: '/upcoming',
    views: {
      'tab-upcoming': {
        templateUrl: 'templates/tab-upcoming.html',
        controller: 'UpcomingCtrl'
      }
    }
  })
  .state('tab.upcoming-detail', {
    url: '/upcoming/:meetingId',
    views: {
      'tab-upcoming': {
        templateUrl: 'templates/upcoming-detail.html',
        controller: 'UpcomingDetailCtrl'
      }
    }
  })

  .state('tab.past', {
      url: '/past',
      views: {
        'tab-past': {
          templateUrl: 'templates/tab-past.html',
          controller: 'PastCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
