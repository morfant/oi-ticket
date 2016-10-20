
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

		//TODO: input char num limit
	    var errors = validatePhoneNumber(val);
	    // if (errors.title || errors.text)
	    // if (errors.reserve_mobilePhone)
	    	// return Session.set('nameUndNummerErrors', errors);
	  	// else
	  		return Session.set('nameUndNummerErrors', errors);


 	  
	}


});