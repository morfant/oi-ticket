var MOMENT_FORMAT = "MMM D, YYYY HH:mm";
var MOMENT_FORMAT_DAY = "YYYY-MM-DD";
var MOMENT_FORMAT_DAY_TIME = "YYYY-MM-DD HH:mm";
var DEFAULT_NUM_OF_SEATS = 30;

var isPast = ( date ) => {
  let today = moment().format(MOMENT_FORMAT);
  return moment( today ).isAfter( date );
};


Template.calender.created = function() {
  let template = Template.instance();
  template.subscribe( 'events' );
}

Template.calender.helpers({


});

Template.calender.events({


 
});

Template.calender.rendered = function() {

  $('#kalendar').fullCalendar({
    defaultView: 'month', //agendaWeek,agendaDay

    selectable: true,

    height: 400,
    aspectRatio: 1.5,
    editable: true,
    // contentHeight: 300,

    // events: [
    //     {
    //         title: 'My Event',
    //         start: '2016-07-29',
    //         url: 'http://google.com/'
    //     }
    //     // other events here
    // ],
    // resources: [
    //     { id: 'a', title: 'Room A' },
    //     { id: 'b', title: 'Room B' },
    //     { id: 'c', title: 'Room C' },
    //     { id: 'd', title: 'Room D' }
    // ],
    // customButtons: {
    //     // myCustomButton: {
    //     //     text: 'custom!',
    //     //     click: function() {
    //     //         alert('clicked the custom button!');
    //     //     }
    //     // }
    // },
    header: {
        left: 'prev,next',
        center: 'title',
        right: 'today myCustomButton'
    },
    customButtons: {
        myCustomButton: {
            text: 'custom!',
            click: function() {
                alert('clicked the custom button!');
            }
        }
    },    
    views: {
        month: { // name of view
            // titleFormat: 'YYYY, MM, DD'
            // other view-specific options here
        }
    },
    events( start, end, timezone, callback ) {
/*
      var events = [];
      Events.find().fetch().map( ( event ) => {

        // console.log("event: " + event);
        console.log("event._id: " + event._id);
        var n = event.shows.length;
        for (var i = 0; i < n; i++) {
          events.push(event.shows[i].event);
          // console.log("event start time in events(): " + event.shows[i].event.start);
        }
      });
*/
      let events = Events.find().fetch().map( ( event ) => {
        // event.eventStartEditable = !isPast( event.start );
        return event;
      });

      if ( events ) {
        // console.log("events: " + events);
        callback( events );
      }
    },
    eventRender( event, element ) { //Triggered while an event is being rendered.

      // console.log("eventRender() event.title: " + event.title);
      // console.log("eventRender() event.start: " + event.start.format('HH:mm'));

      var timeStr = event.start.format("HH:mm");
      element.find( '.fc-content' ).html(
        "<span class=\"fc-time\">" + timeStr + "</span> \
         <span class=\"fc-title\">" + event.title + " " + event.seats + "석" + "</span>"
      );

    },
    eventDrop( event, delta, revert ) {
      let _start = event.start.format(MOMENT_FORMAT_DAY_TIME);
      // let _end = event.end.format(MOMENT_FORMAT);
      console.log("eventDrop() start / end : " + _start + " / ");

      if ( !isPast( _start ) ) {
        let update = {
          _id: event._id,
          start: _start,
        };         

        Meteor.call( 'editEvent', update, ( error ) => {
          if ( error ) {
            bert.alert( error.reason, 'danger' );
          }
        });
      } else {
        if ( confirm( '이미 지난 날짜로 일정을 이동하시겠습니까?' ) ) {

           let update = {
            _id: event._id,
            start: _start,
          };         

          Meteor.call( 'editEvent', update, ( error ) => {
            if ( error ) {
              bert.alert( error.reason, 'danger' );
            }
          });

        } else {
          revert();
        }
      }
      
    },
    // dayClick( date ) {
    //   Session.set( 'eventModal', {
    //     type: 'add',
    //     start: date.add(5, 'hour').format(MOMENT_FORMAT),
    //     end: date.add(2,'hour').format(MOMENT_FORMAT)
    //   });
    //   // console.log(date);
    //   // console.log(date.format("dddd, YYYY MM DD, h:mm a"));
    //   $( '#add-edit-event-modal' ).modal( 'show' );
    // },
    eventClick( event, jsEvent, view ) {
      // console.log("event in eventClick() :" + event.title);
      // console.log("event in eventClick() :" + event.start);
      // console.log("event in eventClick() :" + event.start);
      // console.log("event in eventClick() :" + event.title);
      // console.log("event in eventClick() :" + event._id);
      // console.log("event in eventClick() :" + event.seats);


      var startStr = event.start.format(MOMENT_FORMAT_DAY_TIME);
      // console.log("startStr: " + startStr);
      Session.set( 'eventModal', {
        type: 'edit',
        start: startStr,
        seats: event.seats,
        id: event._id
      } );


      /* show current stored value */
      var h = startStr.split(" ")[1].split(":")[0];
      var m = startStr.split(" ")[1].split(":")[1];

      // id '#hour/min_modal_edit' changable - check addEditEventModal.html(idSpecific="_modal_edit")
      $( '#add-edit-event-modal' ).find('#hour_modal_edit').val(h);
      $( '#add-edit-event-modal' ).find('#min_modal_edit').val(m);
      $( '#add-edit-event-modal' ).find('#modal_num_of_seats').val(event.seats);
      $( '#add-edit-event-modal' ).modal( 'show' );
    },
    select( start, end, jsEvent, view ) {
      console.log("select!");
      // console.log(start);
      // console.log(end);
      var days = [];

      for(var iMoment = start.clone(); iMoment.isBefore(end); iMoment.add(1, 'days')){
        var aMoment = iMoment.clone().format(MOMENT_FORMAT_DAY); 
        // console.log("amoment: " + aMoment);
        days.push(aMoment);
        // console.log("days in loop: " + days);
      }

      // console.log("days: " + days);

      Session.set( 'eventModal', {
        type: 'add',
        start: start.format(MOMENT_FORMAT_DAY),
        days: days,
        end: end.subtract(1, 'days').format(MOMENT_FORMAT_DAY)
      });
      // console.log(date);
      // console.log(date.format("dddd, YYYY MM DD, h:mm a"));

      $( '#add-edit-event-modal' ).find('#modal_num_of_seats').val(DEFAULT_NUM_OF_SEATS);
      $( '#add-edit-event-modal' ).modal( 'show' );
    }


  });


  Tracker.autorun( function() {
    Events.find().fetch();
    $( '#kalendar' ).fullCalendar( 'refetchEvents' );
  });


}