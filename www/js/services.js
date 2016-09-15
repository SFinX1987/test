angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var upcomingChats = [{
    id: 0,
    name: 'Sergey Naumenko',
    lastText: 'JavaScript lesson',
    face: 'img/Sergey.jpg'
  }, {
    id: 1,          
    name: 'Avi Asaf',
    lastText: 'Concept review',
    face: 'img/Avi.jpg'
  }, {
    id: 2,
    name: 'Dror Abraham',
    lastText: 'Status meeting',
    face: 'img/Dror.jpg'

  }];
var pastChats = [{
    id: 0,
    name: 'Avi Asaf',
    lastText: 'Fisrt meeting',
    face: 'img/Avi.jpg'
  }];
  
  return {
    upcoming: function() {
      return upcomingChats;
    },
    past: function() {
      return pastChats;
    },
	
    add: function(newName, newText, newDateTime, newFace) {
	var maxId = 0;
	for (index = 0; index < upcomingChats.length; ++index) {
		if(maxId < upcomingChats[index].id)
			maxId = upcomingChats[index].id;
	  }
      upcomingChats.push({
		id: 2,
		name: newName,
		lastText: newText,
		face: 'img/Sergey.jpg'
	  });
    },
    remove: function(chat) {
      upcomingChats.splice(upcomingChats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < upcomingChats.length; i++) {
        if (upcomingChats[i].id === parseInt(chatId)) {
          return upcomingChats[i];
        }
      }
      return null;
    }
  };
});
