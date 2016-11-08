
Template.nameUndNummer.created = function() {
	Session.set('nameUndNummerErrors', {});
};


Template.nameUndNummer.rendered = function() {

};


Template.nameUndNummer.helpers({
	errorMessage: function(field) {
		return Session.get('reserveInfoErrors')[field];
	},
	errorClass: function (field) {
	  return !!Session.get('reserveInfoErrors')[field] ? 'has-error' : '';
	}
});

Template.nameUndNummer.events({
	'keyup #reserve_name': function(e) {
		console.log("keyup name");
		var errors = Session.get('reserveInfoErrors');
		var name = document.getElementById('reserve_name').value;
		errors.reserve_name = validateNameKeyUp(name);
		return Session.set('reserveInfoErrors', errors);

	},

	'keyup #reserve_mobilePhone': function(e) {
		console.log("keyup phone");
		var errors = Session.get('reserveInfoErrors');
		var phone = document.getElementById('reserve_mobilePhone').value;
		errors.reserve_mobilePhone = validatePhoneNumberKeyUp(phone);
		return Session.set('reserveInfoErrors', errors);
	},
	'keyup #reserve_seats': function(e) {
		console.log("keyup seats");
		var errors = Session.get('reserveInfoErrors');
		var seats = document.getElementById('reserve_seats').value;

		var availableSeats = Session.get('availableSeats');
		console.log("availableSeats: " + availableSeats);
		errors.reserve_seats = validateSeatsKeyUp(seats, availableSeats);
		return Session.set('reserveInfoErrors', errors);

		//
		// console.log(e.target.value);
		// var val = e.target.value;
		//
    // var newErrors = validatePhoneNumberKeyUp(val, errors);
		// return Session.set('reserveInfoErrors', newErrors);

	},


	// 'submit form': function(e) {
	// 	e.preventDefault();
	//
	// 	var info = {
  //     name: $(e.target).find('[name=reserve_name]').val().replace(/[\r\n]/g, "<br />"),
  //     mobileNumber: $(e.target).find('[name=reserve_mobilePhone]').val().replace(/[\r\n]/g, "<br />"),
	// 		seats:  $(e.target).find('[name=reserve_numberOfSeats]').val().replace(/[\r\n]/g, "<br />")
	// 	}
	//
	// 	console.log(info);
	//
	// 	var errors = validateReservInfo(info);
  // 	if (errors.reserve_name || errors.reserve_mobilePhone || errors.reserve_seats)
	// 		return Session.set('nameUndNummerErrors', errors);
	//
	// }


});
