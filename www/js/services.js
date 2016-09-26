angular.module('starter.services', [])

.factory('Settings', function(){
	var firstName="";
	var lastName="";
	var phoneNumber="";
	var photo="img/default.jpg";
	
	return{
		getName:function(){
			return firstName.concat(" ", lastName);
		},
		getPhoneNumber:function(){
			return phoneNumber;
		},
		getPhoto:function(){
			return photo;
		},
		setSettings:function(newFirstName, newLastName, newPhone, newPhoto){
			firstName = newFirstName;
			lastName = newLastName;
			phoneNumber = newPhone;
			photo = newPhoto;
		}
	}
})

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
	  var maxId = upcomingMeetings[upcomingMeetings.length - 1] + 1;
	  
      upcomingMeetings.push({
		id: maxId,
		name: newName,
		description: newDescription,
		startTime: newDateTime,
		endTime:  newDateTime,
		location: location,
		creator:{
			name: 'Sergey Naumenko',
			face: 'img/default.jpg'
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
})


.factory('Chat', function() {
	var messages = [{
		dateTime:"25/09/2016 21:41",
		text:"I don't want to load the photo",
		name:"Eli Cohen",
		photo: 'img/default.jpg',
		phoneNumber:"0543332222"
	},{
		dateTime:"25/09/2016 20:52",
		text:"Avi, hegzamta!",
		name:"Sergey Naumenko",
		photo: 'img/Sergey.jpg',
		phoneNumber:"0543332222"
	},{
		dateTime:"25/09/2016 20:47",
		text:"And this is the second :)",
		name:"Dror Abraham",
		photo: 'img/Dror.jpg',
		phoneNumber:"0543332222"
	},{
		dateTime:"25/09/2016 20:46",
		text:"Hey, guys! This is the first message! Its a bit long. I wrote it in order to check the multiple strings message!",
		name:"Avi Asaf",
		photo: 'img/Avi.jpg',
		phoneNumber:"0543332222"
	}];
	
	add = function(newName, newPhoto, newPhoneNumber, newText) {
	  
      messages.unshift({
		dateTime:new Date(),
		text:newText,
		name: newName,
		photo:newPhoto,
		phoneNumber:newPhoneNumber
	  });
	};
	
  return {
    getMessages: function() {
      return messages;
    },
	send:function(newName, newPhoto, newPhoneNumber, newText) {
		add(newName, newPhoto, newPhoneNumber, newText);
	}
  }
});