angular.module('starter.services', [])

.factory('Meetings', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var upcomingMeetings = [{
    id: 0,
    name: 'First meeting',
    description: 'JavaScript lesson',
	startTime: '15/09/2016 21:00',
	endTime: '15/09/2016 23:00',
	location: 'Air caffe Airport city',
    creator:{ 
		name: 'Sergey Naumenko',
		face: 'img/Sergey.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},
	me:{
		status: 0
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
    description: 'Concept review',
	startTime: '08/09/2016 21:00',
	endTime: '08/09/2016 23:00',
	location: 'Air caffe Airport city',
    creator:{ 
		name: 'Avi Asaf',
		face: 'img/Avi.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},
	me:{
		status: 1
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
    id: 2,
    name: 'Third and the last meeting meanwhile',
    description: 'Status meeting',
	startTime: '10/09/2016 11:00',
	endTime: '10/09/2016 23:00',
	location: 'Air caffe Airport city',
    creator:{ 
		name: 'Dror Abraham',
		face: 'img/Dror.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},
	me:{
		status: 2
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

  }];
  var pastMeetings = [{
    id: 0,
    name: 'First meeting',
    description: 'This is our first meeting...',
	startTime: '15/09/2016 21:00',
	endTime: '15/09/2016 23:00',
	location: 'Air caffe Airport city',
    creator:{ 
		name: 'Avi asaf',
		face: 'img/Avi.jpg',
		statusIcon: 'ion-checkmark-circled',
		statusColor: 'green'
	},
	me:{
		status: 0
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
	
  }];
  
  return {
    upcoming: function() {
      return upcomingMeetings;
    },
    past: function() {
      return pastMeetings;
    },
	
    add: function(newName, newDescription, newDateTime, newFace, location) {
	var maxId = 0;
	for (index = 0; index < upcomingMeetings.length; ++index) {
		if(maxId < upcomingMeetings[index].id)
			maxId = upcomingMeetings[index].id;
	  }
	  maxId++;
	  
      upcomingMeetings.push({
		id: maxId,
		name: newName,
		description: newDescription,
		startTime: newDateTime,
		endTime:  newDateTime,
		location: location,
		creator:{
			name: 'Sergey Naumenko',
			face: 'img/Sergey.jpg'
		},
		me:{
			status:1
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
			}]
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
    setStatus: function(meetingId, status) {
      for (var i = 0; i < upcomingMeetings.length; i++) {
        if (upcomingMeetings[i].id === parseInt(meetingId)) {
          upcomingMeetings[i].me.status = status;
		  return;
        }
      }
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
