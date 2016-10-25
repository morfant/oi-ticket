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
		console.log(rslts);

    _.each(rslts, function(rslt) {
      Meteor.call( 'getTitle', rslt.post_ID, ( error, result ) => {
	      if (error) {
	        console.log("ERROR!!");
	        console.log(error.reason);
	        return throwError(error.reason);
	      }
        // console.log("result: " + result);
        rslt.playTitle = result;
        // console.log(rslt);
      });
    });

    console.log(rslts);
    return rslts;
	},

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