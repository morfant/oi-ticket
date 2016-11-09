
Template.reserveCancel.created = function() {
	Session.set('reserveCancelErrors', {});
	Session.set('reserveCancelFindResult', {});

};


Template.reserveCancel.rendered = function() {

};


Template.reserveCancel.helpers({
	errorMessage: function(field) {
		return Session.get('reserveCancelErrors')[field];
	},
	errorClass: function (field) {
	  return !!Session.get('reserveCancelErrors')[field] ? 'has-error' : '';
	},
	matchFind() {
		return Session.get('reserveCancelFindResult').length;
	},
	rslts() {
		console.log(Session.get('reserveCancelFindResult'));
		return Session.get('reserveCancelFindResult');
	},

});

Template.reserveCancel.events({
	'keyup #reserve_mobilePhone': function(e) {
		console.log("keyup phone");
		var errors = Session.get('reserveCancelErrors');
		var phone = document.getElementById('reserve_mobilePhone').value;
		errors.reserve_mobilePhone = validatePhoneNumberKeyUp(phone);
		return Session.set('reserveCancelErrors', errors);
	},


	'submit form': function(e) {
		e.preventDefault();

		var phone = $(e.target).find('[name=reserve_mobilePhone]').val();

    Meteor.call('searchInPhoneNumber', phone, function(error, result) {
    	// console.log(result);
      console.log("Meteor call - searchInPhoneNumber()");

      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      // console.log("succeed! - reservationSearch()");
      // console.log("result: " + result);

      // for (var i = 0; i < result.length; i++) {
      // 	for (var j = 0; j < result[i].guests.length; j++) {
      // 		if (result[i].guests.name)
      // 	}
      // }

			// console.log("guest search result");
			// console.log(result);
      Session.set('reserveCancelFindResult', result);

    });
	},
});
