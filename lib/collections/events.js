Events = new Mongo.Collection( 'events' );

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
      post_uniq_ID: String,
      title: String,
      start: String,
      seats: Number,
      // backgroundColor: String
    });

    try {
      return Events.insert( event );
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
      seats: Number,
  
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
  removeEvent( event ) {
    check( event, String );

    try {
      return Events.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }

});