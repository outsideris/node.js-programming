var Chat = module.exports = {
    users: []
  , rooms: []
    // 사용자 관련
  , hasUser: function(nickname) {
      var users = this.users.filter(function(element) {
        return (element === nickname);   
      });

      if (users.length > 0) {
        return true;
      } else {
        return false; 
      }
    }
  , addUser: function(nickname) {
      this.users.push(nickname);
    }
    // 방 관련
  , hasRoom: function(roomName) {
      var rooms = this.rooms.filter(function(element) {
        return (element.name === roomName);   
      });

      if (rooms.length > 0) {
        return true;
      } else {
        return false; 
      }
    }
  , addRoom: function(roomName) {
      this.rooms.push({name:roomName, attendants:[]});
    }
  , getRoomList: function() {
      return this.rooms.map(function(element) {
        return element.name; 
      });;
    }
  , joinRoom: function(roomName, user) {
      var rooms = this.rooms.filter(function(element) {
        return (element.name === roomName);   
      });
      if (!this.hasAttendant(rooms[0].attendants, user)) {
        rooms[0].attendants.push(user);
      }
    }
  , hasAttendant: function(attendants, user) {
      return attendants.some(function(element) { 
        return (element === user);
      });
    }
  , leaveRoom: function(roomName, user) {
      var rooms = this.rooms.filter(function(element) {
        return (element.name === roomName);   
      });
      rooms[0].attendants.forEach(function(element, index, arr) {
        if (element === user) {
          arr.splice(index, 1);
        }
      });
    }
  , getAttendantsList: function(roomName) {
      var rooms = this.rooms.filter(function(element) {
        return (element.name === roomName);   
      });
      return rooms[0].attendants;
    }
}
