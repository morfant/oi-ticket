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
  Session.set('eventClicked', false);
  Session.set('availableSeats', 0);
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
    eventColor: 'rgb(76, 158, 217)',

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
        left: 'title',
        center: '',
        right: 'prev,next'
    },
    // customButtons: {
    //     myCustomButton: {
    //         text: 'custom!',
    //         click: function() {
    //             alert('clicked the custom button!');
    //         }
    //     }
    // },
    views: {
        month: { // name of view
            // titleFormat: 'YYYY, MM, DD'
            // other view-specific options here
        }
    },
    events( start, end, timezone, callback ) {

      $('#kalendar').fullCalendar('option', {editable: true, selectable: true});

      // console.log(Router.current().route.getName());
      let events;
      var curRouteName = Router.current().route.getName();

      if (curRouteName == 'postSubmit') {
        $('#kalendar').fullCalendar('option', {selectable: true});

        events = Events.find({post_ID:"0"}).fetch();

      } else if (curRouteName == 'playsList') { // in 'playsList', 'statistic'

        $('#kalendar').fullCalendar('option', {selectable: false});

        // load events that are owned by a specific post.
        var sentPostID = $('#kalendar').attr('class').split(" ")[0];
        // console.log("sentPostID: " + sentPostID);
        events = Events.find({post_ID:sentPostID}).fetch();

        for (var e in events) {
          if (events[e].seats <= 0) {
            events[e].color = 'gray';
            events[e].editable = false;
          }
        }

      } else {

        $('#kalendar').fullCalendar('option', {editable: false, selectable: false});

        var sentPostID = $('#kalendar').attr('class').split(" ")[0];
        events = Events.find({post_ID:sentPostID}).fetch();

        /* Set event color according to number of audience */
        for (var i in events) {
          let numOfAudience = events[i].maxSeats - events[i].seats;
          let col_r = Math.round((numOfAudience / events[i].maxSeats) * 255);
          // console.log("col_r: " + col_r);
          // console.log("event.start: " + i + " - " + events[i].start);
          events[i].color = "rgb(" + col_r + ", 100, 44)";
        }
      }

      if ( events ) {
        // console.log("events: " + events);
        callback( events );
      }
    },
    eventRender( event, element ) { //Triggered while an event is being rendered.

      var curRouteName = Router.current().route.getName();
      var timeStr = event.start.format("HH:mm");
      var numOfAudience = event.maxSeats - event.seats;

      if (curRouteName == 'postSubmit') {
        element.find( '.fc-content' ).html(
          "<span class=\"fc-time\">" + timeStr + "</span> \
          <span class=\"fc-title\">" + event.title + " " + event.seats + "/" + event.maxSeats + "석" + "</span>"
        );
      } else if (curRouteName == 'playsList') {
        element.find( '.fc-content' ).html(
          "<span class=\"fc-time\">" + timeStr + "</span> \
          <span class=\"fc-title\">" + event.title + " " + event.seats + "/" + event.maxSeats + "석" + "</span>"
        );

        // Turn to default border color of all events
        // event.borderColor = 'rgb(76, 158, 217)';
        event.backgroundColor = 'rgb(76, 158, 217)';
        event.borderColor = 'rgb(76, 158, 217)';

        if (event.seats <= 0) {
          event.backgroundColor = 'gray';
          event.borderColor = 'gray';
        }

      } else { // in statistic
        element.find( '.fc-content' ).html(
          "<span class=\"fc-time\">" + timeStr + "</span> \
          <span class=\"fc-title\">" + event.title + " " + numOfAudience + "/" + event.maxSeats + "석" + "</span>"
        );
      }


      // console.log("eventRender() event.title: " + event.title);
      // console.log("eventRender() event.start: " + event.start.format('HH:mm'));

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

      var curRouteName = Router.current().route.getName();
      if (curRouteName == 'postSubmit') {

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

      } else if (curRouteName == 'playsList') {
        Session.set('eventClicked', event._id);
        Session.set('availableSeats', event.seats);

        if (event.seats != 0) {
          event.backgroundColor = '#378006';
          event.borderColor = 'rgb(251, 161, 27)';
        }
        $('#kalendar').fullCalendar( 'rerenderEvents' );
      } else {

      }
    },
    select( start, end, jsEvent, view ) {

      var curRouteName = Router.current().route.getName();
      if (curRouteName == 'postSubmit') {
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
      } else if (curRouteName == 'playsList') {

      } else {

      }


    }


  });



  Tracker.autorun( function() {
    Events.find().fetch();
    $( '#kalendar' ).fullCalendar( 'refetchEvents' );
  });


}
