Template.guestCheck.created = function() {
	// Session.set('findResult', []);
	Session.set('reserveCancelFindResult', {}); //using at reserveCancel.js also.
};


Template.guestCheck.rendered = function() {


};

Template.guestCheck.helpers({
	matchFind() {
		return Session.get('reserveCancelFindResult').length;
	},
	rslts() {
		console.log(Session.get('reserveCancelFindResult'));
		return Session.get('reserveCancelFindResult');
	},
	submitted() {
		console.log("submitted");
		console.log(Session.get('reserveCancelSearched'));
		return Session.get('reserveCancelSearched');
	}

});

Template.guestCheck.events({
	'submit form': function(e) {
		e.preventDefault();

		var keyword = $(e.target).find('[name=reserve_search]').val();
		// TODO: Check nothing inserted.
		// console.log(keyword);

		var re = /\D/;
		var isContainNonNumber = re.test(keyword);
		// console.log("test: " + res);

    var submitType = isContainNonNumber == true ? 'searchInName' : 'searchInPhoneNumber';
    console.log(submitType);

    Meteor.call(submitType, keyword, function(error, result) {
    	// console.log(result);
      console.log("Meteor call - reservationSearch()");

      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

			// console.log(oldResult);
			Session.set('reserveCancelFindResult', result);

    });
  },


});
