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
    console.log("modal submit!!");

    var eventModal = Session.get( 'eventModal' ),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent';

    var showDays  = [];
    var days = eventModal.days;

    for (var j = 0; j < days.length; j++) {
      var aDayItem = {};
      console.log("days " + j + " :" + days[j]);
      aDayItem.date = days[j];
      aDayItem.available = true;
      var shows = [];
      for (var i = 0; i < nShow; i++) {
        var aShow = {};
        var h_id = "#hour_modal_show_" + (i + 1);
        var m_id = "#min_modal_show_" + (i + 1);
        var gotHour = template.find(h_id).value;
        var gotMin = template.find(m_id).value;
        var gotTime = gotHour + ":" + gotMin;
        var maxSeats = template.find("#modal_num_of_seats").value;
        aShow.time = gotTime;
        // aShow.title = (i+1) + " 회차";
        // aShow.start = days[j] + " " + gotTime;
        aShow.event = {
          title: (i+1) + " 회차", // + gotTime
          start: days[j] + " " + gotTime, //http://momentjs.com/docs/#/parsing/string/, 
          // 2013-02-08 09:30 
          seats: maxSeats
        };
        console.log("time + " + i + ": " + gotTime);
        shows[i] = aShow;
      }
      aDayItem.shows = shows;
      // aDayItem.title = "회차";
      // aDayItem.start = "2016-10-12 17:00";
      showDays[j] = aDayItem;
    }

    /* print object values */
    // for (var i = 0; i < days.length; i++) {
    //   console.log("eventItems["+i+"].date: " + eventItems[i].date);
    //   for (var j = 0; j < nShow; j++) {
    //     console.log("eventItems["+i+"].time["+j+"]: " + eventItems[i].time[j]);
    //   }
    // }

    if ( submitType === 'editEvent' ) {
      showDays._id   = eventModal.event;
    }


    _.each(showDays, function(eventItem) {

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


    // type: template.find( '[name="type"] option:selected' ).value
    // guests: parseInt( template.find( '[name="guests"]' ).value, 10 )


    //TODO: 회차에 따라 다른 색이 적용되도록 한다
    // if (eventItem.type == 'Live') eventItem.backgroundColor = "rgb(201, 48, 44)";
    // if (eventItem.type == 'Recorded') eventItem.backgroundColor = "rgb(58, 135, 173)";


    // Meteor.call( submitType, eventItem, ( error ) => {
    //   if ( error ) {
    //     Bert.alert( error.reason, 'danger' );
    //   } else {
    //     Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
    //     closeModal();
    //   }
    // });

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