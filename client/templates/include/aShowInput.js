Template.aShowInput.created = function() {
    showIndex = 0;

};


Template.aShowInput.rendered = function() {


};


Template.aShowInput.helpers({
    setIdx(idx) {
        showIndex = idx;
        console.log("setIndex: " + showIndex);

    },
    getIdx() {
        console.log("getIdx: " + showIndex);
        return showIndex;
    },
    nShowText() {
        return showIndex + " 회차";
    },
    nShowId() {
        return "modal_input_" + showIndex;
    },
    nShowDelBtnClass() {
        return "modal_input_delBtn_" + showIndex;
    }
  

});

Template.aShowInput.events({

});