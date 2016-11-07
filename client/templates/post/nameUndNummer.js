
Template.nameUndNummer.created = function() {
	Session.set('nameUndNummerErrors', {});
};


Template.nameUndNummer.rendered = function() {

};


Template.nameUndNummer.helpers({
	errorMessage: function(field) {
		return Session.get('nameUndNummerErrors')[field];
	},
	errorClass: function (field) {
	  return !!Session.get('nameUndNummerErrors')[field] ? 'has-error' : '';
	}
});

Template.nameUndNummer.events({
	'keyup #reserve_mobilePhone': function(e) {

		console.log("keypressing in reserve_mobilePhone");

		console.log(e.target.value);
		var val = e.target.value;

    var errors = validatePhoneNumber(val);
		if (errors.reserve_mobilePhone)
  		return Session.set('nameUndNummerErrors', errors);



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
