Template.registerHelper("isInCustomerSide", function () {
	var curRouteName = Router.current().route.getName();
	if (curRouteName == 'playsList' || curRouteName == 'reserveResult') return true;
    else return false;
});

Template.registerHelper("isInPlaysList", function () {
	var curRouteName = Router.current().route.getName();
	if (curRouteName == 'playsList') return true;
    else return false;
});

Template.registerHelper("isInReserveResult", function () {
	var curRouteName = Router.current().route.getName();
	if (curRouteName == 'reserveResult') return true;
    else return false;
});

Template.registerHelper("isInRouteName", function (routeName) {
	var curRouteName = Router.current().route.getName();
	if (curRouteName == routeName) return true;
    else return false;
});

// Get posts
Template.registerHelper("posts", function () {
    return Posts.find({}, {sort: {submitted: -1}});
    /* print each post element */
    // var p = Posts.find();
    // for (var i = 0; i < p.count(); i++){
    // 	console.log(i + " / " + p.fetch()[i]._id);
    // };
    // // return Posts.find();
    // return p;
});