Events = new Mongo.Collection( 'events' );

validateEvent = function () {
  // console.log("validatePost()");
  var errors = {};
  if (!Events.find({post_ID: "0"}).count()){
    errors.event = "Please fill 1 event at least!";
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
      // backgroundColor: String
    });

    try {
      return Events.insert( event );
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
      var eve = Events.findOne(event_ID);
      var guestSeats = guest.seats;
      var remainSeats = eve.seats - guestSeats;

      if (remainSeats < 0)
        throw new Meteor.Error('Exceed seats number', " guestSeats must less than remainSeats");

      var updateResult = Events.update( {_id:event_ID}, {$push: {guests: guest}, $set: {seats: remainSeats}});
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
      console.log(rslt);
      var newGuestArr = [];
      var re = new RegExp(keyWord, 'g');
      console.log(re);
      for (var i = 0; i < rslt.length; i++) {
        for (var j = 0; j < rslt[i].guests.length; j++) {
          var guestName = rslt[i].guests[j].name;
          console.log("guestName: " + guestName);
          if (re.test(guestName)) {
            console.log("push" + guestName);
            console.log("seats: " + rslt[i].guests[j].seats);
            newGuestArr.push(rslt[i].guests[j]);
          }
        }
        rslt[i].guests = newGuestArr;
        newGuestArr = [];
      }
      return rslt;

    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }

  },
  searchInPhoneNumber(keyWord) {
    console.log("searchInPhoneNumber()");
    try {
      return Events.find( {"guests.phone": {$regex: keyWord}} ).fetch();
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  

});