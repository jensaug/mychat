Chats = new Meteor.Collection("chats");

if (Meteor.is_client) {
  Template.main.chats = function () {
    return Chats.find({}, {sort: {timestamp: -1, name: 1}});
  };
  
  Template.line.events = {
    'click #submit' : function () {
      // template data, if any, is available in 'this'
      Chats.insert({name: this.nick.value, timestamp: (new Date()).getTime(), message: this.message.value});
      this.message.value = "";
    }
  };
  
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup

      if (Chats.find().count() === 0) {
        var now = (new Date()).getTime();
        var data = [
             ["Jempa", now, "Starting chat..."],
             ["Nanna", (++now), "Whazzup, honey?"],
             ["Jempa", (++now), "This is work babe, cool off"]
           ];
        for (var i = 0; i < data.length; i++) {
            var line = data[i];
            var post_id = Chats.insert({name: line[0], timestamp: line[1], message: line[2]});
        }
    }
    
  });
}
