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