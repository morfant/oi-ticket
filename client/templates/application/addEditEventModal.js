Template.addEditEventModal.created = function() {
  Session.set('nShow', 0);
  nShow = 0; //공연 회차 표시용 index
  nShowArr = [];

  // console.log(Template.currentData());
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

      return eventModal.type === 'edit' ? false : {
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
    console.log("modal submit!!");

    var eventModal = Session.get( 'eventModal' ),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent';

    var eventItems = [];

    /* ADD */
    if (submitType === 'addEvent'){
      var days = eventModal.days;

      for (var j = 0; j < days.length; j++) {
        for (var i = 0; i < nShow; i++) {
          var aShowEvent = {};
          aShowEvent.post_ID = "0"; //"0" means yet get post._id. Will deleted when submit page loaded.

          var maxSeats = template.find("#modal_num_of_seats").value;
          aShowEvent.seats = Number(maxSeats);

          aShowEvent.title = (i+1) + " 회차"; // + gotTime

          var h_id = "#hour_modal_show_" + (i + 1);
          var m_id = "#min_modal_show_" + (i + 1);
          var gotHour = template.find(h_id).value;
          var gotMin = template.find(m_id).value;
          var gotTime = gotHour + ":" + gotMin;
          aShowEvent.start = days[j] + " " + gotTime; //http://momentjs.com/docs/#/parsing/string/, 
            // 2013-02-08 09:30 
 
          aShowEvent.guests = [];

          eventItems.push(aShowEvent);
        }
      }
    }

    /* EDIT */
    if ( submitType === 'editEvent' ) {
      var aShowEvent = {};

      var editedSeats = template.find("#modal_num_of_seats").value;
      console.log(editedSeats);
      aShowEvent.seats = Number(editedSeats);

      var h_id = "#hour_modal_edit";
      var m_id = "#min_modal_edit";
      var gotHour = template.find(h_id).value;
      var gotMin = template.find(m_id).value;
      var gotTime = gotHour + ":" + gotMin;
      // aShowEvent.start = days[j] + " " + gotTime; //http://momentjs.com/docs/#/parsing/string/, 
      // console.log("start at edit func() : " + eventModal.start);

      aShowEvent.start = eventModal.start.split(" ")[0] + " " + gotTime
   
      aShowEvent._id = eventModal.id;
      eventItems.push(aShowEvent);
    }


    /* Insert or update db */
    _.each(eventItems, function(eventItem) {
      Meteor.call( submitType, eventItem, ( error, result ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          console.log("Input events succeed!");
          console.log("result: " + result);
          // Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
          Bert.alert( `Event input succeed!`, 'success' ); //Not working...?
          closeModal();
        }
      });
    });


    //TODO: 회차에 따라 다른 색이 적용되도록 한다
    // if (eventItem.type == 'Live') eventItem.backgroundColor = "rgb(201, 48, 44)";
    // if (eventItem.type == 'Recorded') eventItem.backgroundColor = "rgb(58, 135, 173)";


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
      Meteor.call( 'removeEvent', eventModal.id, function( error ) {
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