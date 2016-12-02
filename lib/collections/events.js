Events = new Mongo.Collection( 'events' );


//global var
clientIP = "";

validateEvent = function () {
  // console.log("validatePost()");
  var errors = {};
  if (!Events.find({post_ID: "0"}).count()){
    errors.event = "공연 회차 정보가 입력되지 않았습니다! Please fill 1 event at least!";
  }
  return errors;
}

// Events.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false
// });

// Events.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true
// });

// let EventsSchema = new SimpleSchema({
//   'title': {
//     type: String,
//     label: 'The title of this event.'
//   },
//   'start': {
//     type: String,
//     label: 'When this event will start.'
//   },
//   'end': {
//     type: String,
//     label: 'When this event will end.'
//   },
//   'type': {
//     type: String,
//     label: 'What type of event is this?',
//     allowedValues: [ 'Live', 'Recorded' ]
//   },
//   'backgroundColor': {
//     type: String,
//     label: 'What color of event is this?'
//   }
// });

// Events.attachSchema( EventsSchema );



Meteor.methods({

  addEvent( event ) {
    check( event, {
      post_ID: String,
      title: String,
      start: String,
      seats: Number,
      maxSeats: Number,
      guests: Array,
    });

    try {
      var user = Meteor.user();
      var eventExpand = _.extend(event, {
        userId: user._id,
      });
      return Events.insert( eventExpand );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },

  fixEventToPost( event ) {
    check( event, {
      post_ID: String,
    });

    try {
      var update = event;
      return Events.update( {post_ID: "0"}, {
        $set: update
      }, {multi: true});
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  editEvent( event ) {
    check( event, {
      _id: String,
      // title: Match.Optional( String ),
      // post_uniq_ID: String,
      start: String,
      seats: Match.Optional(Number),
      maxSeats: Match.Optional(Number),

      // end: String,
      // backgroundColor: Match.Optional( String )
    });

    try {
      var update = _.omit(event,'_id');
      return Events.update( event._id, {
        $set: update
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  removeEvent( id ) {
    check( id, String );

    try {
      return Events.remove( id );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  clearEvents() {
  // Clear events which not connected with fixed post.
    try {
      return Events.remove( {post_ID:"0"} );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  guestInsert(event_ID, guest) {

    try {
      // winston-papertrail log
      clientIP = "";
      clientIP = this.connection.clientAddress; // global
      logger.info("remoteIP: " + clientIP + " | event_ID: " + event_ID);
      logger.info("NAME: " + guest.name + " | PHONE: " + guest.phone + " | SEATS: " + guest.seats);
      logger.info("RESERVE_ID: " + guest.reserve_id);
      logger.info("--------------------------------------------------------------");

      var eve = Events.findOne(event_ID);
      var guestSeats = guest.seats;
      var remainSeats = eve.seats - guestSeats;

      if (remainSeats < 0)
        throw new Meteor.Error('Exceed seats number', " guestSeats must less than remainSeats");

      var updateResult = Events.update( {_id:event_ID}, {
        $push: {guests: guest}, $set: {seats: remainSeats}});
      if (updateResult)
        return {_id: event_ID};

    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }

  },
  searchInName(keyWord) {
    console.log("searchInName() - server");
    console.log("keyWord: " + keyWord);

    try {
      var rslt = Events.find( {"guests.name": {$regex: keyWord}} ).fetch();
      // console.log(rslt);

      for (var i = 0; i < rslt.length; i++) {
        var newGuestArr = [];
        console.log(rslt[i].guests.length);
        for (var j = 0; j < rslt[i].guests.length; j++) {
          var re = new RegExp(keyWord, 'g'); // Dont let this RegExp definition be out of this for loop!!!
          var guestName = rslt[i].guests[j].name;
          console.log("guestName: " + guestName);
          var test = re.test(guestName);
          // console.log(test);
          if (test == true) {
            console.log("push" + guestName);
            console.log("seats: " + rslt[i].guests[j].seats);
            newGuestArr.push(rslt[i].guests[j]);
          }
        }
        rslt[i].guests = newGuestArr;

        var title = Posts.findOne(rslt[i].post_ID).title;
        rslt[i].playTitle = title;

      }
      return rslt;

    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }

  },
  searchInPhoneNumber(keyWord) {
    console.log("searchInPhoneNumber()");

    try {
      var rslt = Events.find( {"guests.phone": {$regex: keyWord}} ).fetch();
      console.log(rslt);
      // console.log(rslt.length);

      for (var i = 0; i < rslt.length; i++) {
        var newGuestArr = [];
        for (var j = 0; j < rslt[i].guests.length; j++) {
          var re = new RegExp(keyWord, 'g');
          var guestPhone = rslt[i].guests[j].phone;
          // console.log("guestName: " + guestName);
          var test = re.test(guestPhone);
          // console.log(test);
          if (test == true) {
            // console.log("push" + guestName);
            // console.log("seats: " + rslt[i].guests[j].seats);
            newGuestArr.push(rslt[i].guests[j]);
          }
        }
        rslt[i].guests = newGuestArr;

        var title = Posts.findOne(rslt[i].post_ID).title;
        rslt[i].playTitle = title;

      }
      return rslt;

    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  cancelReserve(id) {
    // console.log("reserveid: " + id);
    // console.log("cancelReserve()");
    try {
      var event = Events.findOne({"guests.reserve_id": id});
      // console.log(event);
      var eventID = event._id;
      // console.log("eventID: " + eventID);
      var oldSeats = event.seats;
      // console.log("oldSeats: " + oldSeats);
      var oldGuests = event.guests;
      var cancelSeats = 0;
      var guestPhone = "";
      for (g in oldGuests)  {
        if (oldGuests[g].reserve_id == id) {
          cancelSeats = oldGuests[g].seats;
          guestPhone = oldGuests[g].phone;
          console.log("guestPhone: " + guestPhone);
          break;
        }
      }

      var newSeats = oldSeats + cancelSeats;
      // console.log("newSeats: " + newSeats);

      var updateResult = Events.update( { _id:eventID }, {
        $pull: { guests: { reserve_id: id } }, $set: { seats: newSeats } } );

      // return this.searchInPhoneNumber(guestPhone);
      // var refreshRslt = Events.find( {"guests.phone": {$regex: guestPhone}} ).fetch();
      // return refreshRslt;
      //
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
