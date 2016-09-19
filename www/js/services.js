angular.module('starter.services', [])

.factory('Meetings', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var upcomingMeetings = [{
    id: 0,
    name: 'First meeting',
    lastText: 'JavaScript lesson',
    creator:{ 
		name: 'Sergey Naumenko',
		face: 'img/Sergey.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},
	participants:[{
			name: 'Sergey Naumenko',
			face: 'img/Sergey.jpg',
			statusIcon: 'ion-checkmark-circled',
			statusColor: 'green'
		},{
			name: 'Avi Asaf',
			face: 'img/Avi.jpg',
			statusIcon: 'ion-help-circled',
			statusColor: 'blue'
		},{
			name: 'Dror Abraham',
			face: 'img/Dror.jpg',
			statusIcon: 'ion-close-circled',
			statusColor: 'red'
		}
	]
	
  }, {
    id: 1,          
    name: 'Second meeting',
    lastText: 'Concept review',
    creator:{ 
		name: 'Avi Asaf',
		face: 'img/Avi.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},
  }, {
    id: 2,
    name: 'Third and the last meeting meanwhile',
    lastText: 'Status meeting',
    creator:{ 
		name: 'Dror Abraham',
		face: 'img/Dror.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},

  }];
  var pastMeetings = [{
    id: 0,
    name: 'Avi Asaf',
    lastText: 'Fisrt meeting',
    face: 'img/Avi.jpg'
  }];
  
  return {
    upcoming: function() {
      return upcomingMeetings;
    },
    past: function() {
      return pastMeetings;
    },
	
    add: function(newName, newDescription, newDateTime, newFace) {
	var maxId = 0;
	for (index = 0; index < upcomingMeetings.length; ++index) {
		if(maxId < upcomingMeetings[index].id)
			maxId = upcomingMeetings[index].id;
	  }
      upcomingMeetings.push({
		id: 2,
		name: newName,
		lastText: newDescription,
		face: 'img/Sergey.jpg'
	  });
    },
    remove: function(meeting) {
      upcomingMeetings.splice(upcomingMeetings.indexOf(meeting), 1);
    },
    get: function(meetingId) {
      for (var i = 0; i < upcomingMeetings.length; i++) {
        if (upcomingMeetings[i].id === parseInt(meetingId)) {
          return upcomingMeetings[i];
        }
      }
      return null;
    },
	saveContactSettings: function(FirstName, LastName, PhoneNumber){
		
	}
  };
})

.service('LoginService', function($q) {
    return {
        loginUser: function(phone, code) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (phone == '054' && code == '1111') {
                deferred.resolve('Welcome ' + phone + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
