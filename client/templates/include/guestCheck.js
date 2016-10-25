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
		var rslts = Session.get('findResult');

		for (var i = 0; i < rslts.length; i++) {
			// rslts[i].push()

		}

		console.log(Session.get('findResult').length);
	}

});

Template.guestCheck.events({
	'submit form': function(e) {
		e.preventDefault();

		var keyword = $(e.target).find('[name=reserve_search]').val();
		// console.log(keyword);

		var re = /\D/; 
		var isContainNonNumber = re.test(keyword);
		// console.log("test: " + res);

    var submitType = isContainNonNumber == true ? 'searchInName' : 'searchInPhoneNumber';
    console.log(submitType);

    Meteor.call(submitType, keyword, function(error, result) {
    	// console.log(result);
      // console.log("Meteor call - reservationSearch()");

      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      // console.log("succeed! - reservationSearch()");
      // console.log("result: " + result);

      Session.set('findResult', result);

    });
  },


});