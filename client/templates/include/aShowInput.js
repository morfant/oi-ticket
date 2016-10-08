Template.aShowInput.created = function() {
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


Template.aShowInput.rendered = function() {


};


Template.aShowInput.helpers({
    setIdx(idx) {
        showIndex = idx;
        // console.log("setIndex: " + showIndex);

    },
    getIdx() {
        // console.log("getIdx: " + showIndex);
        return showIndex;
    },
    nShowText() {
        return showIndex + " 회차";
    },
    nShowId() {
        return "modal_show_" + showIndex;
    },
    nShowDelBtnClass() {
        return "modal_input_delBtn_" + showIndex;
    },
    getHours() {
        return hours;
    },
    getMins() {
        return mins;
    }
  

});

Template.aShowInput.events({

});