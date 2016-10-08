Template.addEditEventModal.created = function() {
  Session.set('nShow', 0);
  nShow = 0; //공연 회차 표시용 index
  nShowArr = [];
}

Template.addEditEventModal.rendered = function() {
  nShow = 1; //1회차는 자동으로 입력되어 있도록 한다.
  nShowArr[0] = nShow;
  Session.set('nShow', nShowArr);
}

var closeModal = () => {
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};


Template.addEditEventModal.helpers({
  modalType( type ) {
    let eventModal = Session.get( 'eventModal' );
    if ( eventModal ) {
      return eventModal.type === type;
    }
  },
  modalLabel() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        button: eventModal.type === 'edit' ? 'Edit' : 'Add',
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  selected( v1, v2 ) {
    return v1 === v2;
  },
  getDays() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        days: eventModal.days //JSON object
      };
    };
  },
  getShowIdx() {
    var n = Session.get('nShow');
    console.log("getShowIdx() " + n);
    return n;
  },
  event() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {

      return eventModal.type === 'edit' ? Events.findOne( eventModal.event ) : {
        start: eventModal.start,
        end: eventModal.end
      };
    }
  }
});


// Template.postSubmit.events({

Template.addEditEventModal.events({

  'click #submitButton': function( e, template ) {
    e.preventDefault();

    var eventModal = Session.get( 'eventModal' ),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
        eventItem  = {
          title: template.find( '[name="title"]' ).value,
          start: template.find( '[name="start"]' ).value,
          end: template.find( '[name="end"]' ).value,
          type: template.find( '[name="type"] option:selected' ).value
          // guests: parseInt( template.find( '[name="guests"]' ).value, 10 )
        };

    if (eventItem.type == 'Live') eventItem.backgroundColor = "rgb(201, 48, 44)";
    if (eventItem.type == 'Recorded') eventItem.backgroundColor = "rgb(58, 135, 173)";

    if ( submitType === 'editEvent' ) {
      eventItem._id   = eventModal.event;
    }

    Meteor.call( submitType, eventItem, ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
        closeModal();
      }
    });
  },

  'click .addShow': function( e, template ) {
    e.preventDefault();
    console.log("plus button clicked!");

    nShowArr[nShow] = nShow + 1;
    nShow = nShow + 1;
    Session.set('nShow', nShowArr);
  
  },
  'click .delShow': function( e, template ) {
    e.preventDefault();
    console.log("plus button clicked!");

    if (nShow > 1) {
      nShowArr.pop();
      nShow = nShow - 1;
      Session.set('nShow', nShowArr);
    }

  
  },
  'click .delete-event': function( e ) {
    e.preventDefault();

    let eventModal = Session.get( 'eventModal' );
    if ( confirm( 'Are you sure? This is permanent.' ) ) {
      Meteor.call( 'removeEvent', eventModal.event, function( error ) {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Event deleted!', 'success' );
          closeModal();
        }
      });
    }
  }

});