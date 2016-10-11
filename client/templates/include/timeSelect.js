Template.timeSelect.created = function() {
    showIndex = 0;

    hours = [];
    mins = [];

    for (var i = 0; i <= 24; i++){
        if (i < 10) hours[i] = "0"+i;
        else hours[i] = i.toString();
    }
    // console.log("hours: " + hours);

    for (var i = 1; i <= 6; i++){
        mins[0] = "00";
        mins[i] = i * 10;
    }
    // console.log("mins: " + mins);

};


Template.timeSelect.rendered = function() {


};


Template.timeSelect.helpers({
    getHours() {
        return hours;
    },
    getMins() {
        return mins;
    },
});

Template.timeSelect.events({

});