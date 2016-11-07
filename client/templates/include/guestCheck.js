Template.guestCheck.created = function() {
	Session.set('findResult', []);

};


Template.guestCheck.rendered = function() {


};

Template.guestCheck.helpers({
	matchFind() {
		return Session.get('findResult').length;
	},
	rslts() {
		console.log(Session.get('findResult'));
		return Session.get('findResult');
	},

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

      // console.log("succeed! - reservationSearch()");
      // console.log("result: " + result);

      // for (var i = 0; i < result.length; i++) {
      // 	for (var j = 0; j < result[i].guests.length; j++) {
      // 		if (result[i].guests.name)
      // 	}
      // }

      Session.set('findResult', result);

    });
  },


});
